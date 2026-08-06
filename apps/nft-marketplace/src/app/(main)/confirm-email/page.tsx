import { redirect } from 'next/navigation';

import { ConfirmEmail } from '../../../features/profile/confirm-email';

export default async function ConfirmEmailPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const { token } = await searchParams;
	if (!token) redirect('/');

	return (
		<div className="container max-w-[1440px] py-10">
			<ConfirmEmail token={token} />
		</div>
	);
}
