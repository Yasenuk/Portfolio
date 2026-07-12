'server only';

import { S3Client } from "@aws-sdk/client-s3";

if (
	!process.env.NEXT_PUBLIC_R2_ACCOUNT_ID ||
	!process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID ||
	!process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY ||
	!process.env.NEXT_PUBLIC_R2_BUCKET
) throw new Error('R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY and R2_BUCKET must be set');

export const r2 = new S3Client({
	region: 'auto',
	endpoint: `https://${process.env.NEXT_PUBLIC_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_ACCESS_KEY
	}
});

export const R2_BUCKET = process.env.NEXT_PUBLIC_R2_BUCKET;