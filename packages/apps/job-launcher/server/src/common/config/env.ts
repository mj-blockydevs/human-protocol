import * as Joi from 'joi';

export const ConfigNames = {
  NODE_ENV: 'NODE_ENV',
  HOST: 'HOST',
  PORT: 'PORT',
  FE_URL: 'FE_URL',
  SESSION_SECRET: 'SESSION_SECRET',
  MAX_RETRY_COUNT: 'MAX_RETRY_COUNT',
  HASH_SECRET: 'HASH_SECRET',
  JWT_SECRET: 'JWT_SECRET',
  JWT_ACCESS_TOKEN_EXPIRES_IN: 'JWT_ACCESS_TOKEN_EXPIRES_IN',
  JWT_REFRESH_TOKEN_EXPIRES_IN: 'JWT_REFRESH_TOKEN_EXPIRES_IN',
  POSTGRES_HOST: 'POSTGRES_HOST',
  POSTGRES_USER: 'POSTGRES_USER',
  POSTGRES_PASSWORD: 'POSTGRES_PASSWORD',
  POSTGRES_DATABASE: 'POSTGRES_DATABASE',
  POSTGRES_PORT: 'POSTGRES_PORT',
  POSTGRES_SSL: 'POSTGRES_SSL',
  POSTGRES_LOGGING: 'POSTGRES_LOGGING',
  WEB3_ENV: 'WEB3_ENV',
  WEB3_PRIVATE_KEY: 'WEB3_PRIVATE_KEY',
  GAS_PRICE_MULTIPLIER: 'GAS_PRICE_MULTIPLIER',
  PGP_PRIVATE_KEY: 'PGP_PRIVATE_KEY',
  PGP_ENCRYPT: 'PGP_ENCRYPT',
  JOB_LAUNCHER_FEE: 'JOB_LAUNCHER_FEE',
  REPUTATION_ORACLE_ADDRESS: 'REPUTATION_ORACLE_ADDRESS',
  FORTUNE_EXCHANGE_ORACLE_ADDRESS: 'FORTUNE_EXCHANGE_ORACLE_ADDRESS',
  FORTUNE_RECORDING_ORACLE_ADDRESS: 'FORTUNE_RECORDING_ORACLE_ADDRESS',
  CVAT_EXCHANGE_ORACLE_ADDRESS: 'CVAT_EXCHANGE_ORACLE_ADDRESS',
  CVAT_RECORDING_ORACLE_ADDRESS: 'CVAT_RECORDING_ORACLE_ADDRESS',
  HCAPTCHA_RECORDING_ORACLE_URI: 'HCAPTCHA_RECORDING_ORACLE_URI',
  HCAPTCHA_REPUTATION_ORACLE_URI: 'HCAPTCHA_REPUTATION_ORACLE_URI',
  HCAPTCHA_ORACLE_ADDRESS: 'HCAPTCHA_ORACLE_ADDRESS',
  HCAPTCHA_SITE_KEY: 'HCAPTCHA_SITE_KEY',
  HCAPTCHA_SECRET: 'HCAPTCHA_SECRET',
  HCAPTCHA_EXCHANGE_URL: 'HCAPTCHA_EXCHANGE_URL',
  S3_ENDPOINT: 'S3_ENDPOINT',
  S3_PORT: 'S3_PORT',
  S3_ACCESS_KEY: 'S3_ACCESS_KEY',
  S3_SECRET_KEY: 'S3_SECRET_KEY',
  S3_BUCKET: 'S3_BUCKET',
  S3_USE_SSL: 'S3_USE_SSL',
  STRIPE_SECRET_KEY: 'STRIPE_SECRET_KEY',
  STRIPE_API_VERSION: 'STRIPE_API_VERSION',
  STRIPE_APP_NAME: 'STRIPE_APP_NAME',
  STRIPE_APP_VERSION: 'STRIPE_APP_VERSION',
  STRIPE_APP_INFO_URL: 'STRIPE_APP_INFO_URL',
  SENDGRID_API_KEY: 'SENDGRID_API_KEY',
  SENDGRID_FROM_EMAIL: 'SENDGRID_FROM_EMAIL',
  SENDGRID_FROM_NAME: 'SENDGRID_FROM_NAME',
  CVAT_JOB_SIZE: 'CVAT_JOB_SIZE',
  CVAT_MAX_TIME: 'CVAT_MAX_TIME',
  CVAT_VAL_SIZE: 'CVAT_VAL_SIZE',
  APIKEY_ITERATIONS: 'APIKEY_ITERATIONS',
  APIKEY_KEY_LENGTH: 'APIKEY_KEY_LENGTH',
};

