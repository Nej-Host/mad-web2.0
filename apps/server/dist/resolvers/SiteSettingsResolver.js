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
exports.SiteSettingsResolver = exports.CreateSocialLinkInput = exports.UpdateSiteSettingsInput = exports.SocialLink = exports.SiteSettings = void 0;
const type_graphql_1 = require("type-graphql");
let SiteSettings = class SiteSettings {
    id;
    heroTitle;
    heroSubtitle;
    primaryColor;
    logoUrl;
    createdAt;
    updatedAt;
};
exports.SiteSettings = SiteSettings;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], SiteSettings.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SiteSettings.prototype, "heroTitle", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SiteSettings.prototype, "heroSubtitle", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SiteSettings.prototype, "primaryColor", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Object)
], SiteSettings.prototype, "logoUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], SiteSettings.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], SiteSettings.prototype, "updatedAt", void 0);
exports.SiteSettings = SiteSettings = __decorate([
    (0, type_graphql_1.ObjectType)()
], SiteSettings);
let SocialLink = class SocialLink {
    id;
    platform;
    url;
    order;
};
exports.SocialLink = SocialLink;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], SocialLink.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SocialLink.prototype, "platform", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SocialLink.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SocialLink.prototype, "order", void 0);
exports.SocialLink = SocialLink = __decorate([
    (0, type_graphql_1.ObjectType)()
], SocialLink);
let UpdateSiteSettingsInput = class UpdateSiteSettingsInput {
    heroTitle;
    heroSubtitle;
    primaryColor;
    logoUrl;
};
exports.UpdateSiteSettingsInput = UpdateSiteSettingsInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSiteSettingsInput.prototype, "heroTitle", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSiteSettingsInput.prototype, "heroSubtitle", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSiteSettingsInput.prototype, "primaryColor", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSiteSettingsInput.prototype, "logoUrl", void 0);
exports.UpdateSiteSettingsInput = UpdateSiteSettingsInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateSiteSettingsInput);
let CreateSocialLinkInput = class CreateSocialLinkInput {
    platform;
    url;
    order;
};
exports.CreateSocialLinkInput = CreateSocialLinkInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSocialLinkInput.prototype, "platform", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSocialLinkInput.prototype, "url", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateSocialLinkInput.prototype, "order", void 0);
exports.CreateSocialLinkInput = CreateSocialLinkInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateSocialLinkInput);
let SiteSettingsResolver = class SiteSettingsResolver {
    async siteSettings(ctx) {
        // Pokusíme se najít existující nastavení
        let settings = await ctx.prisma.siteSettings.findUnique({
            where: { id: 'site_settings' }
        });
        // Pokud neexistují, vytvoříme výchozí
        if (!settings) {
            settings = await ctx.prisma.siteSettings.create({
                data: {
                    id: 'site_settings',
                    heroTitle: 'Vítejte v Madzone',
                    heroSubtitle: 'Moderní platforma pro události a komunitu',
                    primaryColor: '#3b82f6',
                }
            });
        }
        return settings;
    }
    async socialLinks(ctx) {
        return ctx.prisma.socialLink.findMany({
            orderBy: { order: 'asc' }
        });
    }
    async updateSiteSettings(input, ctx) {
        return ctx.prisma.siteSettings.upsert({
            where: { id: 'site_settings' },
            update: input,
            create: {
                id: 'site_settings',
                heroTitle: input.heroTitle || 'Vítejte v Madzone',
                heroSubtitle: input.heroSubtitle || 'Moderní platforma pro události a komunitu',
                primaryColor: input.primaryColor || '#3b82f6',
                logoUrl: input.logoUrl,
            }
        });
    }
    async createSocialLink(input, ctx) {
        return ctx.prisma.socialLink.create({
            data: input
        });
    }
    async deleteSocialLink(id, ctx) {
        await ctx.prisma.socialLink.delete({
            where: { id }
        });
        return true;
    }
};
exports.SiteSettingsResolver = SiteSettingsResolver;
__decorate([
    (0, type_graphql_1.Query)(() => SiteSettings),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteSettingsResolver.prototype, "siteSettings", null);
__decorate([
    (0, type_graphql_1.Query)(() => [SocialLink]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteSettingsResolver.prototype, "socialLinks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SiteSettings),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateSiteSettingsInput, Object]),
    __metadata("design:returntype", Promise)
], SiteSettingsResolver.prototype, "updateSiteSettings", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => SocialLink),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Arg)('input')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSocialLinkInput, Object]),
    __metadata("design:returntype", Promise)
], SiteSettingsResolver.prototype, "createSocialLink", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    (0, type_graphql_1.Authorized)(['ADMIN']),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteSettingsResolver.prototype, "deleteSocialLink", null);
exports.SiteSettingsResolver = SiteSettingsResolver = __decorate([
    (0, type_graphql_1.Resolver)(SiteSettings)
], SiteSettingsResolver);
