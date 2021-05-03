import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const primaryKey = (): TableColumnOptions => ({
  name: 'id',
  type: 'bigint',
  isGenerated: true,
  isPrimary: true,
  generationStrategy: 'increment',
});
