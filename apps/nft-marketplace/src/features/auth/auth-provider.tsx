'use client';

import * as React from 'react';
import { apiFetch } from '../../lib/api';
import { SessionUser } from '@portfolio/nft-marketplace-types';

type AuthContextValue = {
	user: SessionUser | null;
	loading: boolean;
	setUser: (user: SessionUser | null) => void;
	refetch: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<SessionUser | null>(null);
	const [loading, setLoading] = React.useState(true);

	const refetch = React.useCallback(async () => {
		try {
			const res = await apiFetch('/api/auth/me');

			if (res.status === 401) {
				setUser(null);
				return;
			}
			if (!res.ok) throw new Error('Failed to load session');

			const data = await res.json();
			setUser(data.user);
		} catch (err) {
			console.error(err);
			setUser(null);
		} finally {
			setLoading(false);
		}
	}, []);

	React.useEffect(() => {
		refetch();
	}, [refetch]);

	return (
		<AuthContext.Provider value={{ user, loading, setUser, refetch }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useSession() {
	const ctx = React.useContext(AuthContext);
	if (!ctx) throw new Error('useSession must be used inside <AuthProvider>');
	return ctx;
}