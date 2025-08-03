"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventResolver = exports.UpdateEventInput = exports.CreateEventInput = exports.Event = void 0;
const type_graphql_1 = require("type-graphql");
let Event = class Event {
    id;
    title;
    description;
    start;
    end;
    allDay;
    color;
    createdById;
    createdAt;
    updatedAt;
};
exports.Event = Event;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Event.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Event.prototype, "start", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Event.prototype, "end", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Event.prototype, "allDay", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Event.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Event.prototype, "createdById", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Event.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Event.prototype, "updatedAt", void 0);
exports.Event = Event = __decorate([
    (0, type_graphql_1.ObjectType)()
], Event);
let CreateEventInput = class CreateEventInput {
    title;
    description;
    start;
    end;
    allDay;
    color;
};
exports.CreateEventInput = CreateEventInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateEventInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateEventInput.prototype, "start", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], CreateEventInput.prototype, "end", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateEventInput.prototype, "allDay", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: '#3b82f6' }),
    __metadata("design:type", String)
], CreateEventInput.prototype, "color", void 0);
exports.CreateEventInput = CreateEventInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateEventInput);
let UpdateEventInput = class UpdateEventInput {
    title;
    description;
    start;
    end;
    allDay;
    color;
};
exports.UpdateEventInput = UpdateEventInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateEventInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateEventInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateEventInput.prototype, "start", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateEventInput.prototype, "end", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateEventInput.prototype, "allDay", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateEventInput.prototype, "color", void 0);
exports.UpdateEventInput = UpdateEventInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateEventInput);
let EventResolver = class EventResolver {
    async events(ctx, startDate, endDate) {
        const where = {};
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
    async createEvent(input, ctx) {
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
    async updateEvent(id, input, ctx) {
        return ctx.prisma.event.update({
            where: { id },
            data: input
        });
    }
    async deleteEvent(id, ctx) {
        await ctx.prisma.event.delete({
            where: { id }
        });
        return true;
    }
};
exports.EventResolver = EventResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Event]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('startDate', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('endDate', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Date,
        Date]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Event),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateEventInput, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Event),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('input')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateEventInput, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
exports.EventResolver = EventResolver = __decorate([
    (0, type_graphql_1.Resolver)(Event)
], EventResolver);
