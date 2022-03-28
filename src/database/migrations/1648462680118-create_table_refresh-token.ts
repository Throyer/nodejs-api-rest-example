import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class createTableRefreshToken1648462680118
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'code',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'device_code',
            type: 'varchar',
          }),
          new TableColumn({
            name: 'expires_in',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'available',
            type: 'boolean',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
          new TableColumn({
            name: 'user_id',
            type: 'bigint',
            isNullable: true,
          }),
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'refresh_token_user_fk',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_token');
  }
}
