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
exports.TaskResolver = exports.UpdateTaskInput = exports.CreateTaskInput = exports.Column = exports.Task = void 0;
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./UserResolver");
let Task = class Task {
    id;
    title;
    description;
    status;
    priority;
    position;
    columnId;
    createdById;
    assigneeId;
    projectId;
    dueDate;
    createdAt;
    updatedAt;
    createdBy;
    assignee;
    column;
};
exports.Task = Task;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Task.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "columnId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "createdById", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "assigneeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "dueDate", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserResolver_1.User),
    __metadata("design:type", UserResolver_1.User)
], Task.prototype, "createdBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => UserResolver_1.User, { nullable: true }),
    __metadata("design:type", UserResolver_1.User)
], Task.prototype, "assignee", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Column),
    __metadata("design:type", Column)
], Task.prototype, "column", void 0);
exports.Task = Task = __decorate([
    (0, type_graphql_1.ObjectType)()
], Task);
let Column = class Column {
    id;
    title;
    position;
    color;
    tasks;
};
exports.Column = Column;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Column.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Column.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Column.prototype, "position", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Column.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Task]),
    __metadata("design:type", Array)
], Column.prototype, "tasks", void 0);
exports.Column = Column = __decorate([
    (0, type_graphql_1.ObjectType)()
], Column);
let CreateTaskInput = class CreateTaskInput {
    title;
    description;
    columnId;
    assigneeId;
    projectId;
    dueDate;
    priority;
};
exports.CreateTaskInput = CreateTaskInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "columnId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "assigneeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "projectId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], CreateTaskInput.prototype, "dueDate", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 'MEDIUM' }),
    __metadata("design:type", String)
], CreateTaskInput.prototype, "priority", void 0);
exports.CreateTaskInput = CreateTaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateTaskInput);
let UpdateTaskInput = class UpdateTaskInput {
    title;
    description;
    status;
    priority;
    assigneeId;
    dueDate;
};
exports.UpdateTaskInput = UpdateTaskInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "priority", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateTaskInput.prototype, "assigneeId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateTaskInput.prototype, "dueDate", void 0);
exports.UpdateTaskInput = UpdateTaskInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateTaskInput);
let TaskResolver = class TaskResolver {
    async kanbanBoard(ctx) {
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
    async tasks(ctx) {
        return ctx.prisma.task.findMany({
            include: {
                createdBy: true,
                assignee: true,
                column: true,
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async createTask(input, ctx) {
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
                priority: input.priority, // Cast to Prisma enum
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
    async updateTask(id, input, ctx) {
        return ctx.prisma.task.update({
            where: { id },
            data: {
                title: input.title,
                description: input.description,
                status: input.status,
                priority: input.priority,
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
    async moveTask(taskId, destinationColumnId, newIndex, ctx) {
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
    async deleteTask(id, ctx) {
        await ctx.prisma.task.delete({
            where: { id }
        });
        return true;
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Column]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "kanbanBoard", null);
__decorate([
    (0, type_graphql_1.Query)(() => [Task]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('input')),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTaskInput, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('taskId')),
    __param(1, (0, type_graphql_1.Arg)('destinationColumnId')),
    __param(2, (0, type_graphql_1.Arg)('newIndex', () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "moveTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)(Task)
], TaskResolver);
