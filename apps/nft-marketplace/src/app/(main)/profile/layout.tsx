import { redirect } from "next/navigation";
import { getSessionUser } from "../../../lib/session";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return (
		<div className="container flex flex-col gap-8 py-40 lg:flex-row">
			<aside className="lg:w-60 shrink-0"></aside>
			<main className="flex-1 min-w-0">
				{children}
			</main>
		</div>
	)
}