import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ObjectType, Field, ID, InputType } from 'type-graphql';
import { Context } from '../context';

@ObjectType()
export class Event {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  start!: Date;

  @Field(() => Date, { nullable: true })
  end?: Date | null;

  @Field(() => Boolean)
  allDay!: boolean;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  createdById!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@InputType()
export class CreateEventInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Date)
  start!: Date;

  @Field(() => Date, { nullable: true })
  end?: Date | null;

  @Field(() => Boolean, { defaultValue: false })
  allDay!: boolean;

  @Field(() => String, { defaultValue: '#3b82f6' })
  color!: string;
}

@InputType()
export class UpdateEventInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  start?: Date;

  @Field(() => Date, { nullable: true })
  end?: Date;

  @Field(() => Boolean, { nullable: true })
  allDay?: boolean;

  @Field(() => String, { nullable: true })
  color?: string;
}

@Resolver(Event)
export class EventResolver {
  @Query(() => [Event])
  @Authorized()
  async events(
    @Ctx() ctx: Context,
    @Arg('startDate', () => Date, { nullable: true }) startDate?: Date,
    @Arg('endDate', () => Date, { nullable: true }) endDate?: Date
  ): Promise<Event[]> {
    const where: any = {};
    
    if (startDate && endDate) {
      where.start = {
        gte: startDate,
        lte: endDate,
      };
    }

    return ctx.prisma.event.findMany({
      where,
      orderBy: { start: 'asc' }
    });
  }

  @Mutation(() => Event)
  @Authorized()
  async createEvent(
    @Arg('input', () => CreateEventInput) input: CreateEventInput,
    @Ctx() ctx: Context
  ): Promise<Event> {
    if (!ctx.user) {
      throw new Error('Uživatel není přihlášen');
    }

    return ctx.prisma.event.create({
      data: {
        ...input,
        createdById: ctx.user.id,
      }
    });
  }

  @Mutation(() => Event)
  @Authorized()
  async updateEvent(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UpdateEventInput) input: UpdateEventInput,
    @Ctx() ctx: Context
  ): Promise<Event> {
    return ctx.prisma.event.update({
      where: { id },
      data: input
    });
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteEvent(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await ctx.prisma.event.delete({
      where: { id }
    });
    return true;
  }
}
