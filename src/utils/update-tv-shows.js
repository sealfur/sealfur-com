// src/utils/update-tv-shows.js
// Re-checks TVDB for status, current season, and current season year
// for all show files in src/tv/, and updates frontmatter in place.
//
// Usage: node src/utils/update-tv-shows.js
// Options:
//   --dry-run   Print what would change without writing files

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TVDB_API_KEY = process.env.TVDB_API_KEY;
const TV_DIR = path.join(__dirname, "../tv");
const DRY_RUN = process.argv.includes("--dry-run");

if (!TVDB_API_KEY) {
  console.error("Error: TVDB_API_KEY is not set in your .env file.");
  process.exit(1);
}

if (DRY_RUN) {
  console.log("Dry run — no files will be written.\n");
}

async function getToken() {
  const response = await fetch("https://api4.thetvdb.com/v4/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: TVDB_API_KEY }),
  });
  const data = await response.json();
  if (!data.data?.token) {
    console.error("Error: Failed to authenticate with TVDB.", data);
    process.exit(1);
  }
  return data.data.token;
}

async function getSeries(token, id) {
  const response = await fetch(
    `https://api4.thetvdb.com/v4/series/${id}/extended`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await response.json();
  return data.data ?? null;
}

function getCurrentSeason(seasons) {
  const aired = seasons
    .filter((s) => s.type?.name === "Aired Order" && s.number > 0)
    .sort((a, b) => b.number - a.number);
  return aired[0] ?? null;
}

function yearFromDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
}

/**
 * Replaces a single frontmatter field value in a raw file string.
 * Handles: boolean, number, and quoted string values.
 */
function replaceFrontmatterField(content, key, newValue) {
  // Match the key at the start of a line, capture everything up to end of line
  const pattern = new RegExp(`^(${key}:\\s*)(.*)$`, "m");
  const replacement =
    typeof newValue === "boolean" || typeof newValue === "number"
      ? `$1${newValue}`
      : `$1${newValue}`;
  return content.replace(pattern, replacement);
}

async function main() {
  const files = fs
    .readdirSync(TV_DIR)
    .filter((f) => f.endsWith(".md") && f !== "index.md" && f !== "timeless.md");

  if (files.length === 0) {
    console.log("No show files found in", TV_DIR);
    return;
  }

  console.log(`Authenticating with TVDB...`);
  const token = await getToken();

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(TV_DIR, file);
    const raw = fs.readFileSync(filePath, "utf-8");

    // Pull thetvdbID from frontmatter
    const idMatch = raw.match(/^thetvdbID:\s*(\d+)/m);
    if (!idMatch) {
      console.warn(`  ⚠ Skipping ${file} — no thetvdbID found`);
      skipped++;
      continue;
    }

    const tvdbId = idMatch[1];
    process.stdout.write(`Checking ${file} (TVDB: ${tvdbId})... `);

    const series = await getSeries(token, tvdbId);
    if (!series) {
      console.log(`FAILED — series not found`);
      failed++;
      continue;
    }

    const newOngoing = series.status?.name !== "Ended";
    const latestSeason = getCurrentSeason(series.seasons || []);
    const newCurrentSeason = latestSeason?.number ?? "";
    const newCurrentSeasonYear = yearFromDate(series.lastAired);

    // Read existing values from frontmatter
    const ongoingMatch = raw.match(/^ongoing:\s*(\S+)/m);
    const seasonMatch = raw.match(/^currentSeason:\s*(\S*)/m);
    const yearMatch = raw.match(/^currentSeasonYear:\s*(\S*)/m);

    const oldOngoing = ongoingMatch ? ongoingMatch[1] === "true" : null;
    const oldSeason = seasonMatch ? seasonMatch[1] : null;
    const oldYear = yearMatch ? yearMatch[1] : null;

    const changes = [];
    if (String(oldOngoing) !== String(newOngoing)) changes.push(`ongoing: ${oldOngoing} → ${newOngoing}`);
    if (String(oldSeason) !== String(newCurrentSeason)) changes.push(`currentSeason: ${oldSeason} → ${newCurrentSeason}`);
    if (String(oldYear) !== String(newCurrentSeasonYear)) changes.push(`currentSeasonYear: ${oldYear} → ${newCurrentSeasonYear}`);

    if (changes.length === 0) {
      console.log(`no changes`);
      skipped++;
      continue;
    }

    console.log(`updating`);
    for (const change of changes) {
      console.log(`    ${change}`);
    }

    if (!DRY_RUN) {
      let newRaw = raw;
      newRaw = replaceFrontmatterField(newRaw, "ongoing", newOngoing);
      newRaw = replaceFrontmatterField(newRaw, "currentSeason", newCurrentSeason);
      newRaw = replaceFrontmatterField(newRaw, "currentSeasonYear", newCurrentSeasonYear);
      fs.writeFileSync(filePath, newRaw, "utf-8");
    }

    updated++;
  }

  console.log(`\nDone. ${updated} updated, ${skipped} unchanged, ${failed} failed.`);
  if (DRY_RUN && updated > 0) {
    console.log("(No files written — remove --dry-run to apply changes.)");
  }
}

main();
