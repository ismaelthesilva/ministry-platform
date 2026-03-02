import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL ?? "";

const adapter = databaseUrl
  ? new PrismaPg({ connectionString: databaseUrl })
  : undefined;

const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

async function main() {
  console.log("Checking English plan data...\n");

  const enPropheticPlan = await prisma.plan.findFirst({
    where: { slug: "prophetic", language: "en" },
  });

  if (enPropheticPlan) {
    const readings = await prisma.dailyReading.findMany({
      where: { planId: enPropheticPlan.id },
      take: 10,
      orderBy: { dayNumber: "asc" },
    });

    console.log("English Prophetic Plan (first 10 readings):");
    console.log("===============================================");
    readings.forEach((r) => {
      console.log(`Day ${r.dayNumber}: ${r.date}`);
      console.log(`  Bible: ${r.bible || "N/A"}`);
      console.log(`  Author: ${r.author || "N/A"}`);
      console.log(`  Book: ${r.book || "N/A"}`);
      console.log(`  Title: ${r.title || "N/A"}`);
      console.log("");
    });

    const count = await prisma.dailyReading.count({
      where: { planId: enPropheticPlan.id },
    });
    console.log(`Total readings: ${count}/365`);
  } else {
    console.log("English Prophetic Plan not found!");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
