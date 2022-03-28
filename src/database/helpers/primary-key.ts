import { TableColumn } from 'typeorm';

export const primaryKey = () =>
  new TableColumn({
    name: 'id',
    type: 'bigint',
    isGenerated: true,
    isPrimary: true,
    generationStrategy: 'increment',
  });
