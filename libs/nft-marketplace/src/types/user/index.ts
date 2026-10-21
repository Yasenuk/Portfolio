export type SessionUser = {
	id: string;
	username: string;
	emailVerified: string | null;
	twoFactorEnabled: boolean;
	email: string | null;
	profile?: { avatarUrl: string | null } | null;
};

export type SessionMeta = { ip: string | null; userAgent: string | null };
export type SessionPayload = { userId: string; jti: string };

export const SOCIAL_PLATFORMS = ['website', 'twitter', 'instagram', 'discord', 'youtube'] as const;
export type SocialPlatform = typeof SOCIAL_PLATFORMS[number];
export type SocialLinks = Record<SocialPlatform, string>;