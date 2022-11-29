import { RefObat } from '../entities/RefObat'
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
class RefObatInput {
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
export class RefObatResolver {
  @Query(() => [RefObat], { nullable: true })
  @UseMiddleware(isAdmin)
  async getRefObats(
    @Arg('keywords') keywords: string
  ): Promise<RefObat[] | undefined> {
    const query = getConnection()
      .getRepository(RefObat)
      .createQueryBuilder('refObat')

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

  @Mutation(() => RefObat)
  @UseMiddleware(isAdmin)
  async createRefObat(@Arg('input') input: RefObatInput): Promise<RefObat> {
    return RefObat.create({ ...input }).save()
  }

  @Mutation(() => RefObat)
  @UseMiddleware(isAdmin)
  async updateConfigurationSetting(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: RefObatInput
  ): Promise<RefObat | null> {
    const ref = await RefObat.findOne(id)
    if (!ref) {
      return null
    }

    if (typeof input !== 'undefined') {
      RefObat.update({ id }, { ...input })
    }
    return ref
  }

  @Mutation(() => RefObat)
  @UseMiddleware(isAdmin)
  async deleteConfigurationSetting(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await RefObat.delete(id)
    return true
  }
}
