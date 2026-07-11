import { prisma } from "@portfolio/nft-marketplace-database";
import { getSessionUser } from "../../../lib/session";
import { Icon } from "@portfolio/shared-ui";
import { ButtonMain, StatsBar } from "@portfolio/nft-marketplace";

export const metadata = { title: 'My profile' };

export default async function ProfilePage() {
	const user = (await getSessionUser())!;

	const [createdNFTs, ownedNFTs, collections, wallet_address, followers] = await Promise.all([
		prisma.nft.count({ where: { creatorId: user?.id } }),
		prisma.nft.count({ where: { ownerId: user?.id } }),
		prisma.collection.count({ where: { authorId: user?.id } }),
		prisma.wallet.findFirst(
			{
				where: {
					userId: user.id,
					isPrimary: true
				},
				select: { address: true }
			}
		),
		prisma.follow.count({ where: { followingId: user.id } }),
	]);

	const formatAddress = (address?: string) =>
		address ? `0x${address.slice(2, 6).toUpperCase()}...${address.slice(-4).toUpperCase()}` : '';

	return (
		<div className="h-full relative">
			<div className="bg-action-fade h-[15.625rem] md:h-[17.5rem] lg:h-[20rem] w-full"></div>
			<div className="absolute size-[7.5rem] rounded border-bg border-2 -translate-y-[4.375rem]"></div>
			<section className="pt-[5.625rem] pb-10 flex flex-col gap-y-7.5">
				<div className="flex flex-wrap gap-5 items-center lg:justify-between">
					<h1 className="basis-[100%] lg:flex-1 text-h4 md:text-h3 lg:text-h2 pb-2.5 lg:pb-0">{user?.username}</h1>
					<ButtonMain className="basis-[100%] md:basis-auto" size='md' px='sm' icon="copy">
						{ formatAddress(wallet_address?.address) }
					</ButtonMain>
					<ButtonMain className="basis-[100%] md:basis-auto" variant='outlined' size='md' px='sm' icon="plus">Follow</ButtonMain>
				</div>
				<StatsBar className="md:w-[510px]" stats={[
					{ value: '0', label: 'Volume' },
					{ value: '0', label: 'NFTs sold' },
					{ value: String(followers), label: 'Followers' },
				]}/>
			</section>
		</div>
	)
}