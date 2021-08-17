import { DEFAULT_ADM_EMAIL, DEFAULT_ADM_PASSWORD } from '@config/env';
import { hash } from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertRoleAndAdmin1603672322269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await hash(DEFAULT_ADM_PASSWORD, 8);

    await queryRunner.query(`
      INSERT INTO "role"
          (name, initials)
      VALUES
          ('Administrador', 'ADM'),
          ('Usuário', 'USER');

      INSERT INTO "user"
        ("name", email, "password")
      VALUES
        ('admin', '${DEFAULT_ADM_EMAIL}', '${password}');

      INSERT INTO "user_role"
        ("user_id", "role_id")
      VALUES
        (
          (SELECT "id" FROM "user" WHERE "email" = '${DEFAULT_ADM_EMAIL}'),
          (SELECT "id" FROM "role" WHERE "initials" = 'ADM')
        ),(
          (SELECT "id" FROM "user" WHERE "email" = '${DEFAULT_ADM_EMAIL}'),
          (SELECT "id" FROM "role" WHERE "initials" = 'USER')
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "role" WHERE "initials" IN(
        'ADM',
        'USER'
      );

      DELETE FROM "user" WHERE "email" = '${DEFAULT_ADM_EMAIL}';
    `);
  }
}
