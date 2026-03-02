import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL ?? "";
const adapter = databaseUrl
  ? new PrismaPg({ connectionString: databaseUrl })
  : undefined;
const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

async function checkDatabase() {
  console.log("📊 Checking Plans and Readings in database...\n");

  try {
    const plans = await prisma.plan.findMany();
    console.log(`Plans in DB: ${plans.length}`);
    plans.forEach((p) => console.log(`   - ${p.title} (${p.language})`));

    const readings = await prisma.dailyReading.findMany();
    console.log(`\nTotal Readings in DB: ${readings.length}`);

    // Group by plan
    const readingsByPlan = await prisma.plan.findMany({
      include: {
        _count: {
          select: { readings: true },
        },
      },
    });

    console.log("\nReadings per plan:");
    readingsByPlan.forEach((p) => {
      console.log(`   - ${p.title}: ${p._count.readings} readings`);
    });
  } catch (error) {
    console.error("❌ Error checking database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
