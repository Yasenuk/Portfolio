import { prisma } from "@portfolio/nft-marketplace-database";
import { getSessionUser } from "../../../lib/session";
import { Icon } from "@portfolio/shared-ui";
import { ButtonMain, ProfileHeader, StatsBar } from "@portfolio/nft-marketplace";
import { CopyAddressButton } from "../../../features/wallet/copy-address-button";

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

	return (
		<div className="h-full relative">
			<ProfileHeader
				backgroundUrl={ (user!.profile!.backgroundUrl!) }
				avatarUrl={user!.profile!.avatarUrl!}
				tooltip
			/>
			<section className="pb-10 flex flex-col gap-y-7.5">
				<div className="flex flex-wrap gap-5 items-center lg:justify-between">
					<h1 className="basis-[100%] lg:flex-1 text-h4 md:text-h3 lg:text-h2 font-semibold pb-2.5 lg:pb-0">{user?.username}</h1>
					<CopyAddressButton className="basis-[100%] md:basis-auto" address={wallet_address!.address} />
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