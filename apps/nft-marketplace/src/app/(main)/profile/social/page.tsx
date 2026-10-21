import { getSessionUser } from '../../../../lib/session';
import { redirect } from 'next/navigation';
import { prisma } from '@portfolio/nft-marketplace-database';
import { SOCIAL_PLATFORMS, SocialLinks } from '@portfolio/nft-marketplace-types';
import SocialLinksForm from '../../../../features/profile/social-links-form';

export default async function SocialPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	const rows = await prisma.userSocialLink.findMany({
		where: { userId: user.id },
		select: { platform: true, url: true }
	});

	const initial = Object.fromEntries(
		SOCIAL_PLATFORMS.map(p => [p, rows.find(r => r.platform === p)?.url ?? ''])
	) as SocialLinks;

	return <SocialLinksForm initial={initial} />
}