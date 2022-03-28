import { Logger } from '@nestjs/common';
import {
  DB_HOST,
  DB_LOGGING_LEVEL,
  DB_NAME,
  DB_PORT,
  DB_URL,
} from 'src/environments/database';
import { SERVER_PORT, SWAGGER_URL } from 'src/environments/server';
import { extract } from './string-connection-extractor';

export const started = (): void => {
  const isDev = process.env.NODE_ENV === 'development';
  Logger.log(`🚨️ environment:                   ${process.env.NODE_ENV}`);

  if (isDev) {
    Logger.log(
      `🚀️ started on:                    http://localhost:${SERVER_PORT}`,
    );
    Logger.log(
      `📜️ swagger:                       http://localhost:${SERVER_PORT}/${SWAGGER_URL}`,
    );
    Logger.log(
      `🔨 api-docs: (postman/insomnia)   http://localhost:${SERVER_PORT}/${SWAGGER_URL}-json`,
    );
  }

  Logger.log('🎲️ database:');

  Logger.log(`      ╠═ logs: ${DB_LOGGING_LEVEL}`);
  Logger.log(`      ╠═ host: ${isDev ? DB_HOST : extract(DB_URL).host}`);
  Logger.log(
    `      ${isDev ? '╠' : '╚'}═ port: ${
      isDev ? DB_PORT : extract(DB_URL).port
    }`,
  );

  if (isDev) {
    Logger.log(`      ╚═ name: ${DB_NAME}`);
  }
};
