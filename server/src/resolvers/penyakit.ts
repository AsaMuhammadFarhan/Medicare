import { Penyakit } from '../entities/Penyakit'
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
class PenyakitInput {
  @Field()
  nama: string

  @Field()
  kode: string

  @Field()
  createdBy: string

  @Field()
  updatedBy: string
}

@Resolver()
export class PenyakitResolver {
  @Query(() => [Penyakit], { nullable: true })
  async getAllPenyakits(): Promise<Penyakit[] | undefined> {
    return await Penyakit.find()
  }

  @Query(() => [Penyakit], { nullable: true })
  @UseMiddleware(isAdmin)
  async getPenyakits(
    @Arg('keywords') keywords: string
  ): Promise<Penyakit[] | undefined> {
    const query = getConnection()
      .getRepository(Penyakit)
      .createQueryBuilder('Penyakit')

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

  @Mutation(() => Penyakit)
  @UseMiddleware(isAdmin)
  async createPenyakit(@Arg('input') input: PenyakitInput): Promise<Penyakit> {
    return Penyakit.create({ ...input }).save()
  }

  @Mutation(() => Penyakit)
  @UseMiddleware(isAdmin)
  async updatePenyakit(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: PenyakitInput
  ): Promise<Penyakit | null> {
    const ref = await Penyakit.findOne(id)
    if (!ref) {
      return null
    }

    if (typeof input !== 'undefined') {
      Penyakit.update({ id }, { ...input })
    }
    return ref
  }

  @Mutation(() => Penyakit)
  @UseMiddleware(isAdmin)
  async deletePenyakit(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await Penyakit.delete(id)
    return true
  }
}
