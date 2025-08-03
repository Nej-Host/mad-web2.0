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
exports.ExpenseResolver = exports.CreateExpenseInput = exports.ExpenseCategory = exports.Expense = void 0;
const type_graphql_1 = require("type-graphql");
let Expense = class Expense {
    id;
    title;
    description;
    amount;
    currency;
    date;
    categoryId;
    createdById;
    receipt;
    status;
    createdAt;
    updatedAt;
};
exports.Expense = Expense;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Expense.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Expense.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Expense.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Expense.prototype, "currency", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Expense.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Expense.prototype, "categoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Expense.prototype, "createdById", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], Expense.prototype, "receipt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Expense.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Expense.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], Expense.prototype, "updatedAt", void 0);
exports.Expense = Expense = __decorate([
    (0, type_graphql_1.ObjectType)()
], Expense);
let ExpenseCategory = class ExpenseCategory {
    id;
    name;
    color;
    icon;
};
exports.ExpenseCategory = ExpenseCategory;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], ExpenseCategory.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ExpenseCategory.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ExpenseCategory.prototype, "color", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ExpenseCategory.prototype, "icon", void 0);
exports.ExpenseCategory = ExpenseCategory = __decorate([
    (0, type_graphql_1.ObjectType)()
], ExpenseCategory);
let CreateExpenseInput = class CreateExpenseInput {
    title;
    description;
    amount;
    currency;
    date;
    categoryId;
    receipt;
};
exports.CreateExpenseInput = CreateExpenseInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateExpenseInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateExpenseInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], CreateExpenseInput.prototype, "amount", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: 'CZK' }),
    __metadata("design:type", String)
], CreateExpenseInput.prototype, "currency", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateExpenseInput.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateExpenseInput.prototype, "categoryId", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateExpenseInput.prototype, "receipt", void 0);
exports.CreateExpenseInput = CreateExpenseInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateExpenseInput);
let ExpenseResolver = class ExpenseResolver {
    async expenses(ctx, categoryId, startDate, endDate) {
        const where = {};
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (startDate && endDate) {
            where.date = {
                gte: startDate,
                lte: endDate,
            };
        }
        return ctx.prisma.expense.findMany({
            where,
            orderBy: { date: 'desc' }
        });
    }
    async expenseCategories(ctx) {
        return ctx.prisma.expenseCategory.findMany({
            orderBy: { name: 'asc' }
        });
    }
    async createExpense(input, ctx) {
        if (!ctx.user) {
            throw new Error('Uživatel není přihlášen');
        }
        return ctx.prisma.expense.create({
            data: {
                ...input,
                createdById: ctx.user.id,
            }
        });
    }
    async approveExpense(id, ctx) {
        await ctx.prisma.expense.update({
            where: { id },
            data: { status: 'APPROVED' }
        });
        return true;
    }
    async rejectExpense(id, ctx) {
        await ctx.prisma.expense.update({
            where: { id },
            data: { status: 'REJECTED' }
        });
        return true;
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Expense]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)('categoryId', { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('startDate', { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('endDate', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Date,
        Date]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "expenses", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ExpenseCategory]),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "expenseCategories", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Expense),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateExpenseInput, Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "createExpense", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "approveExpense", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "rejectExpense", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, type_graphql_1.Resolver)(Expense)
], ExpenseResolver);
