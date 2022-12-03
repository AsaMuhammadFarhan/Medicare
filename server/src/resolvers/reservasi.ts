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
  poliBagianId: number

  @Field()
  dokterId: number
}

@Resolver()
export class ReservasiResolver {
  @Query(() => [Reservasi], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllReservasis(): Promise<Reservasi[] | undefined> {
    const query = getConnection()
      .getRepository(Reservasi)
      .createQueryBuilder('Reservasi')
      .leftJoinAndSelect('Reservasi.dokter', 'dokter')
      .leftJoinAndSelect('Reservasi.poliBagian', 'poliBagian')
      .leftJoinAndSelect('Reservasi.kunjungan', 'kunjungan')
      .leftJoinAndSelect('Reservasi.user', 'user')
      .leftJoinAndSelect('user', 'user.pasien')
    // .leftJoinAndSelect('Reservasi.value', 'value')

    return await query.getMany()
  }

  // @Query(() => [Reservasi], { nullable: true })
  // @UseMiddleware(isAdmin)
  // async getReservasis(
  //   @Arg("keywords") keywords: string
  // ): Promise<Reservasi[] | undefined> {
  //   const query = getConnection()
  //     .getRepository(Reservasi)
  //     .createQueryBuilder("Reservasi")
  //     .leftJoinAndSelect('Reservasi.dokter', 'dokter')
  //     .leftJoinAndSelect('Reservasi.poliBagian', 'poliBagian')
  //     .leftJoinAndSelect('Reservasi.kunjungan', 'kunjungan')
  //     .leftJoinAndSelect('Reservasi.user', 'user')
  //     // .leftJoinAndSelect('Reservasi.name', 'name')
  //     // .leftJoinAndSelect('Reservasi.value', 'value')

  //   const keywordList = keywords.split(" ");
  //   for (let i = 0; i < keywordList.length; i++) {
  //     const key = i;
  //     const param = {
  //       [key]: `%${keywordList[i]}%`.toLowerCase(),
  //     };
  //     query.orWhere(
  //       `LOWER(ReservasiAttribut) LIKE :${key} OR LOWER(anotherReservasiAttribut) LIKE :${key}`,
  //       param
  //     );
  //   }
  //   return await query.getMany();
  // }

  @Query(() => Reservasi, { nullable: true })
  @UseMiddleware(isAdmin)
  async getReservasi(
    @Arg('id', () => Int) id: number
  ): Promise<Reservasi | undefined> {
    const query = getConnection()
      .getRepository(Reservasi)
      .createQueryBuilder('Reservasi')
      .where('"Reservasi"."id" = :id', { id })
      .leftJoinAndSelect('Reservasi.dokter', 'dokter')
      .leftJoinAndSelect('Reservasi.poliBagian', 'poliBagian')
      .leftJoinAndSelect('Reservasi.kunjungan', 'kunjungan')
      .leftJoinAndSelect('Reservasi.user', 'user')
    // .leftJoinAndSelect('Reservasi.reservasi', 'reservasi')

    return await query.getOne()
  }

  @Mutation(() => Reservasi)
  @UseMiddleware(isAdmin)
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
  async deleteReservasi(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Reservasi.delete(id)
    return true
  }
}
