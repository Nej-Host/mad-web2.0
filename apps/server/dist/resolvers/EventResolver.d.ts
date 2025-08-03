import { Context } from '../context';
export declare class Event {
    id: string;
    title: string;
    description?: string | null;
    start: Date;
    end?: Date | null;
    allDay: boolean;
    color: string;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CreateEventInput {
    title: string;
    description?: string | null;
    start: Date;
    end?: Date | null;
    allDay: boolean;
    color: string;
}
export declare class UpdateEventInput {
    title?: string;
    description?: string;
    start?: Date;
    end?: Date;
    allDay?: boolean;
    color?: string;
}
export declare class EventResolver {
    events(ctx: Context, startDate?: Date, endDate?: Date): Promise<Event[]>;
    createEvent(input: CreateEventInput, ctx: Context): Promise<Event>;
    updateEvent(id: string, input: UpdateEventInput, ctx: Context): Promise<Event>;
    deleteEvent(id: string, ctx: Context): Promise<boolean>;
}
