import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeKunjunganPoliManyToOne1670091168684 implements MigrationInterface {
  name = 'MakeKunjunganPoliManyToOne1670091168684'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD CONSTRAINT "FK_0e351365e0647879bbca557c48a" FOREIGN KEY ("kunjunganId") REFERENCES "kunjungan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP CONSTRAINT "FK_0e351365e0647879bbca557c48a"')
  }

}
