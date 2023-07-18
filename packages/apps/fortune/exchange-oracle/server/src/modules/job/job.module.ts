import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { HttpModule } from '@nestjs/axios';
import { Web3Module } from '../web3/web3.module';

@Module({
  imports: [ConfigModule, HttpModule, Web3Module],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
