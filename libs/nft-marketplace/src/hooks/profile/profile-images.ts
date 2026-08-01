'use client';

import * as React from 'react';

import { apiFetch } from "@portfolio/nft-marketplace-utils";
import type {
	ProfileField,
	UploadStatus,
	ProfileImages
} from '@portfolio/nft-marketplace-types';

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const IDLE: Record<ProfileField, ProfileImages> = {
	avatarUrl: 'idle',
	backgroundUrl: 'idle',
};

async function readError(res: Response, fallback: string) {
	try {
		const data = await res.json();
		return typeof data.error === 'string' ? data.error : fallback;
	} catch {
		return fallback;
	}
}

interface Options {
	initial?: ProfileImages;
	folder?: string;
	onSaved?: () => Promise<void> | void;
}

export function useProfileImages({
	initial = { avatarUrl: null, backgroundUrl: null },
	folder = 'users',
	onSaved
}: Options = {}) {
	const [images, setImages] = React.useState<ProfileImages>(initial);
	const [status, setStatus] = React.useState(IDLE);
	const [error, setError] = React.useState<string | null>(null);

	const imagesRef = React.useRef(images);
	React.useEffect(() => imagesRef.current = images, [images]);

	const tokensRef = React.useRef<Record<ProfileField, number>>({
		avatarUrl: 0,
		backgroundUrl: 0,
	});

	const previewsRef = React.useRef(new Set<string>());
	React.useEffect(() => {
		const isUse = new Set(Object.values(images).filter(Boolean) as string[]);
		previewsRef.current.forEach((url) => {
			if (!isUse.has(url)) {
				URL.revokeObjectURL(url);
				previewsRef.current.delete(url);
			}
		});
	}, [images]);

	React.useEffect(() => {
		previewsRef.current.forEach(URL.revokeObjectURL);
		previewsRef.current.clear();
	}, []);

	const onFileChange = React.useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>, field: ProfileField) => {
			const file = e.target.files?.[0];
			e.target.value = '';
			if (!file) return;

			setError(null);

			if (!file.type.startsWith('image/')) return setError('Only images are allowed');
			if (file.size > MAX_SIZE) return setError('Max file size is 10 MB');

			const token = ++tokensRef.current[field];
			const isStale = () => tokensRef.current[field] !== token;

			const rollback = imagesRef.current[field];
			const preview = URL.createObjectURL(file);
			previewsRef.current.add(preview);

			setImages((prev) => ({ ...prev, [field]: preview }));
			setStatus((prev) => ({ ...prev, [field]: 'uploading' }));

			try {
				const signed = await apiFetch('/api/upload', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						contentType: file.type,
						size: file.size,
						folder,
					}),
				});

				if (!signed.ok) throw new Error(await readError(signed, 'Failed to get upload URL'));

				const { uploadUrl, publicUrl } = (await signed.json()) as {
					uploadUrl: string;
					publicUrl: string;
				};

				const put = await fetch(uploadUrl, {
					method: 'PUT',
					headers: { 'Content-Type': file.type },
					body: file,
				});

				if (!put.ok) throw new Error('Upload to storage failed');
				if (isStale()) return;

				setStatus((prev) => ({ ...prev, [field]: 'saving' }));
				const patch = await apiFetch('/api/user/profile', {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ [field]: publicUrl }),
				});

				if (!patch.ok) throw new Error(await readError(patch, 'Failed to save profile image'));
				if (isStale()) return;

				setImages((prev) => ({ ...prev, [field]: publicUrl }));
				await onSaved?.();
			} catch (err) {
				if (isStale()) return;
				setImages((prev) => ({ ...prev, [field]: rollback }));
				setError(err instanceof Error ? err.message : 'Something went wrong');
			} finally {
				if (!isStale()) {
					setStatus((prev) => ({ ...prev, [field]: 'idle' }));
				}
			}
		}, [folder, onSaved]
	);

	const isBusy = status.avatarUrl !== 'idle' || status.backgroundUrl !== 'idle';

	return {
		images,
		status,
		error,
		isBusy,
		onFileChange,
	};
}