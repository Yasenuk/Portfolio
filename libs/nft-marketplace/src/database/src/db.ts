import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const createPrismaClient = () =>
	new PrismaClient({ adapter });

export const prisma = globalPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;

export * from './generated/prisma/client';
