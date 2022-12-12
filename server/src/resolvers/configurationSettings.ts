import { ConfigurationSettings } from '../entities/ConfigurationSettings'
import argon2 from 'argon2'
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
import { isAdmin } from '../middleware/isAdmin'
import { User } from '../entities/User'

@InputType()
class ConfigurationSettingInput {
  @Field()
  name: string

  @Field()
  value: string

  @Field()
  updatedBy: string
}

@Resolver(ConfigurationSettings)
export class ConfigurationSettingResolver {
  @Query(() => [ConfigurationSettings])
  @UseMiddleware(isAdmin)
  async configurationSettings(): Promise<ConfigurationSettings[]> {
    return (await ConfigurationSettings.find()).sort(
      (prev, next) => prev.id - next.id
    )
  }

  @Query(() => [ConfigurationSettings])
  async configurationSettingsByName(
    @Arg('keywords') keywords: string
  ): Promise<ConfigurationSettings[]> {
    const query = getConnection()
      .getRepository(ConfigurationSettings)
      .createQueryBuilder('setting')
      // .leftJoinAndSelect('setting.name', 'name')
      // .leftJoinAndSelect('setting.value', 'value')
      .orderBy('setting.id', 'ASC')

    const keywordList = keywords.split(' ')
    for (let i = 0; i < keywordList.length; i++) {
      const key = i
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase(),
      }
      query.orWhere(`LOWER(name) LIKE :${key}`, param)
    }

    return await query.getMany()
  }

  @Mutation(() => ConfigurationSettings)
  @UseMiddleware(isAdmin)
  async createConfigurationSetting(
    @Arg('input') input: ConfigurationSettingInput
  ): Promise<ConfigurationSettings> {
    return await ConfigurationSettings.create({ ...input }).save()
  }

  @Mutation(() => Boolean)
  async initiationSpecialRegister(): Promise<boolean> {

    const specialRegisterSetting = ConfigurationSettings.findOne({
      name: 'special-register',
    })
    const userAdmin = await User.findOne({ role: 'admin' })

    if (!specialRegisterSetting) {
      await ConfigurationSettings.create({
        name: 'special-register',
        value: 'inactive',
        updatedBy: 'initation',
      }).save()
    }

    if (!userAdmin) {
      const hashedPassword = await argon2.hash('admin')
      await User.create({
        username: 'admin',
        password: hashedPassword,
        email: 'admin@admin.admin',
        role: 'admin'
      }).save()
    }

    if (!specialRegisterSetting || !userAdmin) return true
    return false
  }

  @Mutation(() => ConfigurationSettings)
  @UseMiddleware(isAdmin)
  async updateConfigurationSetting(
    @Arg('id', () => Int) id: number,
      @Arg('input') input: ConfigurationSettingInput
  ): Promise<ConfigurationSettings | null> {
    const setting = await ConfigurationSettings.findOne(id)
    if (!setting) {
      return null
    }

    if (typeof input !== 'undefined') {
      ConfigurationSettings.update({ id }, { ...input })
    }
    return setting
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteConfigurationSetting(
    @Arg('id', () => Int) id: number
  ): Promise<boolean> {
    await ConfigurationSettings.delete(id)
    return true
  }
}
