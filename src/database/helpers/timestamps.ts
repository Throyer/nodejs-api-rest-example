import { TableColumn } from 'typeorm';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const timestamps = (): TableColumnOptions[] => [
  new TableColumn({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  }),
  new TableColumn({
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
  }),
];

export const timestampsWithSoftDelete = (): TableColumnOptions[] => [
  new TableColumn({
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
  }),
  new TableColumn({
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
  }),
  new TableColumn({
    name: 'deleted_at',
    type: 'timestamp',
    isNullable: true,
  }),
];
