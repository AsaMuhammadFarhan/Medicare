import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeKunjunganToJoinColumn1670069407204 implements MigrationInterface {
  name = 'MakeKunjunganToJoinColumn1670069407204'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan" ADD CONSTRAINT "UQ_c00b0e4362a35c978f85030d69b" UNIQUE ("reservasiId")')
    await queryRunner.query('ALTER TABLE "kunjungan" ADD CONSTRAINT "FK_c00b0e4362a35c978f85030d69b" FOREIGN KEY ("reservasiId") REFERENCES "reservasi"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan" DROP CONSTRAINT "FK_c00b0e4362a35c978f85030d69b"')
    await queryRunner.query('ALTER TABLE "kunjungan" DROP CONSTRAINT "UQ_c00b0e4362a35c978f85030d69b"')
  }

}
