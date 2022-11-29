import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeKunjPoliToManyToOne1669721572705 implements MigrationInterface {
  name = 'ChangeKunjPoliToManyToOne1669721572705'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD "kunjunganId" integer NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP COLUMN "kunjunganId"')
  }

}
