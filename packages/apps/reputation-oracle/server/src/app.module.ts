import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { HttpValidationPipe } from './common/pipes';
import { HealthModule } from './modules/health/health.module';
import { ReputationModule } from './modules/reputation/reputation.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { Web3Module } from './modules/web3/web3.module';
import { envValidator } from './common/config';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SnakeCaseInterceptor } from './common/interceptors/snake-case';
import { KycModule } from './modules/kyc/kyc.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: HttpValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SnakeCaseInterceptor,
    },
  ],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV as string}`
        : '.env',
      validationSchema: envValidator,
    }),
    DatabaseModule,
    HealthModule,
    ReputationModule,
    WebhookModule,
    Web3Module,
    AuthModule,
    KycModule,
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '../../../../../',
        'node_modules/swagger-ui-dist',
      ),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
