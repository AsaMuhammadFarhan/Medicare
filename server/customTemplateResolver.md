import { Template } from "../entities/Template"
import { isAdmin } from "../middleware/isAdmin"
import { Arg, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { getConnection } from "typeorm"

@InputType()
class TemplateInput {
  @Field({ nullable: true })
  templateFieldNullable string

  @Field()
  templateField: number
}

@Resolver()
export class TemplateResolver {
  @Query(() => [Template], { nullable: true })
  @UseMiddleware(isAdmin)
  async getAllTemplates(): Promise<Template[] | undefined> {
    const query = getConnection()
      .getRepository(Template)
      .createQueryBuilder("template")
      // .leftJoinAndSelect('template.name', 'name')
      // .leftJoinAndSelect('template.value', 'value')
      .orderBy('template.id','ASC')

    return await query.getMany();
  }

  @Query(() => [Template], { nullable: true })
  @UseMiddleware(isAdmin)
  async getTemplates(
    @Arg("keywords") keywords: string
  ): Promise<Template[] | undefined> {
    const query = getConnection()
      .getRepository(Template)
      .createQueryBuilder("template")
      // .leftJoinAndSelect('template.name', 'name')
      // .leftJoinAndSelect('template.value', 'value')

    const keywordList = keywords.split(" ");
    for (let i = 0; i < keywordList.length; i++) {
      const key = i;
      const param = {
        [key]: `%${keywordList[i]}%`.toLowerCase(),
      };
      query.orWhere(
        `LOWER(templateAttribut) LIKE :${key} OR LOWER(anotherTemplateAttribut) LIKE :${key}`,
        param
      );
    }
    return await query.getMany();
  }

  @Query(() => Template, { nullable: true })
  @UseMiddleware(isAdmin)
  async getTemplate(
    @Arg('id', () => Int) id: number,
  ): Promise<Template | undefined> {
    const query = getConnection()
    .getRepository(Template)
    .createQueryBuilder("Template")
    .where('"Template"."id" = :id', { id })
    // .leftJoinAndSelect('Template.reservasi', 'reservasi')
    // .leftJoinAndSelect('Template.penyakit', 'penyakit')
    // .leftJoinAndSelect('Template.user', 'user')
    // .leftJoinAndSelect('user.pasien', 'pasien')

    return await query.getOne();
  }

  @Mutation(() => Template)
  @UseMiddleware(isAdmin)
  async createTemplate(@Arg("input") input: TemplateInput): Promise<Template> {
    return await Template.create({ ...input }).save();
  }

  @Mutation(() => Template)
  @UseMiddleware(isAdmin)
  async updateTemplate(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: TemplateInput
  ): Promise<Template | null> {
    const found = await Template.findOne(id);
    if (!found) {
      return null;
    }

    if (typeof input !== "undefined") {
      Template.update({ id }, { ...input });
    }
    return found;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deleteTemplate(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await Template.delete(id)
    return true
  }
}