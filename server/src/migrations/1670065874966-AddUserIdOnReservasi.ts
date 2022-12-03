import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserIdOnReservasi1670065874966 implements MigrationInterface {
  name = 'AddUserIdOnReservasi1670065874966'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "reservasi" DROP CONSTRAINT "FK_be9e9d1978745ad98c93e547b12"')
    await queryRunner.query('ALTER TABLE "reservasi" ALTER COLUMN "userId" SET NOT NULL')
    await queryRunner.query('ALTER TABLE "reservasi" ADD CONSTRAINT "FK_be9e9d1978745ad98c93e547b12" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "reservasi" DROP CONSTRAINT "FK_be9e9d1978745ad98c93e547b12"')
    await queryRunner.query('ALTER TABLE "reservasi" ALTER COLUMN "userId" DROP NOT NULL')
    await queryRunner.query('ALTER TABLE "reservasi" ADD CONSTRAINT "FK_be9e9d1978745ad98c93e547b12" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION')
  }

}
