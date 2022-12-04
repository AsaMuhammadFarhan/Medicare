import { Tindakan } from '../entities/Tindakan'
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
class TindakanInput {
  @Field()
  harga: number

  @Field()
  jumlah: number

  @Field()
  bagiHasilDokter: number

  @Field()
  bagiHasilPerawat: number

  @Field(() => String)
  createdBy: string

  @Field(() => String)
  updatedBy: string

  @Field()
  refTindakanId: number

  @Field()
  kunjunganPoliId: number
}

@Resolver()
export class TindakanResolver {
  @Query(() => [Tindakan], { nullable: true })
  async getAllTindakans(): Promise<Tindakan[] | undefined> {
    const query = getConnection()
      .getRepository(Tindakan)
      .createQueryBuilder('Tindakan')
      .leftJoinAndSelect('Tindakan.refTindakan', 'refTindakan')
    // .leftJoinAndSelect('Tindakan.value', 'value')

    return await query.getMany()
  }

  // @Query(() => [Tindakan], { nullable: true })
  // @UseMiddleware(isAdmin)
  // async getTindakans(
  //   @Arg("keywords") keywords: string
  // ): Promise<Tindakan[] | undefined> {
  //   const query = getConnection()
  //     .getRepository(Tindakan)
  //     .createQueryBuilder("Tindakan")
  //     .leftJoinAndSelect('Tindakan.refTindakan', 'refTindakan')
  //     // .leftJoinAndSelect('Tindakan.value', 'value')

  //   const keywordList = keywords.split(" ");
  //   for (let i = 0; i < keywordList.length; i++) {
  //     const key = i;
  //     const param = {
  //       [key]: `%${keywordList[i]}%`.toLowerCase(),
  //     };
  //     query.orWhere(
  //       `LOWER(TindakanAttribut) LIKE :${key} OR LOWER(anotherTindakanAttribut) LIKE :${key}`,
  //       param
  //     );
  //   }
  //   return await query.getMany();
  // }

  @Query(() => Tindakan, { nullable: true })
  @UseMiddleware(isAdmin)
  async getTindakan(
    @Arg('id', () => Int) id: number
  ): Promise<Tindakan | undefined> {
    const query = getConnection()
      .getRepository(Tindakan)
      .createQueryBuilder('Tindakan')
      .where('"Tindakan"."id" = :id', { id })
      .leftJoinAndSelect('Tindakan.refTindakan', 'refTindakan')
    // .leftJoinAndSelect('Tindakan.reservasi', 'reservasi')
    // .leftJoinAndSelect('Tindakan.penyakit', 'penyakit')
    // .leftJoinAndSelect('Tindakan.user', 'user')
    // .leftJoinAndSelect('user.pasien', 'pasien')

    return await query.getOne()
  }

  @Mutation(() => Tindakan)
  async createTindakan(@Arg('input') input: TindakanInput): Promise<Tindakan> {
    return await Tindakan.create({ ...input }).save()
  }

  @Mutation(() => Tindakan)
  @UseMiddleware(isAdmin)
  async updateTindakan(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: TindakanInput
  ): Promise<Tindakan | null> {
    const found = await Tindakan.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Tindakan.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Boolean)
  async deleteTindakan(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Tindakan.delete(id)
    return true
  }
}
