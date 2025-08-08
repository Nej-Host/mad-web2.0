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
exports.UserResolver = exports.User = void 0;
const type_graphql_1 = require("type-graphql");
let User = class User {
    id;
    email;
    firstName;
    lastName;
    imageUrl;
    role;
    createdAt;
    updatedAt;
};
exports.User = User;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
let UserResolver = class UserResolver {
    async me(ctx) {
        if (!ctx.user)
            return null;
        const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.user.id }
        });
        return user;
    }
    async users(ctx) {
        return ctx.prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async updateProfile(firstName, lastName, ctx) {
        if (!ctx.user) {
            throw new Error('Uživatel není přihlášen');
        }
        return ctx.prisma.user.update({
            where: { id: ctx.user.id },
            data: {
                firstName,
                lastName,
            }
        });
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, type_graphql_1.Query)(() => User, { nullable: true }),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => [User]),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User),
    (0, type_graphql_1.Authorized)(),
    __param(0, (0, type_graphql_1.Arg)('firstName', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('lastName', { nullable: true })),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateProfile", null);
exports.UserResolver = UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(User)
], UserResolver);
