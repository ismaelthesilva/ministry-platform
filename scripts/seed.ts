import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface ReadingRow {
  dayNumber: string;
  dateDisplay: string;
  bibleTextMain: string;
  bibleTextDevo?: string;
  commentaryAuthor?: string;
  commentaryWork?: string;
  commentaryRef?: string;
  topic?: string;
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
      slug: "bible-only",
      title: "Bíblia em 1 Ano",
      description: "Leia toda a Bíblia em um ano com um plano cronológico.",
      language: "pt",
    },
    {
      slug: "prophetic",
      title: "Plano Profético",
      description:
        "Bíblia + Comentários de Ellen G. White (Espírito de Profecia).",
      language: "pt",
    },
    {
      slug: "classical",
      title: "Plano Clássico",
      description:
        "Bíblia + Comentários de Pais da Igreja e Teólogos Clássicos.",
      language: "pt",
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
            dateDisplay: row.dateDisplay,
            bibleTextMain: row.bibleTextMain,
            bibleTextDevo: row.bibleTextDevo || "",
            commentaryAuthor: row.commentaryAuthor || "",
            commentaryWork: row.commentaryWork || "",
            commentaryRef: row.commentaryRef || "",
            topic: row.topic || "",
          },
        });
      } else {
        // Create new
        await prisma.dailyReading.create({
          data: {
            planId: plan.id,
            dayNumber: parseInt(row.dayNumber),
            dateDisplay: row.dateDisplay,
            bibleTextMain: row.bibleTextMain,
            bibleTextDevo: row.bibleTextDevo || "",
            commentaryAuthor: row.commentaryAuthor || "",
            commentaryWork: row.commentaryWork || "",
            commentaryRef: row.commentaryRef || "",
            topic: row.topic || "",
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

        const dateDisplay = `${day} de ${months[month]}`;

        let bibleTextMain = "";
        let bibleTextDevo = "";
        let commentaryAuthor = "";
        let commentaryWork = "";
        let commentaryRef = "";
        let topic = "";

        if (plan.slug === "bible-only") {
          bibleTextMain = `Gênesis ${dayNumber}`;
          topic = `Criação e História - Dia ${dayNumber}`;
        } else if (plan.slug === "prophetic") {
          bibleTextMain = `Gênesis ${dayNumber}`;
          bibleTextDevo = `Salmos ${Math.ceil(dayNumber / 2)}`;
          commentaryAuthor = "Ellen G. White";
          commentaryWork = "Patriarcas e Profetas";
          commentaryRef = `Capítulo ${Math.ceil(dayNumber / 5)}`;
          topic = `Profecia e História - Dia ${dayNumber}`;
        } else if (plan.slug === "classical") {
          bibleTextMain = `Gênesis ${dayNumber}`;
          bibleTextDevo = `Salmos ${Math.ceil(dayNumber / 2)}`;
          commentaryAuthor = "Santo Agostinho";
          commentaryWork = "Confissões";
          commentaryRef = `Livro ${Math.ceil(dayNumber / 30)}`;
          topic = `Teologia Clássica - Dia ${dayNumber}`;
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
              dateDisplay,
              bibleTextMain,
              bibleTextDevo,
              commentaryAuthor,
              commentaryWork,
              commentaryRef,
              topic,
            },
          });
        } else {
          // Create new
          await prisma.dailyReading.create({
            data: {
              planId: plan.id,
              dayNumber,
              dateDisplay,
              bibleTextMain,
              bibleTextDevo,
              commentaryAuthor,
              commentaryWork,
              commentaryRef,
              topic,
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
