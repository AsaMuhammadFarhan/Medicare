import { MyContext } from '../types'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { Pasien } from '../entities/Pasien'
import { User } from '../entities/User'
import { isAuth } from '../middleware/isAuth'
import { getConnection } from 'typeorm'

@InputType()
class PasienInput {
  @Field({ nullable: true })
  noRm: string

  @Field({ nullable: true })
  nama: string

  @Field({ nullable: true })
  nomorTelepon: string

  @Field({ nullable: true })
  nik: string

  @Field({ nullable: true })
  alamat: string

  @Field({ nullable: true })
  tempatLahir: string

  @Field({ nullable: true })
  tanggalLahir: Date

  @Field({ nullable: true })
  rt: string

  @Field({ nullable: true })
  rw: string

  @Field({ nullable: true })
  idKelurahan: string

  @Field({ nullable: true })
  idKecamatan: string

  @Field({ nullable: true })
  idKabupatenKota: string

  @Field({ nullable: true })
  idProvinsi: string

  @Field()
  userId: number
}

@Resolver()
export class UserPasienResolver {
  @Query(() => Pasien, { nullable: true })
  async getUserPasien(@Ctx() { req }: MyContext): Promise<Pasien | undefined> {
    const userId = req.session.userId

    return await Pasien.findOne({
      where: { userId: userId },
    })
  }

  @Query(() => [User])
  @UseMiddleware(isAuth)
  async getAllUserPasien(): Promise<User[]> {
    const query = getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'guest' })
      .leftJoinAndSelect(
        'user.pasien',
        'pasien'
      )
    return await query.getMany()
  }

  @Query(() => Number)
  async getCountUser(): Promise<number> {
    const user = await User.find()
    return user.length
  }

  @Mutation(() => Pasien)
  async createUserPasien(@Arg('input') input: PasienInput): Promise<Pasien> {
    return await Pasien.create({ ...input }).save()
  }

  @Mutation(() => Pasien)
  async updateUserPasien(
    @Arg('input') input: PasienInput,
      @Arg('id') id: number
  ): Promise<Pasien | null> {
    const data = await Pasien.findOne(id)
    if (!data) {
      return null
    }

    if (typeof input !== 'undefined') {
      Pasien.update({ id }, { ...input })
    }

    return data
  }
}
