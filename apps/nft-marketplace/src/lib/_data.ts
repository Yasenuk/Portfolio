import { cache } from 'react';
import { prisma } from '@portfolio/nft-marketplace-database';

export const getProfileCounts = cache(async (userId: string) => {
	const [createdNFTs, ownedNFTs, collections] = await Promise.all([
		prisma.nft.count({ where: { creatorId: userId } }),
		prisma.nft.count({ where: { ownerId: userId } }),
		prisma.collection.count({ where: { authorId: userId } }),
	]);

	return { createdNFTs, ownedNFTs, collections };
});
