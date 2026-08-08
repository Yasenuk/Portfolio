export type SessionUser = {
	id: string;
	username: string;
	emailVerified: string | null;
	twoFactorEnabled: boolean;
	email: string;
	profile?: { avatarUrl: string | null } | null;
};

export type SessionMeta = { ip: string | null; userAgent: string | null };
export type SessionPayload = { userId: string; jti: string };