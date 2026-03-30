// src/utils/add-tv-show.js
// Usage: node src/utils/add-tv-show.js <thetvdb-id>
// Example: node src/utils/add-tv-show.js 403294

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TVDB_API_KEY = process.env.TVDB_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "../tv");
const COUNTRIES_FILE = path.join(__dirname, "../_data/countries.json");

async function resolveCountryName(code) {
  if (!code) return "";

  // Load existing countries file, or start fresh
  let countries = {};
  if (fs.existsSync(COUNTRIES_FILE)) {
    countries = JSON.parse(fs.readFileSync(COUNTRIES_FILE, "utf-8"));
  }

  const lowerCode = code.toLowerCase();

  // Already cached — return it
  if (countries[lowerCode]) {
    return countries[lowerCode];
  }

  // Not cached — look it up from REST Countries API
  console.log(`Looking up country name for "${lowerCode}"...`);
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${lowerCode}`
    );
    const data = await response.json();
    const name = data[0]?.name?.common;
    if (name) {
      countries[lowerCode] = name;
      // Sort keys alphabetically and save back to file
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

  // Fallback to raw code if lookup fails
  return code;
}

if (!TVDB_API_KEY) {
  console.error("Error: TVDB_API_KEY is not set in your .env file.");
  process.exit(1);
}

const seriesId = process.argv[2];
if (!seriesId) {
  console.error("Error: Please provide a TVDB series ID.");
  console.error("Usage: node src/utils/add-tv-show.js <thetvdb-id>");
  process.exit(1);
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

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getCurrentSeason(seasons) {
  // Filter to only "Aired Order" seasons, exclude season 0 (specials)
  const aired = seasons
    .filter((s) => s.type?.name === "Aired Order" && s.number > 0)
    .sort((a, b) => b.number - a.number);
  return aired[0] || null;
}

function yearFromDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).getFullYear();
}

async function main() {
  console.log(`Fetching TVDB data for series ID: ${seriesId}...`);

  const token = await getToken();
  const series = await getSeries(token, seriesId);

  const slug = slugify(series.name);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  // Check if file already exists
  if (fs.existsSync(outputPath)) {
    console.warn(`Warning: File already exists at ${outputPath}`);
    console.warn("Skipping. Delete the file manually if you want to recreate it.");
    process.exit(0);
  }

  // Work out current season
  const latestSeason = getCurrentSeason(series.seasons || []);
  const currentSeason = latestSeason?.number ?? "";

  // Derive currentSeasonYear from last aired episode
  const currentSeasonYear = yearFromDate(series.lastAired);

  // Work out if ongoing
  const ongoing = series.status?.name !== "Ended";

  // Get original country — look up full name, cache in countries.json
  const originalCountry = await resolveCountryName(series.originalCountry);

  // Get network
  const network = series.latestNetwork?.name ?? series.originalNetwork?.name ?? "";

  // Build the year premiered
  const yearPremiered = series.firstAired
    ? new Date(series.firstAired).getFullYear()
    : "";

  const today = new Date().toISOString().split("T")[0];

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const frontmatter = `---
title: "${series.name.replace(/"/g, '\\"')}"
yearPremiered: ${yearPremiered}
originalCountry: "${originalCountry}"
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
