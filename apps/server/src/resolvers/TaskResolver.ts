import { Resolver, Query, Mutation, Arg, Ctx, Authorized, ObjectType, Field, ID, Int, InputType } from 'type-graphql';
import { Context } from '../context';
import { User } from './UserResolver';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String)
  status!: string;

  @Field(() => String)
  priority!: string;

  @Field(() => Int)
  position!: number;

  @Field(() => String)
  columnId!: string;

  @Field(() => String)
  createdById!: string;

  @Field(() => String, { nullable: true })
  assigneeId?: string | null;

  @Field(() => String, { nullable: true })
  projectId?: string | null;

  @Field(() => Date, { nullable: true })
  dueDate?: Date | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => User)
  createdBy!: User;

  @Field(() => User, { nullable: true })
  assignee?: User | null;

  @Field(() => Column)
  column!: Column;
}

@ObjectType()
export class Column {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => Int)
  position!: number;

  @Field(() => String)
  color!: string;

  @Field(() => [Task])
  tasks!: Task[];
}

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  columnId!: string;

  @Field(() => String, { nullable: true })
  assigneeId?: string;

  @Field(() => String, { nullable: true })
  projectId?: string;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;

  @Field(() => String, { defaultValue: 'MEDIUM' })
  priority!: string;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  status?: string;

  @Field(() => String, { nullable: true })
  priority?: string;

  @Field(() => String, { nullable: true })
  assigneeId?: string;

  @Field(() => Date, { nullable: true })
  dueDate?: Date;
}

@Resolver(Task)
export class TaskResolver {
  @Query(() => [Column])
  @Authorized()
  async kanbanBoard(@Ctx() ctx: Context): Promise<Column[]> {
    return ctx.prisma.column.findMany({
      include: {
        tasks: {
          include: {
            createdBy: true,
            assignee: true,
          },
          orderBy: { position: 'asc' }
        }
      },
      orderBy: { position: 'asc' }
    });
  }

  @Query(() => [Task])
  @Authorized()
  async tasks(@Ctx() ctx: Context): Promise<Task[]> {
    return ctx.prisma.task.findMany({
      include: {
        createdBy: true,
        assignee: true,
        column: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  @Mutation(() => Task)
  @Authorized()
  async createTask(
    @Arg('input', () => CreateTaskInput) input: CreateTaskInput,
    @Ctx() ctx: Context
  ): Promise<Task> {
    if (!ctx.user) {
      throw new Error('Uživatel není přihlášen');
    }

    // Najít nejvyšší pozici v sloupci
    const lastTask = await ctx.prisma.task.findFirst({
      where: { columnId: input.columnId },
      orderBy: { position: 'desc' }
    });

    const position = lastTask ? lastTask.position + 1 : 0;

    return ctx.prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        columnId: input.columnId,
        assigneeId: input.assigneeId,
        projectId: input.projectId,
        dueDate: input.dueDate,
        priority: input.priority as any, // Cast to Prisma enum
        position,
        createdById: ctx.user.id,
      },
      include: {
        createdBy: true,
        assignee: true,
        column: true,
      }
    });
  }

  @Mutation(() => Task)
  @Authorized()
  async updateTask(
    @Arg('id', () => String) id: string,
    @Arg('input', () => UpdateTaskInput) input: UpdateTaskInput,
    @Ctx() ctx: Context
  ): Promise<Task> {
    return ctx.prisma.task.update({
      where: { id },
      data: {
        title: input.title,
        description: input.description,
        status: input.status as any,
        priority: input.priority as any,
        assigneeId: input.assigneeId,
        dueDate: input.dueDate,
      },
      include: {
        createdBy: true,
        assignee: true,
        column: true,
      }
    });
  }

  @Mutation(() => Task)
  @Authorized()
  async moveTask(
    @Arg('taskId', () => String) taskId: string,
    @Arg('destinationColumnId', () => String) destinationColumnId: string,
    @Arg('newIndex', () => Int) newIndex: number,
    @Ctx() ctx: Context
  ): Promise<Task> {
    // Tato mutace implementuje komplexní logiku pro přesun úkolu
    // mezi sloupci s přepočítáním pozic
    
    const task = await ctx.prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      throw new Error('Úkol nebyl nalezen');
    }

    // Aktualizovat pozice v původním sloupci
    if (task.columnId !== destinationColumnId) {
      await ctx.prisma.task.updateMany({
        where: {
          columnId: task.columnId,
          position: { gt: task.position }
        },
        data: {
          position: { decrement: 1 }
        }
      });
    }

    // Aktualizovat pozice v cílovém sloupci
    await ctx.prisma.task.updateMany({
      where: {
        columnId: destinationColumnId,
        position: { gte: newIndex }
      },
      data: {
        position: { increment: 1 }
      }
    });

    // Přesunout úkol
    return ctx.prisma.task.update({
      where: { id: taskId },
      data: {
        columnId: destinationColumnId,
        position: newIndex,
      },
      include: {
        createdBy: true,
        assignee: true,
        column: true,
      }
    });
  }

  @Mutation(() => Boolean)
  @Authorized()
  async deleteTask(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await ctx.prisma.task.delete({
      where: { id }
    });
    return true;
  }
}
