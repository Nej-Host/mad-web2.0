import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ObjectType, Field, ID, InputType } from 'type-graphql';
import { Context } from '../context';

@ObjectType()
export class SiteSettings {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  heroTitle!: string;

  @Field(() => String)
  heroSubtitle!: string;

  @Field(() => String)
  primaryColor!: string;

  @Field(() => String, { nullable: true })
  logoUrl?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
export class SocialLink {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  platform!: string;

  @Field(() => String)
  url!: string;

  @Field(() => Number)
  order!: number;
}

@InputType()
export class UpdateSiteSettingsInput {
  @Field(() => String, { nullable: true })
  heroTitle?: string;

  @Field(() => String, { nullable: true })
  heroSubtitle?: string;

  @Field(() => String, { nullable: true })
  primaryColor?: string;

  @Field(() => String, { nullable: true })
  logoUrl?: string;
}

@InputType()
export class CreateSocialLinkInput {
  @Field(() => String)
  platform!: string;

  @Field(() => String)
  url!: string;

  @Field(() => Number)
  order!: number;
}

@Resolver(SiteSettings)
export class SiteSettingsResolver {
  @Query(() => SiteSettings)
  async siteSettings(@Ctx() ctx: Context): Promise<SiteSettings> {
    // Pokusíme se najít existující nastavení
    let settings = await ctx.prisma.siteSettings.findUnique({
      where: { id: 'site_settings' }
    });

    // Pokud neexistují, vytvoříme výchozí
    if (!settings) {
      settings = await ctx.prisma.siteSettings.create({
        data: {
          id: 'site_settings',
          heroTitle: 'Vítejte v Madzone',
          heroSubtitle: 'Moderní platforma pro události a komunitu',
          primaryColor: '#3b82f6',
        }
      });
    }

    return settings;
  }

  @Query(() => [SocialLink])
  async socialLinks(@Ctx() ctx: Context): Promise<SocialLink[]> {
    return ctx.prisma.socialLink.findMany({
      orderBy: { order: 'asc' }
    });
  }

  @Mutation(() => SiteSettings)
  @Authorized(['ADMIN'])
  async updateSiteSettings(
    @Arg('input', () => UpdateSiteSettingsInput) input: UpdateSiteSettingsInput,
    @Ctx() ctx: Context
  ): Promise<SiteSettings> {
    return ctx.prisma.siteSettings.upsert({
      where: { id: 'site_settings' },
      update: input,
      create: {
        id: 'site_settings',
        heroTitle: input.heroTitle || 'Vítejte v Madzone',
        heroSubtitle: input.heroSubtitle || 'Moderní platforma pro události a komunitu',
        primaryColor: input.primaryColor || '#3b82f6',
        logoUrl: input.logoUrl,
      }
    });
  }

  @Mutation(() => SocialLink)
  @Authorized(['ADMIN'])
  async createSocialLink(
    @Arg('input', () => CreateSocialLinkInput) input: CreateSocialLinkInput,
    @Ctx() ctx: Context
  ): Promise<SocialLink> {
    return ctx.prisma.socialLink.create({
      data: input
    });
  }

  @Mutation(() => Boolean)
  @Authorized(['ADMIN'])
  async deleteSocialLink(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await ctx.prisma.socialLink.delete({
      where: { id }
    });
    return true;
  }
}
