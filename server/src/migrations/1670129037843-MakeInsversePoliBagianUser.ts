import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeInsversePoliBagianUser1670129037843 implements MigrationInterface {
  name = 'MakeInsversePoliBagianUser1670129037843'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP CONSTRAINT "FK_6ee95ea5815ae6e4fbde135a50b"')
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP CONSTRAINT "UQ_6ee95ea5815ae6e4fbde135a50b"')
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP COLUMN "userId"')
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "UQ_7bbc75072f5ab516846dbc148f4" UNIQUE ("poliBagianId")')
    await queryRunner.query('ALTER TABLE "user" ADD CONSTRAINT "FK_7bbc75072f5ab516846dbc148f4" FOREIGN KEY ("poliBagianId") REFERENCES "poli_bagian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "FK_7bbc75072f5ab516846dbc148f4"')
    await queryRunner.query('ALTER TABLE "user" DROP CONSTRAINT "UQ_7bbc75072f5ab516846dbc148f4"')
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD "userId" integer')
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD CONSTRAINT "UQ_6ee95ea5815ae6e4fbde135a50b" UNIQUE ("userId")')
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD CONSTRAINT "FK_6ee95ea5815ae6e4fbde135a50b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

}
