import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use process.env to avoid throwing when DATABASE_URL is not set
    url: process.env.DATABASE_URL ?? "",
  },
});
