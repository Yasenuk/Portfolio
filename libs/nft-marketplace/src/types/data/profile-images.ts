export type ProfileField = 'avatarUrl' | 'backgroundUrl';
export type UploadStatus = 'idle' | 'uploading' | 'saving';
export type ProfileImages = Record<ProfileField, string | null>;