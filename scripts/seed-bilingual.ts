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

    // Create Plans in Portuguese
    console.log("\n📚 Creating Portuguese plans...");

    const bibleOnlyPt = await prisma.plan.create({
      data: {
        slug: "bible-only",
        title: "Bíblia em 1 Ano",
        description: "Leia toda a Bíblia em um ano com um plano cronológico.",
        language: "pt",
      },
    });

    const propheticPt = await prisma.plan.create({
      data: {
        slug: "prophetic",
        title: "Plano Profético",
        description:
          "Bíblia + Comentários de Ellen G. White (Espírito de Profecia).",
        language: "pt",
      },
    });

    const classicalPt = await prisma.plan.create({
      data: {
        slug: "classical",
        title: "Plano Clássico",
        description:
          "Bíblia + Comentários de Pais da Igreja e Teólogos Clássicos.",
        language: "pt",
      },
    });

    console.log("✅ Portuguese plans created");

    // Create Plans in English
    console.log("\n📚 Creating English plans...");

    const bibleOnlyEn = await prisma.plan.create({
      data: {
        slug: "bible-only",
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

    const classicalEn = await prisma.plan.create({
      data: {
        slug: "classical",
        title: "Classical Plan",
        description:
          "Bible + Church Fathers and Classical Theologians Commentary.",
        language: "en",
      },
    });

    console.log("✅ English plans created");

    // Load readings from CSV files
    console.log("\n📖 Loading readings from CSV files...");

    const scriptsDir = __dirname;

    // Portuguese Bible Only Plan
    console.log("\n   Loading Portuguese Bible Only readings...");
    const brBibleCsv = parseCSV(path.join(scriptsDir, "br-bible.csv"));
    const brBibleReadings = [];
    for (let i = 1; i < brBibleCsv.length; i++) {
      const [dateDisplay, bibleTextMain] = brBibleCsv[i];
      if (!dateDisplay || !bibleTextMain) continue;

      brBibleReadings.push({
        planId: bibleOnlyPt.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain,
        bibleTextDevo: null,
        commentaryAuthor: null,
        commentaryWork: null,
        commentaryRef: null,
        topic: null,
        language: "pt",
      });
    }
    await prisma.dailyReading.createMany({ data: brBibleReadings });
    console.log(
      `   ✅ ${bibleOnlyPt.title}: ${brBibleReadings.length} readings created`,
    );

    // Portuguese Prophetic Plan
    console.log("\n   Loading Portuguese Prophetic readings...");
    const brPropheticCsv = parseCSV(path.join(scriptsDir, "br-prophetic.csv"));
    const brPropheticReadings = [];
    for (let i = 1; i < brPropheticCsv.length; i++) {
      const [
        dateDisplay,
        bibleTextMain,
        bibleTextDevo,
        commentaryWork,
        commentaryRef,
      ] = brPropheticCsv[i];
      if (!dateDisplay) continue;

      brPropheticReadings.push({
        planId: propheticPt.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain: bibleTextMain || null,
        bibleTextDevo: bibleTextDevo || null,
        commentaryAuthor: commentaryWork ? "Ellen G. White" : null,
        commentaryWork: commentaryWork || null,
        commentaryRef: commentaryRef || null,
        topic: null,
        language: "pt",
      });
    }
    await prisma.dailyReading.createMany({ data: brPropheticReadings });
    console.log(
      `   ✅ ${propheticPt.title}: ${brPropheticReadings.length} readings created`,
    );

    // Portuguese Classical Plan
    console.log("\n   Loading Portuguese Classical readings...");
    const brClassicCsv = parseCSV(path.join(scriptsDir, "br-classic.csv"));
    const brClassicReadings = [];
    for (let i = 1; i < brClassicCsv.length; i++) {
      const [
        dateDisplay,
        bibleTextMain,
        commentaryAuthor,
        commentaryWork,
        topic,
      ] = brClassicCsv[i];
      if (!dateDisplay || !bibleTextMain) continue;

      brClassicReadings.push({
        planId: classicalPt.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain,
        bibleTextDevo: null,
        commentaryAuthor: commentaryAuthor || null,
        commentaryWork: commentaryWork || null,
        commentaryRef: null,
        topic: topic || null,
        language: "pt",
      });
    }
    await prisma.dailyReading.createMany({ data: brClassicReadings });
    console.log(
      `   ✅ ${classicalPt.title}: ${brClassicReadings.length} readings created`,
    );

    // English Bible Only Plan
    console.log("\n   Loading English Bible Only readings...");
    const enBibleCsv = parseCSV(path.join(scriptsDir, "en-bible.csv"));
    const enBibleReadings = [];
    for (let i = 1; i < enBibleCsv.length; i++) {
      const [dateDisplay, bibleTextMain] = enBibleCsv[i];
      if (!dateDisplay || !bibleTextMain) continue;

      enBibleReadings.push({
        planId: bibleOnlyEn.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain,
        bibleTextDevo: null,
        commentaryAuthor: null,
        commentaryWork: null,
        commentaryRef: null,
        topic: null,
        language: "en",
      });
    }
    await prisma.dailyReading.createMany({ data: enBibleReadings });
    console.log(
      `   ✅ ${bibleOnlyEn.title}: ${enBibleReadings.length} readings created`,
    );

    // English Prophetic Plan
    console.log("\n   Loading English Prophetic readings...");
    const enPropheticCsv = parseCSV(path.join(scriptsDir, "en-prophetic.csv"));
    const enPropheticReadings = [];
    for (let i = 1; i < enPropheticCsv.length; i++) {
      const [
        dateDisplay,
        bibleTextMain,
        bibleTextDevo,
        commentaryWork,
        commentaryRef,
      ] = enPropheticCsv[i];
      if (!dateDisplay) continue;

      enPropheticReadings.push({
        planId: propheticEn.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain: bibleTextMain || null,
        bibleTextDevo: bibleTextDevo || null,
        commentaryAuthor: commentaryWork ? "Ellen G. White" : null,
        commentaryWork: commentaryWork || null,
        commentaryRef: commentaryRef || null,
        topic: null,
        language: "en",
      });
    }
    await prisma.dailyReading.createMany({ data: enPropheticReadings });
    console.log(
      `   ✅ ${propheticEn.title}: ${enPropheticReadings.length} readings created`,
    );

    // English Classical Plan
    console.log("\n   Loading English Classical readings...");
    const enClassicCsv = parseCSV(path.join(scriptsDir, "en-classic.csv"));
    const enClassicReadings = [];
    for (let i = 1; i < enClassicCsv.length; i++) {
      const [
        dateDisplay,
        bibleTextMain,
        commentaryAuthor,
        commentaryWork,
        topic,
      ] = enClassicCsv[i];
      if (!dateDisplay || !bibleTextMain) continue;

      enClassicReadings.push({
        planId: classicalEn.id,
        dayNumber: i,
        dateDisplay,
        bibleTextMain,
        bibleTextDevo: null,
        commentaryAuthor: commentaryAuthor || null,
        commentaryWork: commentaryWork || null,
        commentaryRef: null,
        topic: topic || null,
        language: "en",
      });
    }
    await prisma.dailyReading.createMany({ data: enClassicReadings });
    console.log(
      `   ✅ ${classicalEn.title}: ${enClassicReadings.length} readings created`,
    );

    const totalReadings =
      brBibleReadings.length +
      brPropheticReadings.length +
      brClassicReadings.length +
      enBibleReadings.length +
      enPropheticReadings.length +
      enClassicReadings.length;

    console.log("\n🎉 Bilingual seed completed successfully!");
    console.log("\n📊 Summary:");
    console.log("   - 6 Plans created (3 PT + 3 EN)");
    console.log(`   - ${totalReadings} Readings created from CSV files`);
    console.log("   - Ready for bilingual Bible tracking!");
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
