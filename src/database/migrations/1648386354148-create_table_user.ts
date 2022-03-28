import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { primaryKey } from '../helpers/primary-key';
import { timestampsWithSoftDelete } from '../helpers/timestamps';

export class createTableUser1648386354148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '95',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '120',
            isUnique: true,
            isNullable: true,
          }),
          new TableColumn({
            name: 'deleted_email',
            type: 'varchar',
            length: '120',
            isUnique: true,
            isNullable: true,
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            length: '195',
          }),
          new TableColumn({
            name: 'active',
            type: 'boolean',
            default: 'true',
          }),
          ...timestampsWithSoftDelete(),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
