/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  HMToken,
  HMToken__factory,
} from '@human-protocol/core/typechain-types';
import {
  ChainId,
  EscrowClient,
  NETWORKS,
  StorageClient,
  StorageCredentials,
  StorageParams,
  UploadFile,
} from '@human-protocol/sdk';
import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  ValidationError,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from 'class-validator';
import { BigNumber } from 'ethers';
import { firstValueFrom } from 'rxjs';
import { add, div, lt, mul } from '../../common/utils/decimal';
import { QueryFailedError } from 'typeorm';
import { ConfigNames } from '../../common/config';
import {
  ErrorBucket,
  ErrorEscrow,
  ErrorJob,
  ErrorPayment,
  ErrorPostgres,
} from '../../common/constants/errors';
import { JobRequestType, JobStatus } from '../../common/enums/job';
import {
  Currency,
  PaymentSource,
  PaymentStatus,
  PaymentType,
  TokenId,
} from '../../common/enums/payment';
import { getRate } from '../../common/utils';
import { PaymentRepository } from '../payment/payment.repository';
import { PaymentService } from '../payment/payment.service';
import { Web3Service } from '../web3/web3.service';
import {
  CvatFinalResultDto,
  CvatManifestDto,
  FortuneFinalResultDto,
  FortuneManifestDto,
  JobFortuneDto,
  JobCvatDto,
  SaveManifestDto,
  SendWebhookDto,
} from './job.dto';
import { JobEntity } from './job.entity';
import { JobRepository } from './job.repository';
import { RoutingProtocolService } from './routing-protocol.service';

@Injectable()
export class JobService {
  public readonly logger = new Logger(JobService.name);
  public readonly storageClient: StorageClient;
  public readonly storageParams: StorageParams;
  public readonly bucket: string;

  constructor(
    @Inject(Web3Service)
    private readonly web3Service: Web3Service,
    public readonly jobRepository: JobRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly paymentService: PaymentService,
    public readonly httpService: HttpService,
    public readonly configService: ConfigService,
    private readonly routingProtocolService: RoutingProtocolService,
  ) {
    const storageCredentials: StorageCredentials = {
      accessKey: this.configService.get<string>(ConfigNames.S3_ACCESS_KEY)!,
      secretKey: this.configService.get<string>(ConfigNames.S3_SECRET_KEY)!,
    };

    const useSSL =
      this.configService.get<string>(ConfigNames.S3_USE_SSL) === 'true';
    this.storageParams = {
      endPoint: this.configService.get<string>(ConfigNames.S3_ENDPOINT)!,
      port: Number(this.configService.get<number>(ConfigNames.S3_PORT)!),
      useSSL,
    };

    this.bucket = this.configService.get<string>(ConfigNames.S3_BUCKET)!;

    this.storageClient = new StorageClient(
      storageCredentials,
      this.storageParams,
    );
  }

