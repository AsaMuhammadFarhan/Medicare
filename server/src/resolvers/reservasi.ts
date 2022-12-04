import { Reservasi } from '../entities/Reservasi'
import { isAdmin } from '../middleware/isAdmin'
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { getConnection } from 'typeorm'

@InputType()
class ReservasiInput {
  @Field({ nullable: true })
  tanggalRencanaDatang: Date

  @Field({ nullable: true })
  nomorTelepon: string

  @Field({ nullable: true })
  statusPasien: string

  @Field()
  createdBy: string

  @Field()
  updatedBy: string

  @Field()
  userId: number

  @Field()
  poliBagianId: number

  @Field()
  dokterId: number
}

@Resolver()
export class ReservasiResolver {
  @Query(() => [Reservasi], { nullable: true })
  async getAllReservasis(): Promise<Reservasi[] | undefined> {
    const query = getConnection()
      .getRepository(Reservasi)
      .createQueryBuilder('Reservasi')
      .leftJoinAndSelect('Reservasi.dokter', 'dokterReservasi')
      .leftJoinAndSelect('Reservasi.poliBagian', 'poliBagianKunjunganUmum')
      .leftJoinAndSelect('Reservasi.kunjungan', 'kunjungan')
      .leftJoinAndSelect('kunjungan.kunjunganPoli', 'kunjunganPoli')
      .leftJoinAndSelect('kunjunganPoli.poliBagian', 'poliBagian')
      .leftJoinAndSelect('kunjunganPoli.dokter', 'dokter')
      .leftJoinAndSelect('kunjunganPoli.perawat', 'perawat')
      .leftJoinAndSelect('kunjunganPoli.obat', 'obat')
      .leftJoinAndSelect('obat.refObat', 'refObat')
      .leftJoinAndSelect('kunjunganPoli.bhp', 'bhp')
      .leftJoinAndSelect('bhp.refBhp', 'refBhp')
      .leftJoinAndSelect('kunjunganPoli.tindakan', 'tindakan')
      .leftJoinAndSelect('tindakan.refTindakan', 'refTindakan')
      .leftJoinAndSelect('kunjunganPoli.penyakit', 'penyakitPoli')
      .leftJoinAndSelect('Reservasi.user', 'user')
      .leftJoinAndSelect('user.pasien', 'userPasien')
      .orderBy('Reservasi.id', 'DESC')
    // .leftJoinAndSelect('Reservasi.value', 'value')

    return await query.getMany()
  }

  @Query(() => Reservasi, { nullable: true })
  async getReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | undefined> {
    const query = getConnection()
      .getRepository(Reservasi)
      .createQueryBuilder('Reservasi')
      .where('"Reservasi"."id" = :id', { id })
      .leftJoinAndSelect('Reservasi.dokter', 'dokterKunjunganUmum')
      .leftJoinAndSelect('Reservasi.poliBagian', 'poliBagianKunjunganUmum')
      .leftJoinAndSelect('Reservasi.kunjungan', 'kunjungan')
      .leftJoinAndSelect('kunjungan.kunjunganPoli', 'kunjunganPoli')
      .leftJoinAndSelect('kunjunganPoli.poliBagian', 'poliBagian')
      .leftJoinAndSelect('kunjunganPoli.dokter', 'dokter')
      .leftJoinAndSelect('kunjunganPoli.perawat', 'perawat')
      .leftJoinAndSelect('kunjunganPoli.obat', 'obat')
      .leftJoinAndSelect('obat.refObat', 'refObat')
      .leftJoinAndSelect('kunjunganPoli.bhp', 'bhp')
      .leftJoinAndSelect('bhp.refBhp', 'refBhp')
      .leftJoinAndSelect('kunjunganPoli.tindakan', 'tindakan')
      .leftJoinAndSelect('tindakan.refTindakan', 'refTindakan')
      .leftJoinAndSelect('kunjunganPoli.penyakit', 'penyakitPoli')
      .leftJoinAndSelect('kunjungan.penyakit', 'penyakit')
      .leftJoinAndSelect('Reservasi.user', 'user')
      .leftJoinAndSelect('user.pasien', 'userPasien')
    // .leftJoinAndSelect('Reservasi.reservasi', 'reservasi')

    return await query.getOne()
  }

  @Mutation(() => Reservasi)
  async createReservasi(
    @Arg('input') input: ReservasiInput
  ): Promise<Reservasi> {
    return await Reservasi.create({ ...input }).save()
  }

  @Mutation(() => Reservasi)
  @UseMiddleware(isAdmin)
  async updateReservasi(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: ReservasiInput
  ): Promise<Reservasi | null> {
    const found = await Reservasi.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Reservasi.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Reservasi)
  @UseMiddleware(isAdmin)
  async readyReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | null> {
    const found = await Reservasi.findOne(id)
    if (!found) {
      return null
    }
    found.statusPasien = 'ready'
    found.save()
    return found
  }

  @Mutation(() => Reservasi)
  async toWaitingPaymentReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | null> {
    const found = await Reservasi.findOne(id)
    if (!found) {
      return null
    }
    found.statusPasien = 'waitingPayment'
    found.save()
    return found
  }

  @Mutation(() => Reservasi)
  async toSuccessReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | null> {
    const found = await Reservasi.findOne(id)
    if (!found) {
      return null
    }
    found.statusPasien = 'success'
    found.save()
    return found
  }

  @Mutation(() => Reservasi)
  async toCanceledReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | null> {
    const found = await Reservasi.findOne(id)
    if (!found) {
      return null
    }
    found.statusPasien = 'canceled'
    found.save()
    return found
  }

  @Mutation(() => Reservasi)
  @UseMiddleware(isAdmin)
  async deleteReservasi(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Reservasi.delete(id)
    return true
  }
}
