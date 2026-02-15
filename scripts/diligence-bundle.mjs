import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const OUTPUT_ROOT = "releases";
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const bundleName = `diligence-${timestamp}`;
const outDir = path.join(OUTPUT_ROOT, bundleName);

const includeDist = process.env.UNFRACTA_BUNDLE_INCLUDE_DIST === "1";
const includeSrc = process.env.UNFRACTA_BUNDLE_INCLUDE_SRC === "1";
const benchOverride = process.env.UNFRACTA_BUNDLE_BENCH_FILE;

function execText(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "utf8" });
  if (result.status !== 0) {
    const message = result.stderr?.toString().trim();
    throw new Error(message || `Command failed: ${cmd} ${args.join(" ")}`);
  }
  return result.stdout.toString().trim();
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(relativePath, copied) {
  const src = path.resolve(relativePath);
  if (!fs.existsSync(src)) {
    console.warn(`Skipping missing file: ${relativePath}`);
    return;
  }
  const dest = path.join(outDir, relativePath);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  copied.push(relativePath);
}

function copyDir(relativePath, copied) {
  const src = path.resolve(relativePath);
  if (!fs.existsSync(src)) {
    console.warn(`Skipping missing directory: ${relativePath}`);
    return;
  }
  const dest = path.join(outDir, relativePath);
  ensureDir(dest);
  fs.cpSync(src, dest, { recursive: true });
  copied.push(`${relativePath}/`);
}

function latestBenchFile() {
  if (benchOverride) return benchOverride;
  const benchDir = "benchmarks";
  if (!fs.existsSync(benchDir)) return null;
  const entries = fs.readdirSync(benchDir)
    .filter(file => file.endsWith(".json"))
    .map(file => ({
      file,
      mtime: fs.statSync(path.join(benchDir, file)).mtimeMs
    }))
    .sort((a, b) => a.mtime - b.mtime);

  if (entries.length === 0) return null;
  return path.join(benchDir, entries[entries.length - 1].file);
}

ensureDir(outDir);

const copied = [];

const coreFiles = [
  "README.md",
  "CHANGELOG.md",
  "sbom.cdx.json",
  "package.json",
  "docs/README.md",
  "docs/TECHNICAL_BRIEF.md",
  "docs/INTEGRATION_GUIDE.md",
  "docs/02_POLICY_MODEL.md",
  "docs/04_DEMO_SCRIPT.md",
  "docs/05_SDK_CONTRACT.md",
  "docs/DILIGENCE.md",
  "docs/DEPENDENCIES.md",
  "docs/BENCHMARKS.md",
  "docs/AUDIT_TRAIL.md"
];

for (const file of coreFiles) {
  copyFile(file, copied);
}

const benchFile = latestBenchFile();
if (benchFile) {
  copyFile(benchFile, copied);
} else {
  console.warn("No benchmark JSON file found to include.");
}

if (includeDist) copyDir("dist", copied);
if (includeSrc) copyDir("src", copied);

const commit = execText("git", ["rev-parse", "--short", "HEAD"]);
let describe = "";
try {
  describe = execText("git", ["describe", "--tags", "--always"]);
} catch {
  describe = commit;
}

const manifest = [
  "# Diligence Bundle",
  "",
  `- Bundle: ${bundleName}`,
  `- Timestamp: ${new Date().toISOString()}`,
  `- Commit: ${commit}`,
  `- Describe: ${describe}`,
  `- Node: v${process.versions.node}`,
  `- Platform: ${process.platform} ${process.arch}`,
  "",
  "## Contents",
  ...copied.map(item => `- ${item}`),
  ""
].join("\n");

fs.writeFileSync(path.join(outDir, "MANIFEST.md"), `${manifest}\n`);

const tarName = `${bundleName}.tar.gz`;
const tarPath = path.join(OUTPUT_ROOT, tarName);
const tarCheck = spawnSync("tar", ["--version"], { encoding: "utf8" });
if (tarCheck.status === 0) {
  const tarResult = spawnSync(
    "tar",
    ["-czf", tarPath, "-C", OUTPUT_ROOT, bundleName],
    { stdio: "inherit" }
  );
  if (tarResult.status === 0) {
    console.log(`Bundle archived to ${tarPath}`);
  } else {
    console.warn("Failed to create tar.gz archive.");
  }
} else {
  console.warn("tar not available; skipping archive creation.");
}

console.log(`Diligence bundle created at ${outDir}`);
