import { createConnection } from 'typeorm';

createConnection()
  .then(({ name }) => console.log(`Database connected. connection: ${name}`))
  .catch(error => console.error('Error on database connection', { error }));
