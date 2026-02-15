import fs from "node:fs";
import path from "node:path";

const minMajor = 22;
const override = process.env.UNFRACTA_NODE_VERSION_OVERRIDE;
const version = override ?? process.versions.node;
const major = Number(version.split(".")[0]);

const distPath = path.join("dist");
const pqAddonPath = path.join("native", "oqs", "build", "Release", "oqs_backend.node");

let ok = true;

console.log("Unfracta SDK environment check");
console.log(`- Node: v${version}`);

if (Number.isNaN(major) || major < minMajor) {
  console.log(`✗ Node ${minMajor}+ required.`);
  ok = false;
} else {
  console.log(`✓ Node version is supported (>= ${minMajor}).`);
}

if (fs.existsSync(distPath)) {
  console.log("✓ dist/ is present.");
} else {
  console.log("⚠ dist/ not found. Run: npm run build");
}

if (fs.existsSync(pqAddonPath)) {
  console.log("✓ PQ backend is available (native/oqs built).");
} else {
  console.log("⚠ PQ backend not found. To enable PQ policies:");
  console.log("  - brew install liboqs");
  console.log("  - cd native/oqs && npm install && cd ../..");
}

process.exit(ok ? 0 : 1);
