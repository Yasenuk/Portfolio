import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

dotenv.config({
	path: [
		'apps/nft-marketplace/.env.local',
		'../../apps/nft-marketplace/.env.local',
	],
});

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: process.env.DIRECT_URL,
	},
});
