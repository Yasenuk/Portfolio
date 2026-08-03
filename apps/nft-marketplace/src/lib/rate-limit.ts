import { prisma } from '@portfolio/nft-marketplace-database';

export async function RateLimit(key: string, limit: number, windowMs: number) {
	const now = new Date();
	const record = await prisma.rateLimit.upsert({
		where: { key },
		create: { key, count: 1, expiresAt: new Date(+now + windowMs) },
		update: {}
	});

	if (record.expiresAt < now) {
		await prisma.rateLimit.update({
			where: { key },
			data: { count: 1, expiresAt: new Date(+now + windowMs) }
		});

		return { ok: true };
	}

	if (record.count >= limit) return {
		ok: false,
		retryAfter: record.expiresAt
	}

	await prisma.rateLimit.update({
		where: { key },
		data: { count: { increment: 1 } }
	});

	return { ok: true };
}
