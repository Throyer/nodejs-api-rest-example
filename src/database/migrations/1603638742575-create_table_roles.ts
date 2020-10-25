import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTableRoles1603638742575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'role',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'initials',
                    type: 'varchar'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role');
    }

}
