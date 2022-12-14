import { RefTindakan } from '../entities/RefTindakan'
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
class RefTindakanInput {
  @Field()
  nama: string

  @Field()
  harga: number

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
}

@Resolver()
export class RefTindakanResolver {
  @Query(() => [RefTindakan], { nullable: true })
  async getAllRefTindakans(): Promise<RefTindakan[] | undefined> {
    return (await RefTindakan.find()).sort((prev,next) => prev.id - next.id)
  }

  @Query(() => [RefTindakan], { nullable: true })
  @UseMiddleware(isAdmin)
  async getRefTindakans(
    @Arg('keywords') keywords: string
  ): Promise<RefTindakan[] | undefined> {
    const query = getConnection()
      .getRepository(RefTindakan)
      .createQueryBuilder('refTindakan')

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

  @Mutation(() => RefTindakan)
  @UseMiddleware(isAdmin)
  async createRefTindakan(@Arg('input') input: RefTindakanInput): Promise<RefTindakan> {
    return RefTindakan.create({ ...input }).save()
  }

  @Mutation(() => RefTindakan)
  @UseMiddleware(isAdmin)
  async updateRefTindakan(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: RefTindakanInput
  ): Promise<RefTindakan | null> {
    const ref = await RefTindakan.findOne(id)
    if (!ref) {
      return null
    }

    if (typeof input !== 'undefined') {
      RefTindakan.update({ id }, { ...input })
    }
    return ref
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteRefTindakan(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await RefTindakan.delete(id)
    return true
  }
}
