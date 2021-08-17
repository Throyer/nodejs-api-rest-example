import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableManyToManyUserRole1603639063242
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_role',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'role_id',
            type: 'bigint',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('user_role', [
      new TableForeignKey({
        name: 'user_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'role_fk',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_role');
  }
}
