import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const databaseUrl = process.env.DATABASE_URL ?? "";

const adapter = databaseUrl
  ? new PrismaPg({ connectionString: databaseUrl })
  : undefined;

const prisma = adapter ? new PrismaClient({ adapter }) : new PrismaClient();

// Helper function to parse CSV
function parseCSV(filePath: string): string[][] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter((line) => line.trim());
  return lines.map((line) => line.split(",").map((cell) => cell.trim()));
}

async function main() {
  console.log("🌱 Starting bilingual seed process...\n");

  try {
    // Clean existing data
    console.log("🧹 Cleaning existing data...");
    await prisma.userProgress.deleteMany();
    await prisma.dailyReading.deleteMany();
    await prisma.plan.deleteMany();

    const scriptsDir = __dirname;

    // ──────────────────────────────────────────────
    // PORTUGUESE PLANS
    // ──────────────────────────────────────────────
    console.log("\n📚 Creating Portuguese plans...");

    const bibleBr = await prisma.plan.create({
      data: {
        slug: "bible",
        title: "Bíblia em 1 Ano",
        description: "Leia toda a Bíblia em um ano com um plano cronológico.",
        language: "br",
      },
    });

    const propheticBr = await prisma.plan.create({
      data: {
        slug: "prophetic",
        title: "Plano Profético",
        description:
          "Bíblia + Comentários de Ellen G. White (Espírito de Profecia).",
        language: "br",
      },
    });

    const classicBr = await prisma.plan.create({
      data: {
        slug: "classic",
        title: "Plano Clássico",
        description:
          "Bíblia + Comentários de Pais da Igreja e Teólogos Clássicos.",
        language: "br",
      },
    });

    console.log("✅ Portuguese plans created");

    // ──────────────────────────────────────────────
    // ENGLISH PLANS
    // ──────────────────────────────────────────────
    console.log("\n📚 Creating English plans...");

    const bibleEn = await prisma.plan.create({
      data: {
        slug: "bible",
        title: "Bible in 1 Year",
        description:
          "Read the entire Bible in one year with a chronological plan.",
        language: "en",
      },
    });

    const propheticEn = await prisma.plan.create({
      data: {
        slug: "prophetic",
        title: "Prophetic Plan",
        description: "Bible + Ellen G. White Commentary (Spirit of Prophecy).",
        language: "en",
      },
    });

    const classicEn = await prisma.plan.create({
      data: {
        slug: "classic",
        title: "Classical Plan",
        description:
          "Bible + Church Fathers and Classical Theologians Commentary.",
        language: "en",
      },
    });

    console.log("✅ English plans created");

    // ──────────────────────────────────────────────
    // READINGS
    // ──────────────────────────────────────────────
    console.log("\n📖 Loading readings from CSV files...");

    // BR Bible (2 cols): Date, Bible
    console.log("\n   Loading BR Bible readings...");
    const brBibleCsv = parseCSV(path.join(scriptsDir, "br-bible.csv"));
    const brBibleReadings = [];
    for (let i = 1; i < brBibleCsv.length; i++) {
      const [date, bible] = brBibleCsv[i];
      if (!date || !bible) continue;
      brBibleReadings.push({ planId: bibleBr.id, dayNumber: i, date, bible });
    }
    await prisma.dailyReading.createMany({ data: brBibleReadings });
    console.log(`   ✅ ${bibleBr.title}: ${brBibleReadings.length} readings`);

    // BR Prophetic (4 cols): Date, Bible, Book, Title
    console.log("\n   Loading BR Prophetic readings...");
    const brPropheticCsv = parseCSV(path.join(scriptsDir, "br-prophetic.csv"));
    const brPropheticReadings = [];
    for (let i = 1; i < brPropheticCsv.length; i++) {
      const [date, bible, book, title] = brPropheticCsv[i];
      if (!date) continue;
      brPropheticReadings.push({
        planId: propheticBr.id,
        dayNumber: i,
        date,
        bible: bible || null,
        author: book ? "Ellen G. White" : null,
        book: book || null,
        title: title || null,
      });
    }
    await prisma.dailyReading.createMany({ data: brPropheticReadings });
    console.log(
      `   ✅ ${propheticBr.title}: ${brPropheticReadings.length} readings`,
    );

    // BR Classic (5 cols): Date, Bible, Author, Book, Title
    console.log("\n   Loading BR Classic readings...");
    const brClassicCsv = parseCSV(path.join(scriptsDir, "br-classic.csv"));
    const brClassicReadings = [];
    for (let i = 1; i < brClassicCsv.length; i++) {
      const [date, bible, author, book, title] = brClassicCsv[i];
      if (!date || !bible) continue;
      brClassicReadings.push({
        planId: classicBr.id,
        dayNumber: i,
        date,
        bible,
        author: author || null,
        book: book || null,
        title: title || null,
      });
    }
    await prisma.dailyReading.createMany({ data: brClassicReadings });
    console.log(
      `   ✅ ${classicBr.title}: ${brClassicReadings.length} readings`,
    );

    // EN Bible (2 cols): Date, Bible
    console.log("\n   Loading EN Bible readings...");
    const enBibleCsv = parseCSV(path.join(scriptsDir, "en-bible.csv"));
    const enBibleReadings = [];
    for (let i = 1; i < enBibleCsv.length; i++) {
      const [date, bible] = enBibleCsv[i];
      if (!date || !bible) continue;
      enBibleReadings.push({ planId: bibleEn.id, dayNumber: i, date, bible });
    }
    await prisma.dailyReading.createMany({ data: enBibleReadings });
    console.log(`   ✅ ${bibleEn.title}: ${enBibleReadings.length} readings`);

    // EN Prophetic (4 cols): Date, Bible, Book, Title
    console.log("\n   Loading EN Prophetic readings...");
    const enPropheticCsv = parseCSV(path.join(scriptsDir, "en-prophetic.csv"));
    const enPropheticReadings = [];
    for (let i = 1; i < enPropheticCsv.length; i++) {
      const [date, bible, book, title] = enPropheticCsv[i];
      if (!date) continue;
      enPropheticReadings.push({
        planId: propheticEn.id,
        dayNumber: i,
        date,
        bible: bible || null,
        author: book ? "Ellen G. White" : null,
        book: book || null,
        title: title || null,
      });
    }
    await prisma.dailyReading.createMany({ data: enPropheticReadings });
    console.log(
      `   ✅ ${propheticEn.title}: ${enPropheticReadings.length} readings`,
    );

    // EN Classic (5 cols): Date, Bible, Author, Book, Title
    console.log("\n   Loading EN Classic readings...");
    const enClassicCsv = parseCSV(path.join(scriptsDir, "en-classic.csv"));
    const enClassicReadings = [];
    for (let i = 1; i < enClassicCsv.length; i++) {
      const [date, bible, author, book, title] = enClassicCsv[i];
      if (!date || !bible) continue;
      enClassicReadings.push({
        planId: classicEn.id,
        dayNumber: i,
        date,
        bible,
        author: author || null,
        book: book || null,
        title: title || null,
      });
    }
    await prisma.dailyReading.createMany({ data: enClassicReadings });
    console.log(
      `   ✅ ${classicEn.title}: ${enClassicReadings.length} readings`,
    );

    const total =
      brBibleReadings.length +
      brPropheticReadings.length +
      brClassicReadings.length +
      enBibleReadings.length +
      enPropheticReadings.length +
      enClassicReadings.length;

    console.log("\n🎉 Seed completed!");
    console.log("\n📊 Summary:");
    console.log("   - 6 Plans: bible/prophetic/classic × en/br");
    console.log(`   - ${total} total readings`);
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
