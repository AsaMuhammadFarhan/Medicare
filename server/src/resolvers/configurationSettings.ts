import { ConfigurationSettings } from '../entities/ConfigurationSettings'
import { Arg, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { getConnection } from 'typeorm'
import { isAdmin } from '../middleware/isAdmin'

@InputType()
class ConfigurationSettingInput {
  @Field()
  name: string

  @Field()
  value: string

  @Field()
  updateBy: string
}

@Resolver(ConfigurationSettings)
export class ConfigurationSettingResolver {

  @Query(() => [ConfigurationSettings])
  @UseMiddleware(isAdmin)
  async configurationSettings(): Promise<ConfigurationSettings[]> {
    return await ConfigurationSettings.find()
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

    const keywordList = keywords.split(' ')
    for (let i = 0; i < keywordList.length; i++) {
      const key = i
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase()
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
    return ConfigurationSettings.create({ ...input }).save()
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


  @Mutation(() => ConfigurationSettings)
  @UseMiddleware(isAdmin)
  async deleteConfigurationSetting(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await ConfigurationSettings.delete(id)
    return true
  }
}