import { redirect } from "next/navigation";
import { prisma } from "@portfolio/nft-marketplace-database";

import { getCurrentSession } from "../../../../lib/session";
import { formatUserAgent } from "../../../../lib/user-agent";
import { SessionsList } from "../../../../features/profile/sessions-list";

export default async function SessionsPage() {
	const session = await getCurrentSession();
	if (!session) redirect('/login');

	const rows = await prisma.refreshToken.findMany({
		where: { userId: session.userId, expiresAt: { gt: new Date() } },
		orderBy: [{ lastUsedAt: 'desc' }, { createdAt: 'desc' }],
		select: {
			id: true,
			ip: true,
			userAgent: true,
			lastUsedAt: true,
			createdAt: true,
		},
	});

	return (
		<SessionsList
			currentId={session.jti}
			sessions={rows.map((row) => ({
				id: row.id,
				device: formatUserAgent(row.userAgent),
				ip: row.ip,
				lastUsedAt: row.lastUsedAt,
				createdAt: row.createdAt,
			}))}
		/>
	);
}
