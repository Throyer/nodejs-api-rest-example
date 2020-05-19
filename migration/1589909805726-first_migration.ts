import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1589909805726 implements MigrationInterface {
    name = 'firstMigration1589909805726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `permissao` (`id` int NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `usuario` (`id` int NOT NULL AUTO_INCREMENT, `nome` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `senha` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `usuario_permissao` (`usuario_id` int NOT NULL, `permissao_id` int NOT NULL, INDEX `IDX_68ec4c570a03cc718131614d2d` (`usuario_id`), INDEX `IDX_78fae70343b9b13b249b59a587` (`permissao_id`), PRIMARY KEY (`usuario_id`, `permissao_id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `usuario_permissao` ADD CONSTRAINT `FK_68ec4c570a03cc718131614d2d1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `usuario_permissao` ADD CONSTRAINT `FK_78fae70343b9b13b249b59a5873` FOREIGN KEY (`permissao_id`) REFERENCES `permissao`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario_permissao` DROP FOREIGN KEY `FK_78fae70343b9b13b249b59a5873`", undefined);
        await queryRunner.query("ALTER TABLE `usuario_permissao` DROP FOREIGN KEY `FK_68ec4c570a03cc718131614d2d1`", undefined);
        await queryRunner.query("DROP INDEX `IDX_78fae70343b9b13b249b59a587` ON `usuario_permissao`", undefined);
        await queryRunner.query("DROP INDEX `IDX_68ec4c570a03cc718131614d2d` ON `usuario_permissao`", undefined);
        await queryRunner.query("DROP TABLE `usuario_permissao`", undefined);
        await queryRunner.query("DROP TABLE `usuario`", undefined);
        await queryRunner.query("DROP TABLE `permissao`", undefined);
    }

}
