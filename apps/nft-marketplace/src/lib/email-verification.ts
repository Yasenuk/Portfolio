import { prisma } from "@portfolio/nft-marketplace-database";
import { generateToken } from "./tokens";

export const CHANGE_TTL_MS = 30 * 60 * 1000;
export const VERIFY_TTL_MS = 24 * 60 * 60 * 1000;

export async function createEmailRequest(
	userId: string,
	email: string,
	ttlMs: number,
) {
	const { token, tokenHash } = generateToken();

	await prisma.$transaction([
		prisma.emailChangeRequest.deleteMany({ where: { userId } }),
		prisma.emailChangeRequest.create({
			data: {
				userId,
				newEmail: email,
				tokenHash,
				expiresAt: new Date(Date.now() + ttlMs)
			}
		})
	]);

	return token;
}