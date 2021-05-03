import { primaryKey, timestamps } from '@utils/database';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRoles1603638742575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          primaryKey(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'initials',
            type: 'varchar',
            isUnique: true,
          },
          ...timestamps(),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
