import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableManyToManyUserRole1603639063242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_role',
            columns: [
                {
                    name: 'user_id',
                    type: 'bigint'
                },
                {
                    name: 'role_id',
                    type: 'bigint'
                }
            ],
            foreignKeys: [
                {
                    name: 'user_id_fk',
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id']
                },
                {
                    name: 'role_id_fk',
                    referencedTableName: 'role',
                    referencedColumnNames: ['id'],
                    columnNames: ['role_id']
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_role');
    }

}
