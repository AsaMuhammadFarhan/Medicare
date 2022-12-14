import { User } from '../entities/User'
import { MyContext } from '../types'
import { Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql'
import argon2 from 'argon2'
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants'
import { UsernamePasswordInput } from './UsernamePasswordInput'
import { validateRegister } from '../utils/validateRegister'
import { forgotPasswordEmail } from '../utils/emails'
import { v4 as uuid } from 'uuid'
import { getConnection } from 'typeorm'
import { isAdmin } from '../middleware/isAdmin'

@ObjectType()
export class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver(User)
export class UserResolver {

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
      @Arg('newPassword') newPassword: string,
      @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return { errors: [{
        field: 'newPassword',
        message: 'password length must be greater than 2'
      }]
      }
    }

    const key = FORGOT_PASSWORD_PREFIX + token
    const userId = await redis.get(key)
    if (!userId) {
      return {
        errors: [
          {
            field: 'token',
            message: 'token expired'
          }
        ]
      }
    }

    const userIdNum = parseInt(userId)
    const user = await User.findOne(userIdNum)

    if (!user) {
      return {
        errors: [
          {
            field: 'token',
            message: 'user no longer exists'
          }
        ]
      }
    }

    await User.update({ id: userIdNum }, { password: await argon2.hash(newPassword) })

    redis.del(key)

    // log in user after change password
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
      @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return true
    }

    const token = uuid()

    redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3)

    forgotPasswordEmail(email, token)

    return true
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ): Promise<User | undefined| null> {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  @Query(() => User, { nullable: true })
  async meWithPasienData(
    @Ctx() { req }: MyContext
  ): Promise<User | undefined| null> {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId, {
      relations: ['pasien']
    })
  }

  @Query(() => User, { nullable: true })
  async meWithAllData(
    @Ctx() { req }: MyContext
  ): Promise<User | undefined| null> {
    if (!req.session.userId) {
      return null
    }
    const query = getConnection()
      .getRepository(User)
      .createQueryBuilder('User')
      .where('"User"."id" = :id', { id: req.session.userId })
      .leftJoinAndSelect('User.pasien', 'pasien')
      .leftJoinAndSelect('User.reservasi', 'reservasi')
      .leftJoinAndSelect('reservasi.poliBagian', 'poliBagianReservasi')
      .leftJoinAndSelect('reservasi.kunjungan', 'kunjungan')
      .leftJoinAndSelect('kunjungan.kunjunganPoli', 'kunjunganPoli')
      .leftJoinAndSelect('kunjunganPoli.penyakit', 'penyakit')
      .leftJoinAndSelect('kunjunganPoli.dokter', 'dokterKunjungan')
      .leftJoinAndSelect('kunjunganPoli.poliBagian', 'poliBagianKunjungan')
      .leftJoinAndSelect('reservasi.dokter', 'dokterReservasi')
      .leftJoinAndSelect('User.kunjungan', 'kunjunganUser')
      .leftJoinAndSelect('User.poliBagian', 'poliBagian')
      .orderBy('reservasi.id', 'DESC')

    return await query.getOne()
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
      @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options)
    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(options.password)

    let user
    try {
      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {
          username: options.username,
          password: hashedPassword,
          email: options.email,
        }
      ).returning('*').execute()
      user = result.raw[0]
    } catch(error) {
      console.log('error: ', error)
      if (error.code === '23505') {
        if (error.detail.includes('email')){
          return {
            errors: [
              {
                field: 'email',
                message: 'email already taken',
              },
            ],
          }
        }

        // duplicate username error
        return {
          errors: [{
            field: 'username',
            message: 'username already taken'
          }]
        }
      }
      console.log('message: ', error.message)
    }

    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAdmin)
  async specialRegister(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
      @Arg('role', () => String) role: 'admin' | 'admin-poli' | 'cashier',
      @Arg('poliBagianId', () => Int, { nullable:  true }) poliBagianId: number | null | undefined,
  ): Promise<UserResponse> {
    if (role !==  'admin' && role !==  'admin-poli' && role !==  'cashier'){
      return {
        errors: [
          {
            field: 'role',
            message: 'Role must be admin, admin-poli, or cashier'
          }
        ]
      }
    }

    const errors = validateRegister(options)


    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(options.password)

    let user
    try {
      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {
          username: options.username,
          password: hashedPassword,
          email: options.email,
          role,
          poliBagianId: poliBagianId ?? undefined,
        }
      ).returning('*').execute()
      user = result.raw[0]
    } catch(error) {
      console.log('error: ', error)
      if (error.code === '23505') {
        if (error.detail.includes('email')){
          return {
            errors: [
              {
                field: 'email',
                message: 'email already taken',
              },
            ],
          }
        }

        // duplicate username error
        return {
          errors: [{
            field: 'username',
            message: 'username already taken'
          }]
        }
      }
      console.log('message: ', error.message)
    }

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
      @Arg('password') password: string,
      @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(usernameOrEmail.includes('@') ? {
      where: { email: usernameOrEmail }
    } : {
      where: { username: usernameOrEmail }
    })
    if (!user) {
      return {
        errors: [{
          field: 'usernameOrEmail',
          message: 'that username doesn\'t exist'
        }]
      }
    }
    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [{
          field: 'password',
          message: 'incorrect password'
        }]
      }
    }

    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: MyContext
  ): Promise<boolean> {
    return new Promise((resolve) => req.session.destroy(err => {
      res.clearCookie(COOKIE_NAME)
      if (err) {
        console.log(err)
        resolve(false)
        return
      }
      resolve(true)
    }))
  }

  @Query(() => User, { nullable: true })
  async getUserbyId(
    @Arg('id', () => Int) id: number
  ): Promise<User | undefined> {
    return await User.findOne(id)
  }

  @Query(() => Boolean)
  async isThereAdmin(): Promise<boolean> {
    const user = await User.findOne({},{ where: { role: 'admin' } })
    if (user) return true
    return false
  }

  @Mutation(() => UserResponse)
  async createAdmin(
    @Arg('options', () => UsernamePasswordInput) options: UsernamePasswordInput,
  ): Promise<UserResponse> {

    const errors = validateRegister(options)
    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(options.password)
    let user
    try {
      const result = await getConnection().createQueryBuilder().insert().into(User).values(
        {
          username: options.username,
          password: hashedPassword,
          email: options.email,
          role: 'admin',
        }
      ).returning('*').execute()
      user = result.raw[0]
    } catch(error) {
      console.log('error: ', error)
      if (error.code === '23505') {
        if (error.detail.includes('email')){
          return {
            errors: [
              {
                field: 'email',
                message: 'email already taken',
              },
            ],
          }
        }

        // duplicate username error
        return {
          errors: [{
            field: 'username',
            message: 'username already taken'
          }]
        }
      }
      console.log('message: ', error.message)
    }

    return { user }
  }
}