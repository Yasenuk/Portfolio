import { Heading } from "@portfolio/nft-marketplace";
import { redirect } from "next/navigation";

import { getSessionUser } from "../../../../lib/session";
import { ChangePasswordForm } from "../../../../features/profile/change-password-form";

export default async function SecurityPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return (
		<section className="grid grid-flow-row grid-cols-2 gap-5">
			<Heading
				className="col-span-2"
				title="Password &amp; security"
				description="Manage Your password and security data."
			/>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase">Change your password</span>
				<ChangePasswordForm />
			</div>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid gap-y-3">
				<span className="text-label uppercase">Two-factor authentication</span>
				<span>{user.twoFactorEnabled ? 'Enabled' : 'Not set up'}</span>
			</div>
		</section>
	)
}
