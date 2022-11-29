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
  async getTemplates(): Promise<Template[] | undefined> {
    const query = getConnection()
      .getRepository(Template)
      .createQueryBuilder("template")
      // .leftJoinAndSelect('template.name', 'name')
      // .leftJoinAndSelect('template.value', 'value')

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

  @Query(() => [Template], { nullable: true })
  @UseMiddleware(isAdmin)
  async getTemplate(
    @Arg('id', () => Int) id: number,
  ): Promise<Template[] | undefined> {
    const found = await Template.findOne(id, {
      relations: ['templateRelation', 'templateRelation.user', 'anotherTemplateRelation']
    })
    if (found) {
      found.clickCount++
      found.save()
    }
    return found;
  }

  @Mutation(() => Template)
  @UseMiddleware(isAdmin)
  async createTemplate(@Arg("input") input: TemplateInput): Promise<Template> {
    return Template.create({ ...input }).save();
  }

  @Mutation(() => Template)
  @UseMiddleware(isAdmin)
  async updateTemplate(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: TemplateInput
  ): Promise<Template | null> {
    const found = await Template.findOne(id);
    if (!ref) {
      return null;
    }

    if (typeof input !== "undefined") {
      Template.update({ id }, { ...input });
    }
    return found;
  }

  @Mutation(() => Template)
  @UseMiddleware(isAdmin)
  async deleteTemplate(
    @Arg('id', () => Int) id: number,
  ): Promise<boolean> {
    await Template.delete(id)
    return true
  }