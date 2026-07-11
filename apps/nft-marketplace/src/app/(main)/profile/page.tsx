import { prisma } from "@portfolio/nft-marketplace-database";
import { getSessionUser } from "../../../lib/session";
import { Icon } from "@portfolio/shared-ui";

export const metadata = { title: 'My profile' };

export default async function ProfilePage() {
	const user = (await getSessionUser())!;

	const [createdNFTs, ownedNFTs, collections] = await Promise.all([
		prisma.nft.count({ where: { creatorId: user?.id } }),
		prisma.nft.count({ where: { ownerId: user?.id } }),
		prisma.collection.count({ where: { authorId: user?.id } }),
	]);

	return (
		<div className="h-full relative">
			<div className="bg-action-fade h-[15.625rem] md:h-[17.5rem] lg:h-[20rem] w-full"></div>
			<div className="absolute size-[7.5rem] rounded border-bg border-2 -translate-y-[4.375rem]"></div>
			<section className="pt-[5.625rem] pb-10">
				<h1 className="text-h4 md:text-h3 lg:text-h2">{ user?.username } <Icon name="pen" /></h1>
			</section>
		</div>
	)
}