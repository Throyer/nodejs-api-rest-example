import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import { SERVER_PORT } from './environments/server';
import { swagger } from './swagger';
import { started } from './utils/display-environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  swagger(app);
  await app.listen(SERVER_PORT, () => started());
}
bootstrap();
