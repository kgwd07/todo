// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Add this to extend the global type
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

// Use global instead of globalThis
export const prisma = global.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;