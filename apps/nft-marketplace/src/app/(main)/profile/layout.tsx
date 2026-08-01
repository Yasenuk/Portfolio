import { redirect } from "next/navigation";
import { getSessionUser } from "@portfolio/nft-marketplace-utils";
import { ProfileNav } from "@portfolio/nft-marketplace";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return (
		<div className="max-w-[1440px] md:px-0 flex flex-col gap-8 py-5 lg:flex-row">
			<aside className="lg:w-60 shrink-0 relative">
				<ProfileNav />
			</aside>
			<main className="flex-1">
				{children}
			</main>
		</div>
	)
}