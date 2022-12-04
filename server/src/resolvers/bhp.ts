import { Bhp } from '../entities/Bhp'
import { isAdmin } from '../middleware/isAdmin'
import { Arg, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'

@InputType()
class BhpInput {
  @Field()
  harga: number

  @Field()
  jumlah: number

  @Field()
  createdBy: string

  @Field()
  updatedBy: string

  @Field()
  refBhpId: number

  @Field()
  kunjunganPoliId: number
}

@Resolver()
export class BhpResolver {
  @Query(() => [Bhp], { nullable: true })
  async getAllBhps(): Promise<Bhp[] | undefined> {
    const query = getConnection()
      .getRepository(Bhp)
      .createQueryBuilder('Bhp')
      .leftJoinAndSelect('Bhp.refBhp', 'refBhp')

    return await query.getMany()
  }

  // @Query(() => [Bhp], { nullable: true })
  // @UseMiddleware(isAdmin)
  // async getBhps(
  //   @Arg("keywords") keywords: string
  // ): Promise<Bhp[] | undefined> {
  //   const query = getConnection()
  //     .getRepository(Bhp)
  //     .createQueryBuilder("Bhp")
  //     .leftJoinAndSelect('Bhp.refBhp', 'refBhp')

  //   const keywordList = keywords.split(" ");
  //   for (let i = 0; i < keywordList.length; i++) {
  //     const key = i;
  //     const param = {
  //       [key]: `%${keywordList[i]}%`.toLowerCase(),
  //     };
  //     query.orWhere(
  //       `LOWER(refBhp.nama) LIKE :${key}`,
  //       param
  //     );
  //   }
  //   return await query.getMany();
  // }

  @Query(() => Bhp, { nullable: true })
  @UseMiddleware(isAdmin)
  async getBhp(
    @Arg('id', () => Int) id: number,
  ): Promise<Bhp | undefined> {
    const found = await Bhp.findOne(id, {
      relations: ['refBhp']
    })
    return found
  }

  @Mutation(() => Bhp)
  async createBhp(@Arg('input') input: BhpInput): Promise<Bhp> {
    return await Bhp.create({ ...input }).save()
  }

  @Mutation(() => Bhp)
  @UseMiddleware(isAdmin)
  async updateBhp(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: BhpInput
  ): Promise<Bhp | null> {
    const found = await Bhp.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Bhp.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Boolean)
  async deleteBhp(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await Bhp.delete(id)
    return true
  }
}