import { test, describe, strict as assert } from "node:test";
import { PolicyEngine } from "../src/core/PolicyEngine.js";
import { Policy } from "../src/policy/Policy.js";
import type { Capabilities } from "../src/core/Capabilities.js";

describe("PolicyEngine.plan()", () => {

  const classicalOnly: Capabilities = {
    classicalSupported: true,
    postQuantumSupported: false
  };

  const hybridCapable: Capabilities = {
    classicalSupported: true,
    postQuantumSupported: true
  };

  const noClassical: Capabilities = {
    classicalSupported: false,
    postQuantumSupported: true
  };

  test("LEGACY_REQUIRED → classical only", () => {
    const plan = PolicyEngine.plan(Policy.LEGACY_REQUIRED, hybridCapable);

    assert.equal(plan.doClassical, true);
    assert.equal(plan.doPostQuantum, false);

    assert.ok(plan.log.some(l =>
      l.step === "post_quantum_policy" && l.outcome === "skipped"
    ));
  });

  test("HYBRID_PREFERRED with PQ support → classical + PQ", () => {
    const plan = PolicyEngine.plan(Policy.HYBRID_PREFERRED, hybridCapable);

    assert.equal(plan.doClassical, true);
    assert.equal(plan.doPostQuantum, true);

    assert.ok(plan.log.some(l =>
      l.step === "post_quantum_policy" && l.outcome === "success"
    ));
  });

  test("HYBRID_PREFERRED without PQ support → classical only", () => {
    const plan = PolicyEngine.plan(Policy.HYBRID_PREFERRED, classicalOnly);

    assert.equal(plan.doClassical, true);
    assert.equal(plan.doPostQuantum, false);

    assert.ok(plan.log.some(l =>
      l.step === "post_quantum_policy" && l.outcome === "unsupported"
    ));
  });

  test("PQ_PREFERRED with PQ support → PQ + classical fallback", () => {
    const plan = PolicyEngine.plan(Policy.PQ_PREFERRED, hybridCapable);

    assert.equal(plan.doClassical, true);
    assert.equal(plan.doPostQuantum, true);

    assert.ok(plan.log.some(l =>
      l.step === "post_quantum_policy" && l.outcome === "success"
    ));
  });

  test("PQ_PREFERRED without PQ support → fallback to classical", () => {
    const plan = PolicyEngine.plan(Policy.PQ_PREFERRED, classicalOnly);

    assert.equal(plan.doClassical, true);
    assert.equal(plan.doPostQuantum, false);

    assert.ok(plan.log.some(l =>
      l.step === "post_quantum_policy" && l.outcome === "unsupported"
    ));
  });

  test("Classical unsupported → no execution path", () => {
    const plan = PolicyEngine.plan(Policy.HYBRID_PREFERRED, noClassical);

    assert.equal(plan.doClassical, false);
    assert.equal(plan.doPostQuantum, false);

    assert.ok(plan.log.some(l =>
      l.step === "execution_decision" && l.outcome === "failure"
    ));
  });

  test("Unknown policy → throws and refuses to guess", () => {
    assert.throws(() => {
      PolicyEngine.plan("UNKNOWN_POLICY" as Policy, hybridCapable);
    });
  });

});
