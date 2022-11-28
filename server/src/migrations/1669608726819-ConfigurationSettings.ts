import { MigrationInterface, QueryRunner } from 'typeorm'

export class ConfigurationSettings1669608726819 implements MigrationInterface {
  name = 'ConfigurationSettings1669608726819'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "configuration_settings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5211138e89f3a076289811594db" UNIQUE ("name"), CONSTRAINT "PK_1cee1e56cc074c91f6673cace60" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "configuration_settings"')
  }

}
