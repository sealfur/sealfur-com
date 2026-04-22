#!/usr/bin/env node
// src/utils/batch-add-tv-shows.js
// Reads a markdown list of TV shows with TVDB IDs and creates posts for each.
//
// Usage:
//   node src/utils/batch-add-tv-shows.js <input-file> [--output-dir <path>]
//
// Example:
//   node src/utils/batch-add-tv-shows.js seriesIndexSonarr.md
//   node src/utils/batch-add-tv-shows.js seriesIndexSonarr.md --output-dir src/tv/unpublished
//
// Input file format (one show per line):
//   * Show Title {tvdb-123456}

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

if (!process.env.TVDB_API_KEY) {
  console.error("Error: TVDB_API_KEY is not set in your .env file.");
  process.exit(1);
}
if (!process.env.TMDB_API_KEY) {
  console.error("Error: TMDB_API_KEY is not set in your .env file.");
  process.exit(1);
}

// --- Argument parsing ---
const args = process.argv.slice(2);
let outputDirArg = "src/tv/unpublished"; // default for batch
let inputFile = null;
const filteredArgs = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--output-dir" && args[i + 1]) {
    outputDirArg = args[i + 1];
    i++;
  } else {
    filteredArgs.push(args[i]);
  }
}

inputFile = filteredArgs[0];

if (!inputFile) {
  console.error("Error: Please provide an input file.");
  console.error("Usage: node src/utils/batch-add-tv-shows.js <input-file> [--output-dir <path>]");
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

// --- Parse the input file ---
const content = fs.readFileSync(inputFile, "utf-8");
const lines = content.split("\n");

// Match lines like: * Show Title {tvdb-123456}
const tvdbPattern = /\{tvdb-(\d+)\}/;

const shows = [];
for (const line of lines) {
  const match = line.match(tvdbPattern);
  if (match) {
    // Extract the title by stripping the leading "* " and the {tvdb-...} part
    const title = line
      .replace(/^\*\s*/, "")
      .replace(/\s*\{tvdb-\d+\}.*$/, "")
      .trim();
    const tvdbId = match[1];
    shows.push({ title, tvdbId });
  }
}

if (shows.length === 0) {
  console.error("No shows found in the input file. Check the format: * Show Title {tvdb-123456}");
  process.exit(1);
}

console.log(`Found ${shows.length} shows to process.`);
console.log(`Output directory: ${outputDirArg}`);
console.log("─".repeat(50));

// --- Process each show ---
const addShowScript = path.join(__dirname, "add-tv-show.js");

let succeeded = 0;
let skipped = 0;
let failed = 0;

for (const { title, tvdbId } of shows) {
  console.log(`\n→ ${title} (tvdb-${tvdbId})`);
  try {
    execSync(
      `node "${addShowScript}" ${tvdbId} --output-dir "${outputDirArg}"`,
      { stdio: "inherit" }
    );
    succeeded++;
  } catch (err) {
    // add-tv-show.js exits with 0 for skips, non-zero for real errors
    // execSync throws on non-zero exit
    const exitCode = err.status;
    if (exitCode === 0) {
      skipped++;
    } else {
      console.error(`  ✗ Failed for ${title} (exit code ${exitCode})`);
      failed++;
    }
  }
}

// --- Summary ---
console.log("\n" + "─".repeat(50));
console.log(`Done.`);
console.log(`  ✓ Created:  ${succeeded}`);
console.log(`  ⊘ Skipped:  ${skipped}`);
console.log(`  ✗ Failed:   ${failed}`);
