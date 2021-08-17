import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createForeignkeyUserIdOnRefreshToken1629165689047
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('refresh_token', [
      new TableForeignKey({
        name: 'user_refresh_token_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('refresh_token', 'user_refresh_token_fk');
  }
}
