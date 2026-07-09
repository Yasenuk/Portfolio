let refreshPromise: Promise<boolean> | null = null;

async function refreshTokens(): Promise<boolean> {
	refreshPromise ??= fetch('/api/auth/refresh', { method: 'POST' })
		.then((res) => res.ok)
		.finally(() => setTimeout(() => (refreshPromise = null), 0));
	
	return refreshPromise;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	const res = await fetch(input, init);

	if (res.status !== 401) return res;

	const refreshed = await refreshTokens();
	if (!refreshed) return res; // сесії нема — віддаємо 401, викликач сам вирішує, що робити

	return fetch(input, init);
}