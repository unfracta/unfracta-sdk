import { describe, it, expect } from "vitest";
import { PolicyEngine } from "../src/core/PolicyEngine.js";
import { Policy } from "../src/policy/Policy.js";

describe("PolicyEngine", () => {
  it("produces deterministic plans for the same inputs", () => {
    const caps = { classicalSupported: true, postQuantumSupported: false };

    const planA = PolicyEngine.plan(Policy.HYBRID_PREFERRED, caps);
    const planB = PolicyEngine.plan(Policy.HYBRID_PREFERRED, caps);

    expect(planA).toEqual(planB);
  });

  it("allows PQ_REQUIRED without classical support", () => {
    const caps = { classicalSupported: false, postQuantumSupported: true };
    const plan = PolicyEngine.plan(Policy.PQ_REQUIRED, caps);

    expect(plan.doPostQuantum).toBe(true);
    expect(plan.doClassical).toBe(false);
  });

  it("fails closed when PQ_REQUIRED is unsupported", () => {
    const caps = { classicalSupported: true, postQuantumSupported: false };
    const plan = PolicyEngine.plan(Policy.PQ_REQUIRED, caps);

    expect(plan.doPostQuantum).toBe(false);
    expect(plan.doClassical).toBe(false);
  });
});
