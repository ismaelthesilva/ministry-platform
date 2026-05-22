import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    if (process.env.NEXT_PHASE === "phase-production-build") {
      // During build, DATABASE_URL is not available on Vercel.
      // Return a Proxy stub so module-level imports don't throw;
      // routes must be marked `dynamic = 'force-dynamic'` so this
      // stub is never actually called at runtime.
      return new Proxy({} as PrismaClient, {
        get(_target, prop) {
          if (prop === "$connect" || prop === "$disconnect") {
            return () => Promise.resolve();
          }
          return () => Promise.resolve(null);
        },
      });
    }
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
