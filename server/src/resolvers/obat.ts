import { Obat } from '../entities/Obat'
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
class ObatInput {
  @Field()
  harga: number

  @Field()
  jumlah: number

  @Field(() => String)
  createdBy: string

  @Field(() => String)
  updatedBy: string

  @Field()
  kunjunganPoliId: number

  @Field()
  refObatId: number
}

@Resolver()
export class ObatResolver {
  @Query(() => [Obat], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllObats(): Promise<Obat[] | undefined> {
    const query = getConnection()
      .getRepository(Obat)
      .createQueryBuilder('Obat')
      .leftJoinAndSelect('Obat.refObat', 'refObat')
    // .leftJoinAndSelect('Obat.value', 'value')

    return await query.getMany()
  }

  // @Query(() => [Obat], { nullable: true })
  // @UseMiddleware(isAdmin)
  // async getObats(
  //   @Arg("keywords") keywords: string
  // ): Promise<Obat[] | undefined> {
  //   const query = getConnection()
  //     .getRepository(Obat)
  //     .createQueryBuilder("Obat")
  //     .leftJoinAndSelect('Obat.refObat', 'refObat')
  //     // .leftJoinAndSelect('Obat.value', 'value')

  //   const keywordList = keywords.split(" ");
  //   for (let i = 0; i < keywordList.length; i++) {
  //     const key = i;
  //     const param = {
  //       [key]: `%${keywordList[i]}%`.toLowerCase(),
  //     };
  //     query.orWhere(
  //       `LOWER(ObatAttribut) LIKE :${key}`,
  //       param
  //     );
  //   }
  //   return await query.getMany();
  // }

  @Query(() => Obat, { nullable: true })
  @UseMiddleware(isAdmin)
  async getObat(@Arg('id', () => Int) id: number): Promise<Obat | undefined> {
    const query = getConnection()
      .getRepository(Obat)
      .createQueryBuilder('Obat')
      .where('"Obat"."id" = :id', { id })
      .leftJoinAndSelect('Obat.refObat', 'refObat')
    // .leftJoinAndSelect('Obat.reservasi', 'reservasi')
    // .leftJoinAndSelect('Obat.penyakit', 'penyakit')
    // .leftJoinAndSelect('Obat.user', 'user')
    // .leftJoinAndSelect('user.pasien', 'pasien')

    return await query.getOne()
  }

  @Mutation(() => Obat)
  @UseMiddleware(isAdmin)
  async createObat(@Arg('input') input: ObatInput): Promise<Obat> {
    return await Obat.create({ ...input }).save()
  }

  @Mutation(() => Obat)
  @UseMiddleware(isAdmin)
  async updateObat(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: ObatInput
  ): Promise<Obat | null> {
    const found = await Obat.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Obat.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Obat)
  @UseMiddleware(isAdmin)
  async deleteObat(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Obat.delete(id)
    return true
  }
}
