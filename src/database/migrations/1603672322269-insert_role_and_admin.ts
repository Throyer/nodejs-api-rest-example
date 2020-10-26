import {MigrationInterface, QueryRunner} from "typeorm";

export class insertRoleAndAdmin1603672322269 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO role
                (name, initials)
            VALUES
                ('Administrador', 'ADM'),
                ('Usuario', 'USER')
        `);

        await queryRunner.query(`
            INSERT INTO user
                (name, email, password)
            VALUES
                ('admin', 'admin@email.com', '$2a$08$RWL.D9.S9WOVio4cVYaV6.V/EgBeGJVFJ9.04GlBPZ0/iFS/GEhfa')
        `);

        await queryRunner.query(`
            INSERT INTO user_role
                (user_id, role_id)
            VALUES
                (
                    (SELECT id FROM user WHERE email = 'admin@email.com'),
                    (SELECT id FROM role WHERE initials = 'ADM')
                ),(
                    (SELECT id FROM user WHERE email = 'admin@email.com'),
                    (SELECT id FROM role WHERE initials = 'USER')
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DELETE FROM user_role WHERE user_id = (SELECT id FROM user WHERE email = 'admin@email.com')");
        await queryRunner.query("DELETE FROM role WHERE id = (SELECT id FROM role WHERE initials = 'ADM')");
        await queryRunner.query("DELETE FROM role WHERE id = (SELECT id FROM role WHERE initials = 'USER')");
        await queryRunner.query("DELETE FROM user WHERE id = (SELECT id FROM user WHERE email = 'admin@email.com')");
    }

}
