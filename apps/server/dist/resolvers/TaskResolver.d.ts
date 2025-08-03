import { Context } from '../context';
import { User } from './UserResolver';
export declare class Task {
    id: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    position: number;
    columnId: string;
    createdById: string;
    assigneeId?: string | null;
    projectId?: string | null;
    dueDate?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    createdBy: User;
    assignee?: User;
    column: Column;
}
export declare class Column {
    id: string;
    title: string;
    position: number;
    color: string;
    tasks: Task[];
}
export declare class CreateTaskInput {
    title: string;
    description?: string;
    columnId: string;
    assigneeId?: string;
    projectId?: string;
    dueDate?: Date;
    priority: string;
}
export declare class UpdateTaskInput {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    assigneeId?: string;
    dueDate?: Date;
}
export declare class TaskResolver {
    kanbanBoard(ctx: Context): Promise<Column[]>;
    tasks(ctx: Context): Promise<Task[]>;
    createTask(input: CreateTaskInput, ctx: Context): Promise<Task>;
    updateTask(id: string, input: UpdateTaskInput, ctx: Context): Promise<Task>;
    moveTask(taskId: string, destinationColumnId: string, newIndex: number, ctx: Context): Promise<Task>;
    deleteTask(id: string, ctx: Context): Promise<boolean>;
}
