import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient instance for database access throughout the application.
 *
 * This instance is used to interact with the database via Prisma ORM.
 */
const prisma = new PrismaClient();

export default prisma;
