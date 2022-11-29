import { KunjunganPoli } from '../entities/KunjunganPoli'
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
class KunjunganPoliInput {
  @Field()
  biayaPoli: string

  @Field()
  hasilBagiDokter: string

  @Field()
  hasilBagiPerawat: string

  @Field()
  createdBy: string

  @Field()
  updatedBy: string

  @Field()
  poliBagianId: number

  @Field()
  dokterId: number

  @Field()
  perawatId: number

  @Field()
  penyakitId: number
}

@Resolver()
export class KunjunganPoliResolver {
  @Query(() => [KunjunganPoli], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllKunjunganPolis(): Promise<KunjunganPoli[] | undefined> {
    const query = getConnection()
      .getRepository(KunjunganPoli)
      .createQueryBuilder('KunjunganPoli')
      .leftJoinAndSelect('KunjunganPoli.kunjungan', 'kunjungan')
      .leftJoinAndSelect('KunjunganPoli.obat', 'obat')
      .leftJoinAndSelect('KunjunganPoli.tindakan', 'tindakan')
      .leftJoinAndSelect('KunjunganPoli.penyakit', 'penyakit')
      .leftJoinAndSelect('KunjunganPoli.perawat', 'perawat')
      .leftJoinAndSelect('KunjunganPoli.dokter', 'dokter')
      .leftJoinAndSelect('KunjunganPoli.poliBagian', 'poliBagian')
    // .leftJoinAndSelect('KunjunganPoli.value', 'value')
    // .leftJoinAndSelect('KunjunganPoli.value', 'value')

    return await query.getMany()
  }

  // @Query(() => [KunjunganPoli], { nullable: true })
  // @UseMiddleware(isAdmin)
  // async getKunjunganPolis(
  //   @Arg("keywords") keywords: string
  // ): Promise<KunjunganPoli[] | undefined> {
  //   const query = getConnection()
  //     .getRepository(KunjunganPoli)
  //     .createQueryBuilder("KunjunganPoli")
  //     .leftJoinAndSelect('KunjunganPoli.kunjungan', 'kunjungan')
  //     .leftJoinAndSelect('KunjunganPoli.obat', 'obat')
  //     .leftJoinAndSelect('KunjunganPoli.tindakan', 'tindakan')
  //     .leftJoinAndSelect('KunjunganPoli.penyakit', 'penyakit')
  //     .leftJoinAndSelect('KunjunganPoli.perawat', 'perawat')
  //     .leftJoinAndSelect('KunjunganPoli.dokter', 'dokter')
  //     .leftJoinAndSelect('KunjunganPoli.poliBagian', 'poliBagian')
  //     // .leftJoinAndSelect('KunjunganPoli.name', 'name')
  //     // .leftJoinAndSelect('KunjunganPoli.value', 'value')

  //   const keywordList = keywords.split(" ");
  //   for (let i = 0; i < keywordList.length; i++) {
  //     const key = i;
  //     const param = {
  //       [key]: `%${keywordList[i]}%`.toLowerCase(),
  //     };
  //     query.orWhere(
  //       `LOWER(KunjunganPoliAttribut) LIKE :${key}`,
  //       param
  //     );
  //   }
  //   return await query.getMany();
  // }

  @Query(() => KunjunganPoli, { nullable: true })
  @UseMiddleware(isAdmin)
  async getKunjunganPoli(
    @Arg('id', () => Int) id: number
  ): Promise<KunjunganPoli | undefined> {
    const query = getConnection()
      .getRepository(KunjunganPoli)
      .createQueryBuilder('KunjunganPoli')
      .where('"KunjunganPoli"."id" = :id', { id })
      .leftJoinAndSelect('KunjunganPoli.kunjungan', 'kunjungan')
      .leftJoinAndSelect('KunjunganPoli.obat', 'obat')
      .leftJoinAndSelect('KunjunganPoli.tindakan', 'tindakan')
      .leftJoinAndSelect('KunjunganPoli.penyakit', 'penyakit')
      .leftJoinAndSelect('KunjunganPoli.perawat', 'perawat')
      .leftJoinAndSelect('KunjunganPoli.dokter', 'dokter')
      .leftJoinAndSelect('KunjunganPoli.poliBagian', 'poliBagian')
    // .leftJoinAndSelect('KunjunganPoli.user', 'user')

    return await query.getOne()
  }

  @Mutation(() => KunjunganPoli)
  @UseMiddleware(isAdmin)
  async createKunjunganPoli(
    @Arg('input') input: KunjunganPoliInput
  ): Promise<KunjunganPoli> {
    return await KunjunganPoli.create({ ...input }).save()
  }

  @Mutation(() => KunjunganPoli)
  @UseMiddleware(isAdmin)
  async updateKunjunganPoli(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: KunjunganPoliInput
  ): Promise<KunjunganPoli | null> {
    const found = await KunjunganPoli.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      KunjunganPoli.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => KunjunganPoli)
  @UseMiddleware(isAdmin)
  async deleteKunjunganPoli(
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    await KunjunganPoli.delete(id)
    return true
  }
}
