import { describe, it, expect } from "vitest";
import { spawnSync } from "node:child_process";
import path from "node:path";

const node = process.execPath;
const script = path.resolve("scripts/verify-env.mjs");

describe("env:check script", () => {
  it("passes with the current Node version", () => {
    const result = spawnSync(node, [script], { encoding: "utf8" });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Unfracta SDK environment check");
  });

  it("fails when the override version is unsupported", () => {
    const result = spawnSync(node, [script], {
      encoding: "utf8",
      env: {
        ...process.env,
        UNFRACTA_NODE_VERSION_OVERRIDE: "18.0.0"
      }
    });
    expect(result.status).toBe(1);
    expect(result.stdout).toContain("Node 22+ required");
  });
});
