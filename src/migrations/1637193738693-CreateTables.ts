import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1637193738693 implements MigrationInterface {
  name = 'CreateTables1637193738693';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "whitelabel" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "url" character varying(255) NOT NULL, CONSTRAINT "UQ_e04c8746736d6209618e21ca350" UNIQUE ("url"), CONSTRAINT "PK_7869984fc9429a262b771e22542" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "whitelabel"`);
  }
}
