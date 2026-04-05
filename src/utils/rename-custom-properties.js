// src/utils/rename-custom-properties.js
// Renames CSS custom properties across all .scss files in src/scss/
// according to the mapping below. Safe to run multiple times — already-renamed
// properties won't match the old names.
//
// Usage:
//   node src/utils/rename-custom-properties.js
//   node src/utils/rename-custom-properties.js --dry-run

const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");
const SCSS_DIR = path.join(__dirname, "../scss");

// Order matters — more specific strings first to avoid partial matches.
// e.g. --white must come after --whitefur
const REPLACEMENTS = [
  // Raw palette colours
  ["--sealblue",      "--clr-sealblue"],
  ["--whitefur",      "--clr-whitefur"],
  ["--arcticnight",   "--clr-arcticnight"],
  ["--royalsuede",    "--clr-royalsuede"],
  ["--newbruise",     "--clr-newbruise"],
  ["--chocolatewine", "--clr-chocolatewine"],
  ["--oceanfloor",    "--clr-oceanfloor"],
  ["--oceangreen",    "--clr-oceangreen"],
  ["--racinggreen",   "--clr-racinggreen"],
  ["--mintgreen",     "--clr-mintgreen"],
  ["--white",         "--clr-white"],

  // Semantic colours
  ["--darkest",   "--color-darkest"],
  ["--lightest",  "--color-lightest"],
  ["--highlight", "--color-highlight"],
  ["--fgcol",     "--color-fg"],
  ["--bgcol",     "--color-bg"],

  // Fonts
  ["--display",   "--font-display"],
  ["--bodycopy",  "--font-body"],

  // Weights
  ["--bold",      "--w-bold"],
  ["--semibold",  "--w-semibold"],
  ["--semilight", "--w-semilight"],
];

function collectScssFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(collectScssFiles(fullPath));
    } else if (entry.name.endsWith(".scss")) {
      results.push(fullPath);
    }
  }
  return results;
}

function applyReplacements(content) {
  let result = content;
  for (const [oldName, newName] of REPLACEMENTS) {
    // Match the property name when used as:
    //   var(--foo)        → inside a var() call
    //   --foo:            → as a declaration (definition in :root / html)
    //   --foo,            → as a fallback inside var()
    // Uses word-boundary-like logic: match oldName only when followed by
    // ), :, ,, or whitespace — not when it's a prefix of a longer name.
    const pattern = new RegExp(
      escapeRegex(oldName) + "(?=[),:\\s])",
      "g"
    );
    result = result.replace(pattern, newName);
  }
  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

if (DRY_RUN) {
  console.log("Dry run — no files will be written.\n");
}

const files = collectScssFiles(SCSS_DIR);
let totalChanges = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf-8");
  const updated = applyReplacements(original);

  if (updated === original) continue;

  const relPath = path.relative(process.cwd(), filePath);

  // Count and display each changed line
  const originalLines = original.split("\n");
  const updatedLines = updated.split("\n");
  const changedLines = [];
  for (let i = 0; i < originalLines.length; i++) {
    if (originalLines[i] !== updatedLines[i]) {
      changedLines.push({
        line: i + 1,
        before: originalLines[i].trim(),
        after: updatedLines[i].trim(),
      });
    }
  }

  console.log(`${relPath} — ${changedLines.length} change(s)`);
  for (const { line, before, after } of changedLines) {
    console.log(`  line ${line}:`);
    console.log(`    - ${before}`);
    console.log(`    + ${after}`);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, updated, "utf-8");
  }

  totalChanges += changedLines.length;
}

console.log(`\n${totalChanges} change(s) across ${files.length} file(s) scanned.`);
if (DRY_RUN && totalChanges > 0) {
  console.log("(No files written — remove --dry-run to apply.)");
}
