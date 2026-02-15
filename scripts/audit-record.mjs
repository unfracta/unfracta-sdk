import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const AUDIT_PATH = "docs/AUDIT_TRAIL.md";
const SBOM_PATH = "sbom.cdx.json";
const BENCH_DIR = process.env.UNFRACTA_BENCH_DIR ?? "benchmarks";
const TAG = process.env.UNFRACTA_AUDIT_TAG;

function execText(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "utf8" });
  if (result.status !== 0) {
    const message = result.stderr?.toString().trim();
    throw new Error(message || `Command failed: ${cmd} ${args.join(" ")}`);
  }
  return result.stdout.toString().trim();
}

function latestBenchFile() {
  const entries = fs.readdirSync(BENCH_DIR)
    .filter(file => file.endsWith(".json"))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(BENCH_DIR, file)).mtimeMs
    }))
    .sort((a, b) => a.mtime - b.mtime);

  if (entries.length === 0) {
    throw new Error(`No benchmark JSON files found in ${BENCH_DIR}.`);
  }

  return path.join(BENCH_DIR, entries[entries.length - 1].file);
}

if (!fs.existsSync(SBOM_PATH)) {
  throw new Error(`Missing ${SBOM_PATH}. Run npm run sbom first.`);
}

const benchFile = latestBenchFile();
const commit = execText("git", ["rev-parse", "--short", "HEAD"]);
const date = new Date().toISOString().slice(0, 10);

const notes = TAG
  ? `Tagged milestone ${TAG}.`
  : "Artifacts recorded.";

const row = `| ${date} | \`${commit}\` | \`${SBOM_PATH}\` | \`${benchFile}\` and \`docs/BENCHMARKS.md\` | ${notes} |`;

const contents = fs.readFileSync(AUDIT_PATH, "utf8");
const lines = contents.split("\n");
const dividerIndex = lines.findIndex(line => line.startsWith("| ---"));

if (dividerIndex === -1) {
  throw new Error("Audit table header not found in docs/AUDIT_TRAIL.md");
}

lines.splice(dividerIndex + 1, 0, row);
fs.writeFileSync(AUDIT_PATH, `${lines.join("\n")}\n`);

console.log(`Audit trail updated with ${benchFile} and ${SBOM_PATH}.`);