  public async createJob(
    userId: number,
    requestType: JobRequestType,
    dto: JobFortuneDto | JobCvatDto,
  ): Promise<number> {
    let manifestUrl, manifestHash;
    const { chainId, fundAmount } = dto;

    if (chainId) {
      this.web3Service.validateChainId(chainId);
    }

    const userBalance = await this.paymentService.getUserBalance(userId);

    const rate = await getRate(Currency.USD, TokenId.HMT);

    const feePercentage = this.configService.get<number>(
      ConfigNames.JOB_LAUNCHER_FEE,
    )!;
    const fee = mul(div(feePercentage, 100), fundAmount);
    const usdTotalAmount = add(fundAmount, fee);

    if (lt(userBalance, usdTotalAmount)) {
      this.logger.log(ErrorJob.NotEnoughFunds, JobService.name);
      throw new BadRequestException(ErrorJob.NotEnoughFunds);
    }

    const tokenFundAmount = mul(fundAmount, rate);
    const tokenFee = mul(fee, rate);
    const tokenTotalAmount = add(tokenFundAmount, tokenFee);

    if (requestType == JobRequestType.FORTUNE) {
      ({ manifestUrl, manifestHash } = await this.saveManifest({
        ...(dto as JobFortuneDto),
        requestType,
        fundAmount: tokenFundAmount,
      }));
    } else {
      dto = dto as JobCvatDto;
      ({ manifestUrl, manifestHash } = await this.saveManifest({
        data: {
          data_url: dto.dataUrl,
        },
        annotation: {
          labels: dto.labels.map((item) => ({ name: item })),
          description: dto.requesterDescription,
          type: requestType,
          job_size: Number(
            this.configService.get<number>(ConfigNames.CVAT_JOB_SIZE)!,
          ),
          max_time: Number(
            this.configService.get<number>(ConfigNames.CVAT_MAX_TIME)!,
          ),
        },
        validation: {
          min_quality: dto.minQuality,
          val_size: Number(
            this.configService.get<number>(ConfigNames.CVAT_VAL_SIZE)!,
          ),
          gt_url: dto.gtUrl,
        },
        job_bounty: dto.jobBounty,
      }));
    }

    const jobEntity = await this.jobRepository.create({
      chainId: chainId ?? this.routingProtocolService.selectNetwork(),
      userId,
      manifestUrl,
      manifestHash,
      fee: tokenFee,
      fundAmount: tokenFundAmount,
      status: JobStatus.PENDING,
      waitUntil: new Date(),
    });

    if (!jobEntity) {
      this.logger.log(ErrorJob.NotCreated, JobService.name);
      throw new NotFoundException(ErrorJob.NotCreated);
    }

    try {
      await this.paymentRepository.create({
        userId,
        source: PaymentSource.BALANCE,
        type: PaymentType.WITHDRAWAL,
        amount: -tokenTotalAmount,
        currency: TokenId.HMT,
        rate: div(1, rate),
        status: PaymentStatus.SUCCEEDED,
      });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes(ErrorPostgres.NumericFieldOverflow.toLowerCase())
      ) {
        this.logger.log(ErrorPostgres.NumericFieldOverflow, JobService.name);
        throw new ConflictException(ErrorPayment.IncorrectAmount);
      } else {
        this.logger.log(error, JobService.name);
        throw new ConflictException(ErrorPayment.NotSuccess);
      }
    }

    jobEntity.status = JobStatus.PAID;
    await jobEntity.save();

