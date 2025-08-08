import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ObjectType, Field, ID } from 'type-graphql';
import { Context } from '../context';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  firstName?: string | null;

  @Field(() => String, { nullable: true })
  lastName?: string | null;

  @Field(() => String, { nullable: true })
  imageUrl?: string | null;

  @Field(() => String)
  role!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @Authorized()
  async me(@Ctx() ctx: Context): Promise<User | null> {
    if (!ctx.user) return null;

    const user = await ctx.prisma.user.findUnique({
      where: { id: ctx.user.id }
    });

    return user;
  }

  @Query(() => [User])
  @Authorized(['ADMIN'])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    return ctx.prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  @Mutation(() => User)
  @Authorized()
  async updateProfile(
    @Arg('firstName', () => String, { nullable: true }) firstName: string,
    @Arg('lastName', () => String, { nullable: true }) lastName: string,
    @Ctx() ctx: Context
  ): Promise<User> {
    if (!ctx.user) {
      throw new Error('Uživatel není přihlášen');
    }

    return ctx.prisma.user.update({
      where: { id: ctx.user.id },
      data: {
        firstName,
        lastName,
      }
    });
  }
}
