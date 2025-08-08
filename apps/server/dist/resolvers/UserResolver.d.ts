import { Context } from '../context';
export declare class User {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    imageUrl?: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserResolver {
    me(ctx: Context): Promise<User | null>;
    users(ctx: Context): Promise<User[]>;
    updateProfile(firstName: string, lastName: string, ctx: Context): Promise<User>;
}
