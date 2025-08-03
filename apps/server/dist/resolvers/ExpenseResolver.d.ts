import { Context } from '../context';
export declare class Expense {
    id: string;
    title: string;
    description?: string | null;
    amount: number;
    currency: string;
    date: Date;
    categoryId: string;
    createdById: string;
    receipt?: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ExpenseCategory {
    id: string;
    name: string;
    color: string;
    icon: string;
}
export declare class CreateExpenseInput {
    title: string;
    description?: string;
    amount: number;
    currency: string;
    date: Date;
    categoryId: string;
    receipt?: string;
}
export declare class ExpenseResolver {
    expenses(ctx: Context, categoryId?: string, startDate?: Date, endDate?: Date): Promise<Expense[]>;
    expenseCategories(ctx: Context): Promise<ExpenseCategory[]>;
    createExpense(input: CreateExpenseInput, ctx: Context): Promise<Expense>;
    approveExpense(id: string, ctx: Context): Promise<boolean>;
    rejectExpense(id: string, ctx: Context): Promise<boolean>;
}
