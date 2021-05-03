import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';
import { internet, name, phone } from 'faker';
import { hash } from 'bcryptjs';

import { Role, User } from '@models/user';
import { itemFromArray } from '@utils/random';

export class insertManyUsers1619940452028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const USERS_COUNT = 500;
    const PASSWORD = 'password';

    const ALL_ROLES = await queryRunner.connection.getRepository(Role).find({
      select: ['id'],
    });

    const users: DeepPartial<User>[] = await Promise.all(
      Array(USERS_COUNT)
        .fill(0)
        .map(
          async (): Promise<DeepPartial<User>> => ({
            name: name.findName(),
            password: await hash(PASSWORD, 8),
            email: internet.email(),
            phone: phone.phoneNumber(
              itemFromArray(['(##)#####-####', '(##)####-####']),
            ),
            nickname: internet.userName(),
            roles: [itemFromArray(ALL_ROLES)],
          }),
        ),
    );

    await queryRunner.connection.getRepository(User).save(users);
  }

  public async down(): Promise<void> {
    console.warn("SEEDS CAN'T ROLLBACK");
  }
}