export const envValidator = Joi.object({
  // General
  NODE_ENV: Joi.string().default('development'),
  HOST: Joi.string().default('localhost'),
  PORT: Joi.string().default(5000),
  FE_URL: Joi.string().default('http://localhost:3005'),
  SESSION_SECRET: Joi.string().default('session_key'),
  MAX_RETRY_COUNT: Joi.number().default(5),
  // Auth
  HASH_SECRET: Joi.string().default('a328af3fc1dad15342cc3d68936008fa'),
  JWT_SECRET: Joi.string().default('secret'),
  JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default(1000000000),
  JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default(1000000000),
  // Database
  POSTGRES_HOST: Joi.string().default('127.0.0.1'),
  POSTGRES_USER: Joi.string().default('operator'),
  POSTGRES_PASSWORD: Joi.string().default('qwerty'),
  POSTGRES_DATABASE: Joi.string().default('job-launcher'),
  POSTGRES_PORT: Joi.string().default('5432'),
  POSTGRES_SSL: Joi.string().default('false'),
  POSTGRES_LOGGING: Joi.string(),
  // Web3
  WEB3_ENV: Joi.string().default('testnet'),
  WEB3_PRIVATE_KEY: Joi.string().required(),
  GAS_PRICE_MULTIPLIER: Joi.number().default(null),
  JOB_LAUNCHER_FEE: Joi.string().default(10),
  REPUTATION_ORACLE_ADDRESS: Joi.string().required(),
  FORTUNE_EXCHANGE_ORACLE_ADDRESS: Joi.string().required(),
  FORTUNE_RECORDING_ORACLE_ADDRESS: Joi.string().required(),
  CVAT_EXCHANGE_ORACLE_ADDRESS: Joi.string().required(),
  CVAT_RECORDING_ORACLE_ADDRESS: Joi.string().required(),
  HCAPTCHA_RECORDING_ORACLE_URI: Joi.string().required(),
  HCAPTCHA_REPUTATION_ORACLE_URI: Joi.string().required(),
  HCAPTCHA_ORACLE_ADDRESS: Joi.string().required(),
  HCAPTCHA_SITE_KEY: Joi.string().required(),
  HCAPTCHA_SECRET: Joi.string().required(),
  HCAPTCHA_EXCHANGE_URL: Joi.string()
    .default('https://foundation-exchange.hmt.ai')
    .description('hcaptcha exchange url'),
  // S3
  S3_ENDPOINT: Joi.string().default('127.0.0.1'),
  S3_PORT: Joi.string().default(9000),
  S3_ACCESS_KEY: Joi.string().required(),
  S3_SECRET_KEY: Joi.string().required(),
  S3_BUCKET: Joi.string().default('launcher'),
  S3_USE_SSL: Joi.string().default('false'),
  // Stripe
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_API_VERSION: Joi.string().default('2022-11-15'),
  STRIPE_APP_NAME: Joi.string().default('Fortune'),
  STRIPE_APP_VERSION: Joi.string().default('0.0.1'),
  STRIPE_APP_INFO_URL: Joi.string().default('https://hmt.ai'),
  // SendGrid
  SENDGRID_API_KEY: Joi.string().required(),
  SENDGRID_FROM_EMAIL: Joi.string().default('job-launcher@hmt.ai'),
  SENDGRID_FROM_NAME: Joi.string().default('Human Protocol Job Launcher'),
  // CVAT
  CVAT_JOB_SIZE: Joi.string().default('10'),
  CVAT_MAX_TIME: Joi.string().default('300'),
  CVAT_VAL_SIZE: Joi.string().default('2'),
  //PGP
  PGP_PRIVATE_KEY: Joi.string().required(),
  PGP_ENCRYPT: Joi.string().default(false),
  // APIKey
  APIKEY_ITERATIONS: Joi.number().default(1000),
  APIKEY_KEY_LENGTH: Joi.number().default(64),
});
