import { writeFileSync, mkdirSync } from "fs";

const SOURCE_URL =
  "https://raw.githubusercontent.com/ismaelthesilva/veni-bible/main/pt-BR/revelation/json/revelation.json";
const OUT_PATH = "src/content/vbt/revelation.json";

async function main() {
  const url = process.env.VBT_SOURCE_URL ?? SOURCE_URL;
  console.log(`[vbt-sync] Fetching from ${url}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  mkdirSync("src/content/vbt", { recursive: true });
  writeFileSync(OUT_PATH, text, "utf8");
  console.log(`[vbt-sync] Saved to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error("[vbt-sync] Failed:", err);
  process.exit(1);
});
