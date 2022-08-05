import * as path from 'path';
import {
  DB_HOST,
  DB_LOGGING_LEVEL,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_URL,
  DB_USERNAME,
  ENABLE_SSL,
} from 'src/environments/database';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

type Connection = Omit<PostgresConnectionOptions, 'ssl'> & { ssl?: any; };

const connection: Connection = {
  type: 'postgres',
  url: DB_URL,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING_LEVEL,
  logNotifications: true,
  entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'migrations', '*')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  },
};

if (ENABLE_SSL) {
  connection.ssl = { rejectUnauthorized: false };
}

module.exports = connection;
