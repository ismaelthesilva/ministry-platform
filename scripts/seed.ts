import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface ReadingRow {
  dayNumber: string;
  date: string;
  bible: string;
  author?: string;
  book?: string;
  title?: string;
}

function parseCSV(filePath: string): ReadingRow[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());

  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: ReadingRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());
    const row: Partial<ReadingRow> = {};

    headers.forEach((header, index) => {
      row[header as keyof ReadingRow] = values[index] || "";
    });

    rows.push(row as ReadingRow);
  }

  return rows;
}

async function seedPlans() {
  console.log("📚 Seeding Plans...");

  const plans = [
    {
      slug: "bible",
      title: "Bíblia em 1 Ano",
      description: "Leia toda a Bíblia em um ano com um plano cronológico.",
      language: "br",
    },
    {
      slug: "prophetic",
      title: "Plano Profético",
      description:
        "Bíblia + Comentários de Ellen G. White (Espírito de Profecia).",
      language: "br",
    },
    {
      slug: "classic",
      title: "Plano Clássico",
      description:
        "Bíblia + Comentários de Pais da Igreja e Teólogos Clássicos.",
      language: "br",
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: {
        slug_language: {
          slug: plan.slug,
          language: plan.language,
        },
      },
      update: plan,
      create: plan,
    });
  }

  console.log("✅ Plans seeded successfully");
}

async function seedDailyReadings() {
  console.log("📖 Seeding Daily Readings...");

  const seedsDir = path.join(__dirname, "..", "prisma", "seeds");

  // Check if seeds directory exists
  if (!fs.existsSync(seedsDir)) {
    console.log("⚠️  Seeds directory not found. Creating sample data...");
    await createSampleReadings();
    return;
  }

  const plans = await prisma.plan.findMany();

  for (const plan of plans) {
    const csvFile = path.join(seedsDir, `${plan.slug}.csv`);

    if (!fs.existsSync(csvFile)) {
      console.log(`⚠️  CSV file not found for ${plan.slug}. Skipping...`);
      continue;
    }

    console.log(`   Processing ${plan.slug}...`);
    const rows = parseCSV(csvFile);

    for (const row of rows) {
      // Check if reading exists
      const existing = await prisma.dailyReading.findFirst({
        where: {
          planId: plan.id,
          dayNumber: parseInt(row.dayNumber),
        },
      });

      if (existing) {
        // Update existing
        await prisma.dailyReading.update({
          where: { id: existing.id },
          data: {
            date: row.date,
            bible: row.bible,
            author: row.author || null,
            book: row.book || null,
            title: row.title || null,
          },
        });
      } else {
        // Create new
        await prisma.dailyReading.create({
          data: {
            planId: plan.id,
            dayNumber: parseInt(row.dayNumber),
            date: row.date,
            bible: row.bible,
            author: row.author || null,
            book: row.book || null,
            title: row.title || null,
          },
        });
      }
    }
  }

  console.log("✅ Daily Readings seeded successfully");
}

async function createSampleReadings() {
  console.log("   Creating sample readings for demonstration...");

  const plans = await prisma.plan.findMany();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  for (const plan of plans) {
    // Create readings for first 10 days of each month (120 readings per plan)
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 10; day++) {
        const dayNumber = month * 30 + day;
        if (dayNumber > 365) break;

        const date = `${day < 10 ? "0" + day : day}-${months[month].slice(
          0,
          3
        )}`;

        let bible = "";
        let author: string | null = null;
        let book: string | null = null;
        let title: string | null = null;

        if (plan.slug === "bible") {
          bible = `Gênesis ${dayNumber}`;
          title = `Criação e História - Dia ${dayNumber}`;
        } else if (plan.slug === "prophetic") {
          bible = `Gênesis ${dayNumber}`;
          author = "Ellen G. White";
          book = "Patriarcas e Profetas";
          title = `Capítulo ${Math.ceil(dayNumber / 5)}`;
        } else if (plan.slug === "classic") {
          bible = `Gênesis ${dayNumber}`;
          author = "Santo Agostinho";
          book = "Confissões";
          title = `Livro ${Math.ceil(dayNumber / 30)}`;
        }

        // Check if reading exists
        const existing = await prisma.dailyReading.findFirst({
          where: {
            planId: plan.id,
            dayNumber,
          },
        });

        if (existing) {
          // Update existing
          await prisma.dailyReading.update({
            where: { id: existing.id },
            data: {
              date,
              bible,
              author,
              book,
              title,
            },
          });
        } else {
          // Create new
          await prisma.dailyReading.create({
            data: {
              planId: plan.id,
              dayNumber,
              date,
              bible,
              author,
              book,
              title,
            },
          });
        }
      }
    }

    console.log(`   ✅ Sample data created for ${plan.title}`);
  }
}

async function main() {
  console.log("🌱 Starting seed process...\n");

  try {
    await seedPlans();
    await seedDailyReadings();

    console.log("\n🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Error during seed:", error);
    throw error;
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
