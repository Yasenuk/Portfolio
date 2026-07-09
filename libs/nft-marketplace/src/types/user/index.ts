export type SessionUser = {
	id: string;
	username: string;
	email: string;
	profile?: { avatarUrl: string | null } | null;
};