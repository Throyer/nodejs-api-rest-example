import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableManyToManyUserRole1603639063242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_role',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'role_id',
                    type: 'int',
                    isNullable: true,
                }
            ],
            foreignKeys: [
                {
                    name: 'user_fk',
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user',
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                },
                {
                    name: 'role_fk',
                    columnNames: ['role_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'role',
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user_role');
    }

}
