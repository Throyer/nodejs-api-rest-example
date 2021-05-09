import path from 'path';

import { Express } from 'express';
import {
  RoutingControllersOptions,
  useExpressServer,
  getMetadataArgsStorage,
} from 'routing-controllers';

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';

import { CurrentUserChecker } from '@middlewares/CurrentUserChecker';
import { AuthorizationChecker } from '@middlewares/AuthorizationChecker';

export const routes = (app: Express): void => {
  const options: RoutingControllersOptions = {
    defaultErrorHandler: false,
    validation: true,
    authorizationChecker: AuthorizationChecker,
    currentUserChecker: CurrentUserChecker,
    controllers: [path.join(__dirname, '..', '/controllers/**/*{.ts,.js}')],
    middlewares: [path.join(__dirname, '..', '/middlewares/**/*{.ts,.js}')],
  };

  useExpressServer(app, options);

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const specifications = routingControllersToSpec(storage, options, {
    components: {
      schemas,
      securitySchemes: {
        jwt: {
          scheme: 'bearer',
          type: 'http',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ jwt: [] }],
    info: {
      title: 'Node Crud API docs',
      version: '1.0.0',
    },
  });

  app.use(
    '/docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(specifications),
  );
};
