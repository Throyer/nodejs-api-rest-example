import { LoggerOptions } from 'typeorm';

const ENABLE_SSL = Boolean(process.env.ENABLE_SSL);
const DB_URL = process.env.DB_URL || process.env.DATABASE_URL;
const DB_HOST = process.env.DB_COMPOSE_HOST || process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_LOGGING_LEVEL = process.env.DB_LOGGING_LEVEL?.split(
  ',',
) as LoggerOptions;

export {
  ENABLE_SSL,
  DB_URL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING_LEVEL,
};
