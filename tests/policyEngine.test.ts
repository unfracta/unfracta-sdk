import test from "node:test";
import assert from "node:assert/strict";
import { Policy } from "../src/policy/Policy.js";
import { PolicyEngine } from "../src/core/PolicyEngine.js";

test("legacy_required forbids PQ even when supported", () => {
  const plan = PolicyEngine.plan(Policy.LEGACY_REQUIRED, { classicalSupported: true, postQuantumSupported: true });
  assert.equal(plan.doClassical, true);
  assert.equal(plan.doPostQuantum, false);
});

test("hybrid_preferred uses PQ when supported", () => {
  const plan = PolicyEngine.plan(Policy.HYBRID_PREFERRED, { classicalSupported: true, postQuantumSupported: true });
  assert.equal(plan.doClassical, true);
  assert.equal(plan.doPostQuantum, true);
});

test("hybrid_preferred falls back to classical when PQ unsupported", () => {
  const plan = PolicyEngine.plan(Policy.HYBRID_PREFERRED, { classicalSupported: true, postQuantumSupported: false });
  assert.equal(plan.doClassical, true);
  assert.equal(plan.doPostQuantum, false);
});
