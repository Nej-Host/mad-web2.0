import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ObjectType, Field, ID, InputType, Float } from 'type-graphql';
import { Context } from '../context';

@ObjectType()
export class Expense {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Float)
  amount!: number;

  @Field(() => String)
  currency!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  createdById!: string;

  @Field(() => String, { nullable: true })
  receipt?: string | null;

  @Field(() => String)
  status!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}

@ObjectType()
export class ExpenseCategory {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  icon!: string;
}

@InputType()
export class CreateExpenseInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => String, { defaultValue: 'CZK' })
  currency!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String, { nullable: true })
  receipt?: string;
}

@Resolver(Expense)
export class ExpenseResolver {
  @Query(() => [Expense])
  @Authorized()
  async expenses(@Ctx() ctx: Context): Promise<Expense[]> {
    const expenses = await ctx.prisma.expense.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return expenses.map(expense => ({
      ...expense,
      amount: Number(expense.amount)
    }));
  }

  @Query(() => [ExpenseCategory])
  @Authorized()
  async expenseCategories(@Ctx() ctx: Context): Promise<ExpenseCategory[]> {
    return ctx.prisma.expenseCategory.findMany({
      orderBy: { name: 'asc' }
    });
  }

  @Mutation(() => Expense)
  @Authorized()
  async createExpense(
    @Arg('input', () => CreateExpenseInput) input: CreateExpenseInput,
    @Ctx() ctx: Context
  ): Promise<Expense> {
    if (!ctx.user) {
      throw new Error('Uživatel není přihlášen');
    }

    const expense = await ctx.prisma.expense.create({
      data: {
        ...input,
        createdById: ctx.user.id,
      }
    });
    
    return {
      ...expense,
      amount: Number(expense.amount)
    };
  }

  @Mutation(() => Boolean)
  @Authorized(['ADMIN'])
  async approveExpense(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await ctx.prisma.expense.update({
      where: { id },
      data: { status: 'APPROVED' }
    });
    return true;
  }

  @Mutation(() => Boolean)
  @Authorized(['ADMIN'])
  async rejectExpense(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await ctx.prisma.expense.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
    return true;
  }
}
