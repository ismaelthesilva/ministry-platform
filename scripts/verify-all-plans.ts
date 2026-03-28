import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL ?? "";

const adapter = databaseUrl
  ? new PrismaPg({ connectionString: databaseUrl })
  : undefined;

const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

async function main() {
  console.log("Checking all plans...\n");

  const plans = await prisma.plan.findMany({
    include: {
      _count: {
        select: { readings: true },
      },
    },
    orderBy: [{ language: "asc" }, { slug: "asc" }],
  });

  console.log("All Plans Summary:");
  console.log("==================");
  plans.forEach((plan) => {
    console.log(
      `${plan.language.toUpperCase()} - ${plan.title} (${plan.slug}): ${
        plan._count.readings
      } readings`
    );
  });

  console.log("\n\nChecking date formats (first reading of each plan):");
  console.log("====================================================");

  for (const plan of plans) {
    const firstReading = await prisma.dailyReading.findFirst({
      where: { planId: plan.id },
      orderBy: { dayNumber: "asc" },
    });

    if (firstReading) {
      console.log(
        `${plan.language.toUpperCase()} ${plan.slug}: ${firstReading.date}`
      );
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
