import { RefBhp } from '../entities/RefBhp'
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
class RefBhpInput {
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
export class RefBhpResolver {
  @Query(() => [RefBhp], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllRefBhps(): Promise<RefBhp[] | undefined> {
    return await RefBhp.find()
  }

  @Query(() => [RefBhp], { nullable: true })
  @UseMiddleware(isAdmin)
  async getRefBhps(
    @Arg('keywords') keywords: string
  ): Promise<RefBhp[] | undefined> {
    const query = getConnection()
      .getRepository(RefBhp)
      .createQueryBuilder('refBhp')

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

  @Mutation(() => RefBhp)
  @UseMiddleware(isAdmin)
  async createRefBhp(@Arg('input') input: RefBhpInput): Promise<RefBhp> {
    return RefBhp.create({ ...input }).save()
  }

  @Mutation(() => RefBhp)
  @UseMiddleware(isAdmin)
  async updateRefBhp(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: RefBhpInput
  ): Promise<RefBhp | null> {
    const ref = await RefBhp.findOne(id)
    if (!ref) {
      return null
    }

    if (typeof input !== 'undefined') {
      RefBhp.update({ id }, { ...input })
    }
    return ref
  }

  @Mutation(() => RefBhp)
  @UseMiddleware(isAdmin)
  async deleteRefBhp(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await RefBhp.delete(id)
    return true
  }
}
