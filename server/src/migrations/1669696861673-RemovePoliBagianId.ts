import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemovePoliBagianId1669696861673 implements MigrationInterface {
  name = 'RemovePoliBagianId1669696861673'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "ref_bhp" DROP COLUMN "poliBagianId"')
    await queryRunner.query('ALTER TABLE "ref_obat" DROP COLUMN "poliBagianId"')
    await queryRunner.query('ALTER TABLE "ref_tindakan" DROP COLUMN "poliBagianId"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "ref_tindakan" ADD "poliBagianId" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "ref_obat" ADD "poliBagianId" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "ref_bhp" ADD "poliBagianId" integer NOT NULL')
  }

}
