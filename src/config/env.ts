import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const {
  DB_SSL = false,
  DB_HOST,
  DB_COMPOSE_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  DEFAULT_ADM_EMAIL,
  DEFAULT_ADM_PASSWORD,
} = process.env;

const DB_URL = process.env.DATABASE_URL || process.env.DB_URL;
const SERVER_PORT = Number(process.env.SERVER_PORT || process.env.PORT);
const SMTP_PORT = Number(process.env.SMTP_PORT);
const DB_LOGGING_LEVEL = process.env.DB_LOGGING_LEVEL?.split(',');

const REFRESH_TOKEN_EXPIRATION_IN_DAYS = Number(
  process.env.REFRESH_TOKEN_EXPIRATION_IN_DAYS || 7,
);
const MAXIMUM_ATTEMPTS = Number(process.env.MAXIMUM_ATTEMPTS || 5);
const INTERVAL_IN_SECONDS = Number(process.env.INTERVAL_IN_SECONDS || 1);
const BLOCK_DURATION_IN_MINUTES = Number(
  process.env.BLOCK_DURATION_IN_MINUTES || 60,
);

export {
  SERVER_PORT,
  DB_SSL,
  DB_URL,
  DB_HOST,
  DB_COMPOSE_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING_LEVEL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  TOKEN_SECRET,
  TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION_IN_DAYS,
  MAXIMUM_ATTEMPTS,
  INTERVAL_IN_SECONDS,
  BLOCK_DURATION_IN_MINUTES,
  DEFAULT_ADM_EMAIL,
  DEFAULT_ADM_PASSWORD,
};