    return jobEntity.id;
  }

  public async launchJob(jobEntity: JobEntity): Promise<JobEntity> {
    const signer = this.web3Service.getSigner(jobEntity.chainId);

    const escrowClient = await EscrowClient.build(signer);

    const escrowConfig = {
      recordingOracle: this.configService.get<string>(
        ConfigNames.RECORDING_ORACLE_ADDRESS,
      )!,
      reputationOracle: this.configService.get<string>(
        ConfigNames.REPUTATION_ORACLE_ADDRESS,
      )!,
      recordingOracleFee: BigNumber.from(
        this.configService.get<number>(ConfigNames.RECORDING_ORACLE_FEE)!,
      ),
      reputationOracleFee: BigNumber.from(
        this.configService.get<number>(ConfigNames.REPUTATION_ORACLE_FEE)!,
      ),
      manifestUrl: jobEntity.manifestUrl,
      manifestHash: jobEntity.manifestHash,
    };

    const escrowAddress = await escrowClient.createAndSetupEscrow(
      NETWORKS[jobEntity.chainId as ChainId]!.hmtAddress,
      [],
      escrowConfig,
    );

    if (!escrowAddress) {
      this.logger.log(ErrorEscrow.NotCreated, JobService.name);
      throw new NotFoundException(ErrorEscrow.NotCreated);
    }

    const manifest = await this.getManifest(jobEntity.manifestUrl);

    await this.validateManifest(manifest);

    const tokenContract: HMToken = HMToken__factory.connect(
      NETWORKS[jobEntity.chainId as ChainId]!.hmtAddress,
      signer,
    );
    await tokenContract.transfer(escrowAddress, jobEntity.fundAmount);

    jobEntity.escrowAddress = escrowAddress;
    jobEntity.status = JobStatus.LAUNCHED;
    await jobEntity.save();

    if ((manifest as CvatManifestDto)?.annotation?.type) {
      await this.sendWebhook(
        this.configService.get<string>(
          ConfigNames.EXCHANGE_ORACLE_WEBHOOK_URL,
        )!,
        {
          escrowAddress: jobEntity.escrowAddress,
          chainId: jobEntity.chainId,
        },
      );
    }

    return jobEntity;
  }

  public async saveManifest(
    manifest: FortuneManifestDto | CvatManifestDto,
  ): Promise<SaveManifestDto> {
    const uploadedFiles: UploadFile[] = await this.storageClient.uploadFiles(
      [manifest],
      this.bucket,
    );

    if (!uploadedFiles[0]) {
      this.logger.log(ErrorBucket.UnableSaveFile, JobService.name);
      throw new BadGatewayException(ErrorBucket.UnableSaveFile);
    }

    const { url, hash } = uploadedFiles[0];
    const manifestUrl = url;

    return { manifestUrl, manifestHash: hash };
  }

  private async validateManifest(
    manifest: FortuneManifestDto | CvatManifestDto,
  ): Promise<boolean> {
    const dtoCheck =
      (manifest as FortuneManifestDto).requestType == JobRequestType.FORTUNE
        ? new FortuneManifestDto()
        : new CvatManifestDto();

    Object.assign(dtoCheck, manifest);

    const validationErrors: ValidationError[] = await validate(dtoCheck);
    if (validationErrors.length > 0) {
      this.logger.log(
        ErrorJob.ManifestValidationFailed,
        JobService.name,
        validationErrors,
      );
      throw new NotFoundException(ErrorJob.ManifestValidationFailed);
    }

    return true;
  }

  public async getManifest(
    manifestUrl: string,
  ): Promise<FortuneManifestDto | CvatManifestDto> {
    const manifest = await StorageClient.downloadFileFromUrl(manifestUrl);

    if (!manifest) {
      throw new NotFoundException(ErrorJob.ManifestNotFound);
    }

    return manifest;
  }

  public async sendWebhook(
    webhookUrl: string,
    webhookData: SendWebhookDto,
  ): Promise<boolean> {
    const { data } = await firstValueFrom(
      await this.httpService.post(webhookUrl, webhookData),
    );

    if (!data) {
      this.logger.log(ErrorJob.WebhookWasNotSent, JobService.name);
      throw new NotFoundException(ErrorJob.WebhookWasNotSent);
    }

    return true;
  }

  public async getResult(
    userId: number,
    jobId: number,
  ): Promise<FortuneFinalResultDto | CvatFinalResultDto> {
    const jobEntity = await this.jobRepository.findOne({
      id: jobId,
      userId,
      status: JobStatus.LAUNCHED,
    });
    if (!jobEntity) {
      this.logger.log(ErrorJob.NotFound, JobService.name);
      throw new NotFoundException(ErrorJob.NotFound);
    }

    const signer = this.web3Service.getSigner(jobEntity.chainId);
    const escrowClient = await EscrowClient.build(signer);

    const finalResultUrl = await escrowClient.getResultsUrl(
      jobEntity.escrowAddress,
    );

    if (!finalResultUrl) {
      this.logger.log(ErrorJob.ResultNotFound, JobService.name);
      throw new NotFoundException(ErrorJob.ResultNotFound);
    }

    const result = await StorageClient.downloadFileFromUrl(finalResultUrl);

    if (!result) {
      throw new NotFoundException(ErrorJob.ResultNotFound);
    }

    const fortuneDtoCheck = new FortuneFinalResultDto();
    const imageLabelBinaryDtoCheck = new CvatFinalResultDto();

    Object.assign(fortuneDtoCheck, result);
    Object.assign(imageLabelBinaryDtoCheck, result);

    const fortuneValidationErrors: ValidationError[] = await validate(
      fortuneDtoCheck,
    );
    const imageLabelBinaryValidationErrors: ValidationError[] = await validate(
      imageLabelBinaryDtoCheck,
    );
    if (
      fortuneValidationErrors.length > 0 &&
      imageLabelBinaryValidationErrors.length > 0
    ) {
      this.logger.log(
        ErrorJob.ResultValidationFailed,
        JobService.name,
        fortuneValidationErrors,
        imageLabelBinaryValidationErrors,
      );
      throw new NotFoundException(ErrorJob.ResultValidationFailed);
    }

    return result;
  }
}
