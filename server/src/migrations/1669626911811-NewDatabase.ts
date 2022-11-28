import { MigrationInterface, QueryRunner } from 'typeorm'

export class NewDatabase1669626911811 implements MigrationInterface {
  name = 'NewDatabase1669626911811'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "configuration_settings" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1cee1e56cc074c91f6673cace60" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "pasien" ("id" SERIAL NOT NULL, "noRm" character varying, "nama" character varying, "nik" character varying, "alamat" character varying, "tempatLahir" character varying, "tanggalLahir" TIMESTAMP, "rt" character varying, "rw" character varying, "idKelurahan" character varying, "idKecamatan" character varying, "idKabupatenKota" character varying, "idProvinsi" character varying, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_f44abc202e4336cf1992fe840f" UNIQUE ("userId"), CONSTRAINT "PK_62a8220a1a4ed7d901a8124f475" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL DEFAULT \'guest\', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "pasien" ADD CONSTRAINT "FK_f44abc202e4336cf1992fe840fe" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "pasien" DROP CONSTRAINT "FK_f44abc202e4336cf1992fe840fe"')
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "pasien"')
    await queryRunner.query('DROP TABLE "configuration_settings"')
  }

}
