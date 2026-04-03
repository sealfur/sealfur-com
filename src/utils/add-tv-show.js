// src/utils/add-tv-show.js
// Usage: node src/utils/add-tv-show.js <thetvdb-id> [--output-dir <path>]
// Example: node src/utils/add-tv-show.js 403294
// Example: node src/utils/add-tv-show.js 403294 --output-dir src/tv/unpublished

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TVDB_API_KEY = process.env.TVDB_API_KEY;
const COUNTRIES_FILE = path.join(__dirname, "../_data/countries.json");

// --- Argument parsing ---
// Strip out --output-dir <value> from argv, leaving the series ID behind
const args = process.argv.slice(2);
let outputDirArg = null;
const filteredArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--output-dir" && args[i + 1]) {
    outputDirArg = args[i + 1];
    i++; // skip the next arg (the value)
  } else {
    filteredArgs.push(args[i]);
  }
}

// Default output dir is src/tv/ relative to this script's location
const OUTPUT_DIR = outputDirArg
  ? path.resolve(process.cwd(), outputDirArg)
  : path.join(__dirname, "../tv");

const seriesId = filteredArgs[0];

// --- Validation ---
if (!TVDB_API_KEY) {
  console.error("Error: TVDB_API_KEY is not set in your .env file.");
  process.exit(1);
}

if (!seriesId) {
  console.error("Error: Please provide a TVDB series ID.");
  console.error("Usage: node src/utils/add-tv-show.js <thetvdb-id> [--output-dir <path>]");
  process.exit(1);
}

// --- Helpers ---
async function resolveCountryName(code) {
  if (!code) return "";

  let countries = {};
  if (fs.existsSync(COUNTRIES_FILE)) {
    countries = JSON.parse(fs.readFileSync(COUNTRIES_FILE, "utf-8"));
  }

  const lowerCode = code.toLowerCase();

  if (countries[lowerCode]) {
    return countries[lowerCode];
  }

  console.log(`Looking up country name for "${lowerCode}"...`);
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${lowerCode}`
    );
    const data = await response.json();
    const name = data[0]?.name?.common;
    if (name) {
      countries[lowerCode] = name;
      const sorted = Object.fromEntries(
        Object.entries(countries).sort(([a], [b]) => a.localeCompare(b))
      );
      fs.mkdirSync(path.dirname(COUNTRIES_FILE), { recursive: true });
      fs.writeFileSync(COUNTRIES_FILE, JSON.stringify(sorted, null, 2));
      console.log(`✓ Added "${lowerCode}" → "${name}" to countries.json`);
      return name;
    }
  } catch (err) {
    console.warn(`Warning: Could not look up country "${lowerCode}". Using raw code.`);
  }

  return code;
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
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  if (!data.data) {
    console.error("Error: Series not found.", data);
    process.exit(1);
  }
  return data.data;
}

async function getTranslation(token, id, language) {
  const response = await fetch(
    `https://api4.thetvdb.com/v4/series/${id}/translations/${language}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  return data.data?.name ?? null;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCurrentSeason(seasons) {
  const aired = seasons
    .filter((s) => s.type?.name === "Aired Order" && s.number > 0)
    .sort((a, b) => b.number - a.number);
  return aired[0] || null;
}

function yearFromDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
}

// --- Main ---
async function main() {
  console.log(`Fetching TVDB data for series ID: ${seriesId}...`);
  if (outputDirArg) {
    console.log(`Output directory: ${OUTPUT_DIR}`);
  }

  const token = await getToken();
  const series = await getSeries(token, seriesId);

  const latestSeason = getCurrentSeason(series.seasons || []);
  const currentSeason = latestSeason?.number ?? "";
  const currentSeasonYear = yearFromDate(series.lastAired);
  const ongoing = series.status?.name !== "Ended";
  const originalCountry = await resolveCountryName(series.originalCountry);
  const originalLanguage = series.originalLanguage ?? "";
  const network = series.latestNetwork?.name ?? series.originalNetwork?.name ?? "";
  const yearPremiered = series.firstAired
    ? new Date(series.firstAired).getFullYear()
    : "";

  // Always fetch English title; use series.name as originalTitle if they differ
  const englishTitle = await getTranslation(token, seriesId, "eng") ?? series.name;
  const originalTitle = series.name !== englishTitle ? series.name : null;

  // Slug from English title, falling back to series.name
  const slug = slugify(englishTitle);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  if (fs.existsSync(outputPath)) {
    console.warn(`Warning: File already exists at ${outputPath}`);
    console.warn("Skipping. Delete the file manually if you want to recreate it.");
    process.exit(2);
  }

  const today = new Date().toISOString().split("T")[0];

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const titleLines = originalTitle
    ? `title: "${englishTitle.replace(/"/g, '\\"')}"\noriginalTitle: "${originalTitle.replace(/"/g, '\\"')}"`
    : `title: "${englishTitle.replace(/"/g, '\\"')}"`;

  const frontmatter = `---
${titleLines}
yearPremiered: ${yearPremiered}
originalCountry: "${originalCountry}"
originalLanguage: "${originalLanguage}"
firstAdded: "${today}"
date: "${today}"
author: "Joshua Kinal"
network: "${network}"
rating:
allTimeRecommendation: false
ongoing: ${ongoing}
currentSeason: ${currentSeason}
currentSeasonYear: ${currentSeasonYear}
thetvdbID: ${seriesId}
draft: true
summary: ""
layout: "layouts/tv-show.html"
---

<!-- Your review goes here -->
`;

  fs.writeFileSync(outputPath, frontmatter);
  console.log(`✓ Created ${outputPath}`);
  console.log(`  Now open the file and fill in: rating, allTimeRecommendation, and summary.`);
}

main();
