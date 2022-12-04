import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakePolibagianJoinColumnUser1670128900976 implements MigrationInterface {
  name = 'MakePolibagianJoinColumnUser1670128900976'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD "userId" integer')
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD CONSTRAINT "UQ_6ee95ea5815ae6e4fbde135a50b" UNIQUE ("userId")')
    await queryRunner.query('ALTER TABLE "poli_bagian" ADD CONSTRAINT "FK_6ee95ea5815ae6e4fbde135a50b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP CONSTRAINT "FK_6ee95ea5815ae6e4fbde135a50b"')
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP CONSTRAINT "UQ_6ee95ea5815ae6e4fbde135a50b"')
    await queryRunner.query('ALTER TABLE "poli_bagian" DROP COLUMN "userId"')
  }

}
