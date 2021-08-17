import { primaryKey } from '@utils/database';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRefreshToken1629165457229
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refresh_token',
        columns: [
          primaryKey(),
          {
            name: 'code',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'expires_in',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'available',
            type: 'boolean',
            default: 'false',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('refresh_token');
  }
}
