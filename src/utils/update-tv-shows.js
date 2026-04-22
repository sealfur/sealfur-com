// src/utils/update-tv-shows.js
// Re-checks TVDB for status/season data and TMDB for creator/cast,
// and updates frontmatter in place for all show files in src/tv/.
//
// Usage: node src/utils/update-tv-shows.js
// Options:
//   --dry-run   Print what would change without writing files

require("dotenv").config();
const fs = require("fs");
const path = require("path");

const TVDB_API_KEY = process.env.TVDB_API_KEY;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TV_DIR = path.join(__dirname, "../tv");
const DRY_RUN = process.argv.includes("--dry-run");

if (!TVDB_API_KEY) {
  console.error("Error: TVDB_API_KEY is not set in your .env file.");
  process.exit(1);
}
if (!TMDB_API_KEY) {
  console.error("Error: TMDB_API_KEY is not set in your .env file.");
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

async function tmdbFetch(endpoint) {
  const sep = endpoint.includes("?") ? "&" : "?";
  const response = await fetch(
    `https://api.themoviedb.org/3${endpoint}${sep}api_key=${TMDB_API_KEY}`
  );
  return response.json();
}

async function getTmdbShow(tvdbId) {
  const findData = await tmdbFetch(`/find/${tvdbId}?external_source=tvdb_id`);
  const tmdbId = findData.tv_results?.[0]?.id;
  if (!tmdbId) return null;

  const [details, credits] = await Promise.all([
    tmdbFetch(`/tv/${tmdbId}`),
    tmdbFetch(`/tv/${tmdbId}/aggregate_credits`),
  ]);

  const creator = (details.created_by || []).map((c) => c.name).join(", ");
  const actors = (credits.cast || [])
    .slice(0, 3)
    .map((c) => c.name);

  return { tmdbId, creator, actors };
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

const REQUIRED_FIELDS = [
  "title",
  "yearPremiered",
  "originalCountry",
  "originalLanguage",
  "firstAdded",
  "date",
  "author",
  "network",
  "rating",
  "allTimeRecommendation",
  "ongoing",
  "currentSeason",
  "currentSeasonYear",
  "thetvdbID",
  "themoviedbID",
  "draft",
  "currentlyWatching",
  "creator",
  "actors",
  "summary",
  "layout",
];

const FIELD_DEFAULTS = {
  themoviedbID: "",
  currentlyWatching: false,
  creator: '""',
  actors: "[]",
};

const FIELD_ANCHORS = {
  themoviedbID: "thetvdbID",
  currentlyWatching: "draft",
  creator: "currentlyWatching",
  actors: "creator",
};

function validateFrontmatter(raw, file) {
  const missing = REQUIRED_FIELDS.filter(
    (field) => !new RegExp(`^${field}:`, "m").test(raw)
  );
  if (missing.length) {
    console.warn(`  ⚠ ${file} is missing frontmatter fields: ${missing.join(", ")}`);
  }
  return missing;
}

function insertMissingFields(raw, missingFields) {
  let result = raw;
  for (const field of missingFields) {
    const anchor = FIELD_ANCHORS[field];
    const defaultVal = FIELD_DEFAULTS[field];
    if (!anchor || defaultVal === undefined) continue;
    result = result.replace(
      new RegExp(`^(${anchor}:.*)$`, "m"),
      `$1\n${field}: ${defaultVal}`
    );
  }
  return result;
}

/**
 * Replaces a single frontmatter field value in a raw file string.
 * Handles booleans, numbers, plain strings, and arrays (written as flow YAML).
 */
function replaceFrontmatterField(content, key, newValue) {
  const pattern = new RegExp(`^(${key}:[ \\t]*)(.*)$`, "m");
  let serialized;
  if (Array.isArray(newValue)) {
    serialized = `[${newValue.map((v) => `"${v}"`).join(", ")}]`;
  } else if (typeof newValue === "boolean" || typeof newValue === "number") {
    serialized = String(newValue);
  } else {
    serialized = `"${newValue}"`;
  }
  return content.replace(pattern, `$1${serialized}`);
}

async function main() {
  const files = fs
    .readdirSync(TV_DIR)
    .filter((f) => f.endsWith(".md") && !["index.md", "timeless.md", "watching.md"].includes(f));

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
    let raw = fs.readFileSync(filePath, "utf-8");

    const missingFields = validateFrontmatter(raw, file);
    raw = insertMissingFields(raw, missingFields);

    // Pull thetvdbID from frontmatter
    const idMatch = raw.match(/^thetvdbID:\s*(\d+)/m);
    if (!idMatch) {
      console.warn(`  ⚠ Skipping ${file} — no thetvdbID found`);
      skipped++;
      continue;
    }

    const tvdbId = idMatch[1];
    process.stdout.write(`Checking ${file} (TVDB: ${tvdbId})... `);

    const [series, tmdb] = await Promise.all([
      getSeries(token, tvdbId),
      getTmdbShow(tvdbId),
    ]);

    if (!series) {
      console.log(`FAILED — series not found on TVDB`);
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
    const creatorMatch = raw.match(/^creator:\s*"?([^"\n]*)"?/m);
    const actorsMatch = raw.match(/^actors:\s*(\[.*?\])/m);
    const tmdbIdMatch = raw.match(/^themoviedbID:\s*(\S*)/m);

    const oldOngoing = ongoingMatch ? ongoingMatch[1] === "true" : null;
    const oldSeason = seasonMatch ? seasonMatch[1] : null;
    const oldYear = yearMatch ? yearMatch[1] : null;
    const oldCreator = creatorMatch ? creatorMatch[1].trim() : null;
    const oldActors = actorsMatch ? actorsMatch[1].trim() : null;
    const oldTmdbId = tmdbIdMatch ? tmdbIdMatch[1].trim() : null;

    const creatorIsEmpty = !oldCreator;
    const actorsIsEmpty = !oldActors || oldActors === "[]";

    const changes = [];
    const insertedFields = missingFields.filter((f) => f in FIELD_DEFAULTS);
    if (insertedFields.length) changes.push(`added missing fields: ${insertedFields.join(", ")}`);
    if (String(oldOngoing) !== String(newOngoing)) changes.push(`ongoing: ${oldOngoing} → ${newOngoing}`);
    if (String(oldSeason) !== String(newCurrentSeason)) changes.push(`currentSeason: ${oldSeason} → ${newCurrentSeason}`);
    if (String(oldYear) !== String(newCurrentSeasonYear)) changes.push(`currentSeasonYear: ${oldYear} → ${newCurrentSeasonYear}`);
    if (tmdb) {
      if (String(oldTmdbId) !== String(tmdb.tmdbId)) changes.push(`themoviedbID: ${oldTmdbId || "(empty)"} → ${tmdb.tmdbId}`);
      if (creatorIsEmpty && tmdb.creator) changes.push(`creator: (empty) → "${tmdb.creator}"`);
      if (actorsIsEmpty && tmdb.actors.length) changes.push(`actors: (empty) → [${tmdb.actors.join(", ")}]`);
    } else {
      console.warn(`\n  ⚠ ${file} — not found on TMDB, skipping creator/actors`);
    }

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
      if (tmdb) {
        newRaw = replaceFrontmatterField(newRaw, "themoviedbID", tmdb.tmdbId);
      }
      if (tmdb && creatorIsEmpty && tmdb.creator) {
        newRaw = replaceFrontmatterField(newRaw, "creator", tmdb.creator);
      }
      if (tmdb && actorsIsEmpty && tmdb.actors.length) {
        newRaw = replaceFrontmatterField(newRaw, "actors", tmdb.actors);
      }
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
