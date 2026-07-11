import { prisma } from "@portfolio/nft-marketplace-database";
import { getSessionUser } from "../../../lib/session";

export const metadata = { title: 'My profile' };

export default async function ProfilePage() {
	const user = (await getSessionUser())!;

	const [createdNFTs, ownedNFTs, collections] = await Promise.all([
		prisma.nft.count({ where: { creatorId: user?.id } }),
		prisma.nft.count({ where: { ownerId: user?.id } }),
		prisma.collection.count({ where: { authorId: user?.id } }),
	]);

	return (
		<section>
			<div className="relative bg-action-fade bg-cover h-[15.625rem] md:h-[17.5rem] lg:h-[20rem] w-full">
				<div className="size-[7.5rem] border-bg border-2"></div>
			</div>
		</section>
	)
}