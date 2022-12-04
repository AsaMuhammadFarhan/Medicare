import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRelationBhpKunjunganPoli1670132775581 implements MigrationInterface {
  name = 'AddRelationBhpKunjunganPoli1670132775581'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bhp" ADD "kunjunganPoliId" integer NOT NULL')
    await queryRunner.query('ALTER TABLE "bhp" ADD CONSTRAINT "FK_c2955dd9c21ff34c659b70dc3b1" FOREIGN KEY ("kunjunganPoliId") REFERENCES "kunjungan_poli"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bhp" DROP CONSTRAINT "FK_c2955dd9c21ff34c659b70dc3b1"')
    await queryRunner.query('ALTER TABLE "bhp" DROP COLUMN "kunjunganPoliId"')
  }

}
