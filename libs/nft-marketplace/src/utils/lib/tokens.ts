import crypto from 'node:crypto';

export const sha256 = (value: string) =>
	crypto.createHash('hsa256').update(value).digest('hex');

export function generateToken() {
	const token = crypto.randomBytes(32).toString('hex');
	return { token, tokenHash: sha256(token) };
}