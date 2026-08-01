export type ProfileField = 'avatarUrl' | 'backgroundUrl';
export type Status = 'idle' | 'uploading' | 'saving';
export type ProfileImages = Record<ProfileField, string | null>;