'use client'

import * as React from 'react';
import { AuthForm, ButtonMain, Form, InputMain, InputPassword } from "@portfolio/nft-marketplace";
import { useRouter } from 'next/navigation';
import { useSession } from './auth-provider';

export default function RegisterForm() {
	const router = useRouter();
	
	const { setUser } = useSession();

	const [error, setError] = React.useState<string | null>(null);
	const [pending, setPending] = React.useState(false);

	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordConfirm, setPasswordConfirm] = React.useState("");

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (password !== passwordConfirm) {
			setError('Passwords do not match');
			return;
		}

		setPending(true);

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password }),
			});

			if (!res.ok) {
				const { error } = await res.json();
				setError(error ?? 'Something went wrong');
				return;
			}

			const data = await res.json();
			setUser(data.user);
			router.push('/wallet/connect');
		} catch {
			setError('Network error, try again');
		} finally {
			setPending(false);
		}
	};

	return (
		<AuthForm
			title='Create account'
			description='Welcome! enter your details and start creating, collecting and selling NFTs.'
			imageSrc='form_img.png'
		>
			<Form className='gap-y-[15px]' onSubmit={submit}>
				<InputMain
					placeholder='Username'
					icon='user'
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<InputMain
					placeholder='Email address'
					icon='envelopesimple'
					required type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<InputPassword
					placeholder='Password'
					icon='lockkey'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<InputPassword
					placeholder='Confirm password'
					icon='lockkey'
					required
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
				<ButtonMain disabled={pending} size="xs" className='mt-[15px] w-full'>Create account</ButtonMain>
			</Form>
		</AuthForm>
	);
}