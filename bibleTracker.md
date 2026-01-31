# Project Specification: Bible Year Tracker App

## 1. Project Overview

A web application designed to guide users through a "Bible in a Year" reading plan. The app offers three distinct tracks: standard biblical reading, a prophetic study (Ellen G. White), and a classical study (Augustine/Aquinas). Users can track their daily progress, manage their profile, and visualize their journey.

## 2. Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling/Components:** Tailwind CSS + Shadcn/UI
- **Database:** PostgreSQL (via Neon Serverless)
- **ORM:** Prisma
- **Authentication:** NextAuth.js (Auth.js) v5

## 3. Database Architecture (Prisma Schema)

Using a relational database is superior to CSVs for tracking user progress. We will use a **Seeding Script** to populate the reading plans from the CSV files into the database.

### Schema Design (`schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// 1. User Management
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Profile Details
  country       String?
  phone         String?
  religion      String?
  age           Int?
  favBook       String?   // Favorite Bible Book
  favVerse      String?   // Favorite Verse Text

  // Relations
  selectedPlanId String?
  selectedPlan   Plan?     @relation(fields: [selectedPlanId], references: [id])
  progress       Progress[]
}

// 2. Reading Plans (The 3 Options)
model Plan {
  id          String         @id @default(cuid())
  slug        String         @unique // 'bible-only', 'prophetic', 'classical'
  title       String
  description String
  readings    DailyReading[]
  users       User[]
}

// 3. The Content (Populated via Seed from CSVs)
model DailyReading {
  id          String   @id @default(cuid())
  planId      String
  plan        Plan     @relation(fields: [planId], references: [id])

  dayNumber   Int      // 1 to 365
  dateDisplay String   // e.g., "January 1"

  // Content Columns
  bibleText1  String?  // Narrative/History
  bibleText2  String?  // Devotional/Wisdom
  extraBook   String?  // E.g., "Patriarchs and Prophets" or "Confessions"
  extraChapter String? // Chapter number or reference
  topic       String?  // Theme of the day

  progress    Progress[]

  @@unique([planId, dayNumber])
  @@index([planId, dayNumber])
}

// 4. Tracking User Progress
model Progress {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  readingId String
  reading   DailyReading @relation(fields: [readingId], references: [id])

  completedAt DateTime @default(now())

  @@unique([userId, readingId]) // User can't mark the same day as completed twice
}
```
