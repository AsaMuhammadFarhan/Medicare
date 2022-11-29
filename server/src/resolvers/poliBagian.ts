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
import { PoliBagian } from '../entities/PoliBagian'

@InputType()
class PoliBagianInput {
  @Field()
  nama: string

  @Field()
  hargaPendaftaran: number

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
}

@Resolver()
export class PoliBagianResolver {
  @Query(() => [PoliBagian], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllPoliBagians(): Promise<PoliBagian[] | undefined> {
    return await PoliBagian.find()
  }

  @Query(() => [PoliBagian], { nullable: true })
  @UseMiddleware(isAdmin)
  async getPoliBagians(
    @Arg('keywords') keywords: string
  ): Promise<PoliBagian[] | undefined> {
    const query = getConnection()
      .getRepository(PoliBagian)
      .createQueryBuilder('PoliBagian')

    const keywordList = keywords.split(' ')
    for (let i = 0; i < keywordList.length; i++) {
      const key = i
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase(),
      }
      query.where(
        `LOWER(nama) LIKE :${key}`,
        param
      )
    }
    return await query.getMany()
  }

  @Mutation(() => PoliBagian)
  @UseMiddleware(isAdmin)
  async createPoliBagian(@Arg('input') input: PoliBagianInput): Promise<PoliBagian> {
    return PoliBagian.create({ ...input }).save()
  }

  @Mutation(() => PoliBagian)
  @UseMiddleware(isAdmin)
  async updatePoliBagian(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: PoliBagianInput
  ): Promise<PoliBagian | null> {
    const ref = await PoliBagian.findOne(id)
    if (!ref) {
      return null
    }

    if (typeof input !== 'undefined') {
      PoliBagian.update({ id }, { ...input })
    }
    return ref
  }

  @Mutation(() => PoliBagian)
  @UseMiddleware(isAdmin)
  async deletePoliBagian(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await PoliBagian.delete(id)
    return true
  }
}
