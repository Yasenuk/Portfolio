import { redirect } from "next/navigation";
import { getSessionUser } from "../../../../lib/session";

export default async function WalletsPage() {
	const user = await getSessionUser();
	if (!user) redirect('/login');

	return <></>;
}