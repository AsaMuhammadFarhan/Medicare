import { Kunjungan } from '../entities/Kunjungan'
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
class KunjunganInput {
  @Field()
  tekananDarah: number

  @Field()
  denyutNadi: number

  @Field()
  usiaTahun: number

  @Field()
  usiaBulan: number

  @Field()
  usiaHari: number

  @Field(() => String)
  createdBy: string

  @Field(() => String)
  updatedBy: string

  @Field()
  userId: number

  @Field()
  reservasiId: number

  @Field()
  penyakitId: number
}

@Resolver()
export class KunjunganResolver {
  @Query(() => [Kunjungan], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllKunjungans(): Promise<Kunjungan[] | undefined> {
    const query = getConnection()
      .getRepository(Kunjungan)
      .createQueryBuilder('Kunjungan')
      .leftJoinAndSelect('Kunjungan.reservasi', 'reservasi')
      .leftJoinAndSelect('Kunjungan.penyakit', 'penyakit')
      .leftJoinAndSelect('Kunjungan.user', 'user')
      .leftJoinAndSelect('user.pasien', 'pasien')

    return await query.getMany()
  }

  @Query(() => [Kunjungan], { nullable: true })
  @UseMiddleware(isAdmin)
  async getKunjungans(
    @Arg('keywords') keywords: string
  ): Promise<Kunjungan[] | undefined> {
    const query = getConnection()
      .getRepository(Kunjungan)
      .createQueryBuilder('Kunjungan')
      .leftJoinAndSelect('Kunjungan.reservasi', 'reservasi')
      .leftJoinAndSelect('Kunjungan.penyakit', 'penyakit')
      .leftJoinAndSelect('Kunjungan.user', 'user')
      .leftJoinAndSelect('Kunjungan.kunjunganPoli', 'kunjunganPoli')
      .leftJoinAndSelect('user.pasien', 'pasien')

    const keywordList = keywords.split(' ')
    for (let i = 0; i < keywordList.length; i++) {
      const key = i
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase(),
      }
      query.orWhere(
        `LOWER(KunjunganAttribut) LIKE :${key} OR LOWER(anotherKunjunganAttribut) LIKE :${key}`,
        param
      )
    }
    return await query.getMany()
  }

  @Query(() => Kunjungan, { nullable: true })
  @UseMiddleware(isAdmin)
  async getKunjungan(
    @Arg('id', () => Int) id: number
  ): Promise<Kunjungan | undefined> {
    const query = getConnection()
      .getRepository(Kunjungan)
      .createQueryBuilder('Kunjungan')
      .where('"Kunjungan"."id" = :id', { id })
      .leftJoinAndSelect('Kunjungan.reservasi', 'reservasi')
      .leftJoinAndSelect('Kunjungan.penyakit', 'penyakit')
      .leftJoinAndSelect('Kunjungan.user', 'user')
      .leftJoinAndSelect('Kunjungan.kunjunganPoli', 'kunjunganPoli')
      .leftJoinAndSelect('user.pasien', 'pasien')

    return await query.getOne()
  }

  @Mutation(() => Kunjungan)
  @UseMiddleware(isAdmin)
  async createKunjungan(
    @Arg('input') input: KunjunganInput
  ): Promise<Kunjungan> {
    return await Kunjungan.create({ ...input }).save()
  }

  @Mutation(() => Kunjungan)
  @UseMiddleware(isAdmin)
  async updateKunjungan(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: KunjunganInput
  ): Promise<Kunjungan | null> {
    const found = await Kunjungan.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Kunjungan.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteKunjungan(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Kunjungan.delete(id)
    return true
  }
}
