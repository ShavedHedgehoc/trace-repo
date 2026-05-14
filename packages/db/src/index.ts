import { PrismaClient, Prisma } from './generated/client';
export const mssqlPrisma = new PrismaClient();
export { Prisma };
export * from './generated';


