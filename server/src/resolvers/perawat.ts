import { Perawat } from '../entities/Perawat'
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
class PerawatInput {
  @Field()
  nama: string

  @Field()
  nomorTelepon: string

  @Field(() => String)
  createdBy: string

  @Field(() => String)
  updatedBy: string
}

@Resolver()
export class PerawatResolver {
  @Query(() => [Perawat], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllPerawats(): Promise<Perawat[] | undefined> {
    const query = getConnection()
      .getRepository(Perawat)
      .createQueryBuilder('Perawat')

    return await query.getMany()
  }

  @Query(() => [Perawat], { nullable: true })
  @UseMiddleware(isAdmin)
  async getPerawats(
    @Arg('keywords') keywords: string
  ): Promise<Perawat[] | undefined> {
    const query = getConnection()
      .getRepository(Perawat)
      .createQueryBuilder('Perawat')

    const keywordList = keywords.split(' ')
    for (let i = 0; i < keywordList.length; i++) {
      const key = i
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase(),
      }
      query.orWhere(`LOWER(nama) LIKE :${key}`, param)
    }
    return await query.getMany()
  }

  @Query(() => Perawat, { nullable: true })
  @UseMiddleware(isAdmin)
  async getPerawat(
    @Arg('id', () => Int) id: number
  ): Promise<Perawat | undefined> {
    const found = await Perawat.findOne(id, {
      relations: ['kunjunganPoli'],
    })
    // if (found) {
    //   found.clickCount++
    //   found.save()
    // }
    return found
  }

  @Mutation(() => Perawat)
  @UseMiddleware(isAdmin)
  async createPerawat(@Arg('input') input: PerawatInput): Promise<Perawat> {
    return await Perawat.create({ ...input }).save()
  }

  @Mutation(() => Perawat)
  @UseMiddleware(isAdmin)
  async updatePerawat(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: PerawatInput
  ): Promise<Perawat | null> {
    const found = await Perawat.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Perawat.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Perawat)
  @UseMiddleware(isAdmin)
  async deletePerawat(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Perawat.delete(id)
    return true
  }
}
