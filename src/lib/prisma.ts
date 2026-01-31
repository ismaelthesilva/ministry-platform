import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL ?? "";

const adapter = databaseUrl
  ? new PrismaPg({ connectionString: databaseUrl })
  : undefined;

const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

export default prisma;
