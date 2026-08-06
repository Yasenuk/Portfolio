import { redirect } from "next/navigation";

import { Heading } from "@portfolio/nft-marketplace";

import { getSessionUser } from '../../../../lib/session';
import { LogoutButton } from "../../../../features/auth/logout-button";
import { ChangeEmailForm } from "../../../../features/profile/change-email-form";

export default async function AccountPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return (
		<section className="grid grid-flow-row grid-cols-2 gap-5">
			<Heading
				className="col-span-2"
				title="Email &amp; account"
				description="Manage Your mail and account data."
			/>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid grid-rows-2 items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase">
					Current email
					{user.emailVerified
						? <span className="text-success"> (confirmed)</span>
						: <span className="text-warning"> (not confirmed)</span>
					}
				</span>
				<span>{user.email}</span>
			</div>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid grid-cols-2 items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase col-span-2">Change your email</span>
				<ChangeEmailForm />
			</div>
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
