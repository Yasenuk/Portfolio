import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@portfolio/nft-marketplace";

import { getSessionUser } from "../../../../lib/session";
import { getProfileCounts } from "../../../../lib/_data";

export default async function ProfileTabs() {
	const user = await getSessionUser();
	if (!user) return null;

	const { ownedNFTs, createdNFTs, collections } = await getProfileCounts(user.id);

	return (
		<div className="container max-w-[1440px] py-5">
			<Tabs defaultValue="owned">
				<TabsList>
					<TabsTrigger valueCount={ownedNFTs} value="owned">Owned</TabsTrigger>
					<TabsTrigger valueCount={createdNFTs} value="created">Created</TabsTrigger>
					<TabsTrigger valueCount={collections} value="collections">Collections</TabsTrigger>
				</TabsList>

				<TabsContent value="owned">Owned</TabsContent>
				<TabsContent value="created">Created</TabsContent>
				<TabsContent value="collections">Collections</TabsContent>
			</Tabs>
		</div>
	);
}
