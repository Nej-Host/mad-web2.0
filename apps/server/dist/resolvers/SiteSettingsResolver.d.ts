import { Context } from '../context';
export declare class SiteSettings {
    id: string;
    heroTitle: string;
    heroSubtitle: string;
    primaryColor: string;
    logoUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class SocialLink {
    id: string;
    platform: string;
    url: string;
    order: number;
}
export declare class UpdateSiteSettingsInput {
    heroTitle?: string;
    heroSubtitle?: string;
    primaryColor?: string;
    logoUrl?: string;
}
export declare class CreateSocialLinkInput {
    platform: string;
    url: string;
    order: number;
}
export declare class SiteSettingsResolver {
    siteSettings(ctx: Context): Promise<SiteSettings>;
    socialLinks(ctx: Context): Promise<SocialLink[]>;
    updateSiteSettings(input: UpdateSiteSettingsInput, ctx: Context): Promise<SiteSettings>;
    createSocialLink(input: CreateSocialLinkInput, ctx: Context): Promise<SocialLink>;
    deleteSocialLink(id: string, ctx: Context): Promise<boolean>;
}
