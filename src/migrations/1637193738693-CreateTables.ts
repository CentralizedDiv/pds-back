import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1637193738693 implements MigrationInterface {
  name = 'CreateTables1637193738693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "album" 
          ("id" char(36) NOT NULL, 
           "name" varchar(255) NOT NULL, 
           "url" varchar(255) NOT NULL,
           "extraPhotos" NULL BOOLEAN DEFAULT FALSE,
           "updatedAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
           "createdAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

           PRIMARY KEY ("id"))
           UNIQUE INDEX "IDX_57023c1b" ("url")`,
    );

    await queryRunner.query(
      `CREATE TABLE "photo" 
          ("id" char(36) NOT NULL, 
           "name" varchar(255) NOT NULL, 
           "url" varchar(255) NOT NULL,
           "updatedAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
           "createdAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

           PRIMARY KEY ("id")),
           UNIQUE INDEX "IDX_56d298e4" ("url")`,
    );

    await queryRunner.query(
      `CREATE TABLE "album_photo" 
          ("id" char(36) NOT NULL, 
           "albumId" char(36) NOT NULL, 
           "photoId" char(36) NOT NULL, 
           "isCover" NULL BOOLEAN DEFAULT FALSE,
           "isWaterMark" NULL BOOLEAN DEFAULT FALSE,
           
           PRIMARY KEY ("id")),
           CONSTRAINT FK_8895ed13 FOREIGN KEY ("albumId") REFERENCES album("id"),
           CONSTRAINT FK_4280d2b6 FOREIGN KEY ("photoId") REFERENCES photo("id")`,
    );

    await queryRunner.query(
      `CREATE TABLE "user" 
          ("id" char(36) NOT NULL, 
           "name" varchar(255) NOT NULL, 
           "email" varchar(255) NOT NULL,
           "updatedAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
           "createdAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
           "type" enum ('CUSTOMER', 'PHOTOGRAPHER') NOT NULL 

           PRIMARY KEY ("id")),
           UNIQUE INDEX "IDX_ed376943" ("email")`,
    );

    await queryRunner.query(
      `CREATE TABLE "user_photo" 
          ("id" char(36) NOT NULL, 
           "userId" char(36) NOT NULL, 
           "photoId" char(36) NOT NULL, 
           "albumId" char(36) NOT NULL, 
           "isSelected" NULL BOOLEAN DEFAULT FALSE,
           "isFavorite" NULL BOOLEAN DEFAULT FALSE
           
           PRIMARY KEY ("id")),
           CONSTRAINT FK_962caa38 FOREIGN KEY ("userId") REFERENCES user("id"),
           CONSTRAINT FK_20825a45 FOREIGN KEY ("albumId") REFERENCES album("id"),
           CONSTRAINT FK_dd637b66 FOREIGN KEY ("photoId") REFERENCES photo("id")`,
    );

    await queryRunner.query(
      `CREATE TABLE "comment" 
          ("id" char(36) NOT NULL, 
           "userId" char(36) NOT NULL, 
           "photoId" char(36) NOT NULL, 
           "description" varchar(255) NOT NULL, 
           "createdAt" NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
           "isDeleted" NULL BOOLEAN DEFAULT FALSE
           
           PRIMARY KEY ("id")),
           CONSTRAINT FK_980b707e FOREIGN KEY ("albumId") REFERENCES album("id"),
           CONSTRAINT FK_7f59f54d FOREIGN KEY ("photoId") REFERENCES photo("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" DROP FOREIGN KEY "FK_980b707e"`,
    );

    await queryRunner.query(
      `ALTER TABLE "comment" DROP FOREIGN KEY "FK_7f59f54d"`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_photo" DROP FOREIGN KEY "FK_962caa38"`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_photo" DROP FOREIGN KEY "FK_20825a45"`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_photo" DROP FOREIGN KEY "FK_dd637b66"`,
    );

    await queryRunner.query(
      `ALTER TABLE "album_photo" DROP FOREIGN KEY "FK_8895ed13"`,
    );

    await queryRunner.query(
      `ALTER TABLE "album_photo" DROP FOREIGN KEY "FK_4280d2b6"`,
    );

    await queryRunner.query(`DROP INDEX "IDX_ed376943" on "user"`);
    await queryRunner.query(`DROP INDEX "IDX_56d298e4" on "photo"`);
    await queryRunner.query(`DROP INDEX "IDX_57023c1b" on "album"`);

    await queryRunner.query(`DROP TABLE "comment"`);
    await queryRunner.query(`DROP TABLE "user_photo"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "album_photo"`);
    await queryRunner.query(`DROP TABLE "photo"`);
    await queryRunner.query(`DROP TABLE "album"`);
  }
}
