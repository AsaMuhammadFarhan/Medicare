import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNomorTelepon1670064210792 implements MigrationInterface {
  name = 'AddNomorTelepon1670064210792'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pasien" ADD "nomorTelepon" character varying')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pasien" DROP COLUMN "nomorTelepon"')
  }

}
