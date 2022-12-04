import { Dokter } from '../entities/Dokter'
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
class DokterInput {
  @Field()
  nama: string

  @Field()
  nomorTelepon: string

  @Field(() => String)
  createdBy: string

  @Field(() => String)
  updatedBy: string

  @Field()
  poliBagianId: number
}

@Resolver()
export class DokterResolver {
  @Query(() => [Dokter], { nullable: true })
  async getAllDokters(): Promise<Dokter[] | undefined> {
    const query = getConnection()
      .getRepository(Dokter)
      .createQueryBuilder('Dokter')
      .leftJoinAndSelect('Dokter.poliBagian', 'poliBagian')

    return await query.getMany()
  }

  @Query(() => [Dokter], { nullable: true })
  @UseMiddleware(isAdmin)
  async getDokters(
    @Arg('keywords') keywords: string
  ): Promise<Dokter[] | undefined> {
    const query = getConnection()
      .getRepository(Dokter)
      .createQueryBuilder('Dokter')
      .leftJoinAndSelect('Dokter.poliBagian', 'poliBagian')

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

  @Query(() => Dokter, { nullable: true })
  @UseMiddleware(isAdmin)
  async getDokter(
    @Arg('id', () => Int) id: number
  ): Promise<Dokter | undefined> {
    const found = await Dokter.findOne(id, {
      relations: ['poliBagian'],
    })
    // if (found) {
    //   found.clickCount++
    //   found.save()
    // }
    return found
  }

  @Mutation(() => Dokter)
  @UseMiddleware(isAdmin)
  async createDokter(@Arg('input') input: DokterInput): Promise<Dokter> {
    return await Dokter.create({ ...input }).save()
  }

  @Mutation(() => Dokter)
  @UseMiddleware(isAdmin)
  async updateDokter(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: DokterInput
  ): Promise<Dokter | null> {
    const found = await Dokter.findOne(id)
    if (!found) {
      return null
    }

    if (typeof input !== 'undefined') {
      Dokter.update({ id }, { ...input })
    }
    return found
  }

  @Mutation(() => Dokter)
  @UseMiddleware(isAdmin)
  async deleteDokter(@Arg('id', () => Int) id: number): Promise<boolean> {
    await Dokter.delete(id)
    return true
  }
}
