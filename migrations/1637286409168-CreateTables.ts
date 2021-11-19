import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1637286409168 implements MigrationInterface {
  name = 'CreateTables1637286409168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`photo\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`isCover\` tinyint NOT NULL DEFAULT 0, \`isWaterMark\` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX \`IDX_26e2f7347378254c076729d53c\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`album\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`extraPhotos\` tinyint NOT NULL, UNIQUE INDEX \`IDX_168bbfed59ccc9e4f4f401e1ce\` (\`url\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`type\` enum ('CUSTOMER', 'PHOTOGRAPHER') NOT NULL DEFAULT 'CUSTOMER', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`photo_comments_comment\` (\`photoId\` varchar(36) NOT NULL, \`commentId\` varchar(36) NOT NULL, INDEX \`IDX_61f34bec191b274225ba5ab3a4\` (\`photoId\`), INDEX \`IDX_95c274b13ee9c2ee5b29a7f403\` (\`commentId\`), PRIMARY KEY (\`photoId\`, \`commentId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`album_photos_photo\` (\`albumId\` varchar(36) NOT NULL, \`photoId\` varchar(36) NOT NULL, INDEX \`IDX_fb5deea2817dea41af76b11fd1\` (\`albumId\`), INDEX \`IDX_d292b18c5fbb585c8ddb959ea8\` (\`photoId\`), PRIMARY KEY (\`albumId\`, \`photoId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_selected_photos_photo\` (\`userId\` varchar(36) NOT NULL, \`photoId\` varchar(36) NOT NULL, INDEX \`IDX_d09979df8f306a4431ef3bf9a0\` (\`userId\`), INDEX \`IDX_f946b01b15cb4327dffe3cfad3\` (\`photoId\`), PRIMARY KEY (\`userId\`, \`photoId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo_comments_comment\` ADD CONSTRAINT \`FK_61f34bec191b274225ba5ab3a43\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo_comments_comment\` ADD CONSTRAINT \`FK_95c274b13ee9c2ee5b29a7f403f\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`album_photos_photo\` ADD CONSTRAINT \`FK_fb5deea2817dea41af76b11fd15\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`album_photos_photo\` ADD CONSTRAINT \`FK_d292b18c5fbb585c8ddb959ea81\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_selected_photos_photo\` ADD CONSTRAINT \`FK_d09979df8f306a4431ef3bf9a0a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_selected_photos_photo\` ADD CONSTRAINT \`FK_f946b01b15cb4327dffe3cfad3f\` FOREIGN KEY (\`photoId\`) REFERENCES \`photo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_selected_photos_photo\` DROP FOREIGN KEY \`FK_f946b01b15cb4327dffe3cfad3f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_selected_photos_photo\` DROP FOREIGN KEY \`FK_d09979df8f306a4431ef3bf9a0a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`album_photos_photo\` DROP FOREIGN KEY \`FK_d292b18c5fbb585c8ddb959ea81\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`album_photos_photo\` DROP FOREIGN KEY \`FK_fb5deea2817dea41af76b11fd15\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo_comments_comment\` DROP FOREIGN KEY \`FK_95c274b13ee9c2ee5b29a7f403f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo_comments_comment\` DROP FOREIGN KEY \`FK_61f34bec191b274225ba5ab3a43\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f946b01b15cb4327dffe3cfad3\` ON \`user_selected_photos_photo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d09979df8f306a4431ef3bf9a0\` ON \`user_selected_photos_photo\``,
    );
    await queryRunner.query(`DROP TABLE \`user_selected_photos_photo\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_d292b18c5fbb585c8ddb959ea8\` ON \`album_photos_photo\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fb5deea2817dea41af76b11fd1\` ON \`album_photos_photo\``,
    );
    await queryRunner.query(`DROP TABLE \`album_photos_photo\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_95c274b13ee9c2ee5b29a7f403\` ON \`photo_comments_comment\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_61f34bec191b274225ba5ab3a4\` ON \`photo_comments_comment\``,
    );
    await queryRunner.query(`DROP TABLE \`photo_comments_comment\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_168bbfed59ccc9e4f4f401e1ce\` ON \`album\``,
    );
    await queryRunner.query(`DROP TABLE \`album\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_26e2f7347378254c076729d53c\` ON \`photo\``,
    );
    await queryRunner.query(`DROP TABLE \`photo\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
  }
}
