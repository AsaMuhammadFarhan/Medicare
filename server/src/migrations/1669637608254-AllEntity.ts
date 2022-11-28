import { MigrationInterface, QueryRunner } from 'typeorm'

export class AllEntity1669637608254 implements MigrationInterface {
  name = 'AllEntity1669637608254'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "reservasi" ("id" SERIAL NOT NULL, "tanggalRencanaDatang" TIMESTAMP NOT NULL, "nomorTelepon" character varying, "statusPasien" character varying, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "poliBagianId" integer, "dokterId" integer, CONSTRAINT "PK_ff15c3a3fbd23ef7779aff85f0a" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "poli_bagian" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "hargaPendaftaran" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ce8c7dc87afa79b5b0654935005" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "dokter" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "nomorTelepon" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poliBagianId" integer NOT NULL, CONSTRAINT "PK_04d58e08cc389df98a60aab0753" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "ref_obat" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "harga" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poliBagianId" integer NOT NULL, CONSTRAINT "PK_58ddf1d3614b5d35460907225cd" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "obat" ("id" SERIAL NOT NULL, "harga" integer NOT NULL, "jumlah" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "kunjunganPoliId" integer, "refObatId" integer, CONSTRAINT "PK_75294be1aa56e994d68c3a1d16d" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "penyakit" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "kode" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2800d046b666d4471d62a0a59b8" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "perawat" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "nomorTelepon" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_299f3ebf6f00d0e5b2365db4e6e" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "ref_tindakan" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "harga" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poliBagianId" integer NOT NULL, CONSTRAINT "PK_7051c83c07f9482b68de2fc9d09" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "tindakan" ("id" SERIAL NOT NULL, "harga" integer NOT NULL, "jumlah" integer NOT NULL, "bagiHasilDokter" integer NOT NULL, "bagiHasilPerawat" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refTindakanId" integer, "kunjunganPoliId" integer, CONSTRAINT "PK_3e025964734ba0283c4c593fffd" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "kunjungan_poli" ("id" SERIAL NOT NULL, "biayaPoli" character varying NOT NULL, "hasilBagiDokter" character varying NOT NULL, "hasilBagiPerawat" character varying NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poliBagianId" integer, "dokterId" integer, "perawatId" integer, "penyakitId" integer, CONSTRAINT "PK_281e49f81da48bf1f1c91d2f4dd" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "kunjungan" ("id" SERIAL NOT NULL, "tekananDarah" integer NOT NULL, "denyutNadi" integer NOT NULL, "usiaTahun" integer NOT NULL, "usiaBulan" integer NOT NULL, "usiaHari" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "penyakitId" integer, CONSTRAINT "PK_b00487bf6a8ccbb58b37768f88a" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "ref_bhp" ("id" SERIAL NOT NULL, "nama" character varying NOT NULL, "harga" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "poliBagianId" integer NOT NULL, CONSTRAINT "PK_1b8fe259713b361ae7c7ba42dcc" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "bhp" ("id" SERIAL NOT NULL, "harga" integer NOT NULL, "jumlah" integer NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "refBhpId" integer, CONSTRAINT "PK_dd7c3bfafa852116f9c91397ba2" PRIMARY KEY ("id"))')
    await queryRunner.query('ALTER TABLE "reservasi" ADD CONSTRAINT "FK_be9e9d1978745ad98c93e547b12" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "reservasi" ADD CONSTRAINT "FK_fcda02184a2a199580e4c5a0774" FOREIGN KEY ("poliBagianId") REFERENCES "poli_bagian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "reservasi" ADD CONSTRAINT "FK_14fa2860224a19d7cd9740d3a61" FOREIGN KEY ("dokterId") REFERENCES "dokter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "dokter" ADD CONSTRAINT "FK_d308d952086653b77fc2ad7240d" FOREIGN KEY ("poliBagianId") REFERENCES "poli_bagian"("id") ON DELETE SET NULL ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "obat" ADD CONSTRAINT "FK_674d2a594b62b922dba2a8b6fac" FOREIGN KEY ("kunjunganPoliId") REFERENCES "kunjungan_poli"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "obat" ADD CONSTRAINT "FK_2a6ec97144614ccc0bdcbb25b0d" FOREIGN KEY ("refObatId") REFERENCES "ref_obat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "tindakan" ADD CONSTRAINT "FK_a542af81b59d3e65d593a77b999" FOREIGN KEY ("refTindakanId") REFERENCES "ref_tindakan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "tindakan" ADD CONSTRAINT "FK_c47fb5ed4f33fcf2d0597c415b6" FOREIGN KEY ("kunjunganPoliId") REFERENCES "kunjungan_poli"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD CONSTRAINT "FK_0cefc763fa7bb353c3a9b8c533c" FOREIGN KEY ("poliBagianId") REFERENCES "poli_bagian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD CONSTRAINT "FK_291f6490928c9a9a28876bb13bd" FOREIGN KEY ("dokterId") REFERENCES "dokter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD CONSTRAINT "FK_cc75ba6e19b43a6756e076808b7" FOREIGN KEY ("perawatId") REFERENCES "perawat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" ADD CONSTRAINT "FK_3cd38b1b696f348d3117538254b" FOREIGN KEY ("penyakitId") REFERENCES "penyakit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan" ADD CONSTRAINT "FK_815a30c04caaea6cac8e0bfd703" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "kunjungan" ADD CONSTRAINT "FK_97aacbe549c64c25bb53ba09014" FOREIGN KEY ("penyakitId") REFERENCES "penyakit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "bhp" ADD CONSTRAINT "FK_65192ba6227c61db00ddd026eb6" FOREIGN KEY ("refBhpId") REFERENCES "ref_bhp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "bhp" DROP CONSTRAINT "FK_65192ba6227c61db00ddd026eb6"')
    await queryRunner.query('ALTER TABLE "kunjungan" DROP CONSTRAINT "FK_97aacbe549c64c25bb53ba09014"')
    await queryRunner.query('ALTER TABLE "kunjungan" DROP CONSTRAINT "FK_815a30c04caaea6cac8e0bfd703"')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP CONSTRAINT "FK_3cd38b1b696f348d3117538254b"')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP CONSTRAINT "FK_cc75ba6e19b43a6756e076808b7"')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP CONSTRAINT "FK_291f6490928c9a9a28876bb13bd"')
    await queryRunner.query('ALTER TABLE "kunjungan_poli" DROP CONSTRAINT "FK_0cefc763fa7bb353c3a9b8c533c"')
    await queryRunner.query('ALTER TABLE "tindakan" DROP CONSTRAINT "FK_c47fb5ed4f33fcf2d0597c415b6"')
    await queryRunner.query('ALTER TABLE "tindakan" DROP CONSTRAINT "FK_a542af81b59d3e65d593a77b999"')
    await queryRunner.query('ALTER TABLE "obat" DROP CONSTRAINT "FK_2a6ec97144614ccc0bdcbb25b0d"')
    await queryRunner.query('ALTER TABLE "obat" DROP CONSTRAINT "FK_674d2a594b62b922dba2a8b6fac"')
    await queryRunner.query('ALTER TABLE "dokter" DROP CONSTRAINT "FK_d308d952086653b77fc2ad7240d"')
    await queryRunner.query('ALTER TABLE "reservasi" DROP CONSTRAINT "FK_14fa2860224a19d7cd9740d3a61"')
    await queryRunner.query('ALTER TABLE "reservasi" DROP CONSTRAINT "FK_fcda02184a2a199580e4c5a0774"')
    await queryRunner.query('ALTER TABLE "reservasi" DROP CONSTRAINT "FK_be9e9d1978745ad98c93e547b12"')
    await queryRunner.query('DROP TABLE "bhp"')
    await queryRunner.query('DROP TABLE "ref_bhp"')
    await queryRunner.query('DROP TABLE "kunjungan"')
    await queryRunner.query('DROP TABLE "kunjungan_poli"')
    await queryRunner.query('DROP TABLE "tindakan"')
    await queryRunner.query('DROP TABLE "ref_tindakan"')
    await queryRunner.query('DROP TABLE "perawat"')
    await queryRunner.query('DROP TABLE "penyakit"')
    await queryRunner.query('DROP TABLE "obat"')
    await queryRunner.query('DROP TABLE "ref_obat"')
    await queryRunner.query('DROP TABLE "dokter"')
    await queryRunner.query('DROP TABLE "poli_bagian"')
    await queryRunner.query('DROP TABLE "reservasi"')
  }

}
