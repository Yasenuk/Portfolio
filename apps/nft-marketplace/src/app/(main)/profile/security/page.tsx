import { ButtonMain, Heading, InputMain, InputPassword, SubscribeForm } from "@portfolio/nft-marketplace";
import { getSessionUser } from "../../../../lib/session";
import { redirect } from "next/navigation";

export default async function SecurityPage() {
	const user = (await getSessionUser())!;
	if (!user) redirect('/login');

	return (
		<section className="grid grid-flow-row grid-cols-2 gap-5">
			<Heading
				className="col-span-2"
				title="Password &amp; security"
				description="Manage Your password and security data."
			/>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase">Current password</span>
				<InputPassword
					icon='lockkey'
					value={String(Array.from({ length: 10 }, () => '*').join(''))}
				/>
			</div>
			<div className="col-span-2 border border-bg-secondary rounded p-5 grid grid-cols-2 items-center gap-y-3 gap-x-5">
				<span className="text-label uppercase">Change your password</span>
				<InputPassword
					icon='lockkey'
				/>
			</div>
		</section>
	)
}