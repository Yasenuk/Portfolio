import { ButtonMain, Heading, InputMain, SubscribeForm } from "@portfolio/nft-marketplace";
import { getSessionUser } from "../../../../lib/session";
import { prisma } from "@portfolio/nft-marketplace-database";
import { LogoutButton } from "../../../../features/auth/logout-button";

export default async function AccountPage() {
	const user = (await getSessionUser())!;

	return (
		<section className="grid grid-flow-row grid-cols-2 gap-5">
			<Heading
				className="col-span-2"
				title="Email &amp; account"
				description="Manage Your mail and account data."
			/>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid grid-cols-2 grid-rows-2 items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase">Current email</span>
				<span className="row-span-2 col-end-4"></span> {/* is confirmed */}
				<span>{user?.email}</span>
			</div>
			<SubscribeForm className="col-span-2 md:bg-bg-secondary">
				<InputMain className="text-text placeholder:text-text bg-bg-secondary" icon="envelopesimple" variant='subscribe' placeholder="Enter Your new email" />
				<ButtonMain className="min-w-60" size='sm' icon="pen">Change</ButtonMain>
			</SubscribeForm>
			<div className="col-span-2 md:col-span-1 rounded border border-bg-secondary p-5 grid gap-y-3">
				<span className="text-label uppercase">User ID</span>
				<span>@{user.id}</span>
			</div>
			<div className="col-span-2 md:col-span-1 rounded border border-bg-secondary p-5 grid gap-y-3">
				<span className="text-label uppercase">Language</span>
				<span>-</span>
			</div>
			<div className="col-span-2 border border-danger rounded p-5 grid grid-flow-col grid-cols-2 grid-rows-2 items-center gap-y-3 gap-x-5">
				<span className="text-danger uppercase">Logout Your account</span>
				<LogoutButton />
				<p className="">Log out of the Your account.</p>
			</div>
		</section>
	)
}