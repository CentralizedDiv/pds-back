import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTables1637515403798 implements MigrationInterface {
    name = 'AlterTables1637515403798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`isWaterMark\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name2\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD \`photoId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`isSelected\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`albumId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`waterMarkURL\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_31ef2b4d30675d0c15056b7f6e\` ON \`user\` (\`type\`)`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_16688e4a4f41cb008e4d7934a4c\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_464bcdec1590ef4d623166f1b54\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_464bcdec1590ef4d623166f1b54\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_16688e4a4f41cb008e4d7934a4c\``);
        await queryRunner.query(`DROP INDEX \`IDX_31ef2b4d30675d0c15056b7f6e\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`type\` enum ('CUSTOMER', 'PHOTOGRAPHER') NOT NULL DEFAULT 'CUSTOMER'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`waterMarkURL\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`albumId\``);
        await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`isSelected\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP COLUMN \`photoId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name2\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD \`isWaterMark\` tinyint NOT NULL DEFAULT '0'`);
    }

}
