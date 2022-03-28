import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { primaryKey } from '../helpers/primary-key';
import { timestamps } from '../helpers/timestamps';

export class createTableRole1648389426169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'initials',
            type: 'varchar',
            length: '20',
            isUnique: true,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            length: '95',
            isNullable: true,
          }),
          ...timestamps(),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
