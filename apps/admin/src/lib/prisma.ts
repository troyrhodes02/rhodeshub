import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function makePrismaClient() {
  const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";

  if (!connectionString) {
    throw new Error(
      "Missing DIRECT_URL or DATABASE_URL for Prisma. Set it in apps/admin/.env.local."
    );
  }

  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
