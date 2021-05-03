import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { primaryKey, timestamps } from '@utils/database';

export class createTableUsers1603637859526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          primaryKey(),
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'access_token',
            type: 'varchar',
            isNullable: true,
          },
          ...timestamps(),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
