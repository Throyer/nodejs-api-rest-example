import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_URL } from 'src/environments/server';

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('NestJs REST API example')
    .setDescription(
      `A complete user registry, with access
      permissions, JWT token, integration and
      unit tests, using theRESTful API pattern.`,
    )
    .setExternalDoc('Schemas', `/${SWAGGER_URL}-json`)
    .setContact(
      'Throyer',
      'https://github.com/Throyer',
      'throyer.dev@gmail.com',
    )
    .setLicense(
      'GNU General Public License v3.0',
      'https://github.com/Throyer/nestjs-api-rest-example/blob/main/LICENSE',
    )
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_URL, app, document);
};
