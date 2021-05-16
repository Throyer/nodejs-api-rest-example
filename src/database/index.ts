import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

useContainer(Container);
createConnection();
