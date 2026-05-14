import { PrismaClient, Prisma } from './generated/index.js';
export const mssqlPrisma = new PrismaClient();
export { Prisma };
export * from './generated/index.js';


