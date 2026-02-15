import { describe, it, expect, vi, afterEach } from "vitest";

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.unmock("../src/core/internal/createSignatureBackend.js");
});

describe("PQ_REQUIRED enforcement", () => {
  it("fails closed when PQ backend is unavailable", async () => {
    vi.doMock("../src/core/internal/createSignatureBackend.js", () => ({
      createSignatureBackend: () => {
        throw new Error("PQ backend unavailable");
      }
    }));

    const { UnfractaSDK } = await import("../src/core/UnfractaSDK.js");
    const { Policy } = await import("../src/policy/Policy.js");

    const sdk = new UnfractaSDK();
    const payload = new Uint8Array([1, 2, 3, 4]);

    const envelope = sdk.sign(payload, { policy: Policy.PQ_REQUIRED });

    expect(envelope.execution.doPostQuantum).toBe(false);
    expect(envelope.execution.doClassical).toBe(false);
    expect(envelope.signatures.length).toBe(0);

    const verification = sdk.verify(payload, envelope);
    expect(verification.valid).toBe(false);
  });

  it("does not fall back to classical verification under PQ_REQUIRED", async () => {
    vi.doMock("../src/core/internal/createSignatureBackend.js", () => ({
      createSignatureBackend: () => ({
        id: "stub-pq",
        publicKey: () => new Uint8Array([1, 2, 3]),
        sign: () => new Uint8Array([9, 9, 9]),
        verify: () => false
      })
    }));

    const { UnfractaSDK } = await import("../src/core/UnfractaSDK.js");
    const { Policy } = await import("../src/policy/Policy.js");

    const sdk = new UnfractaSDK();
    const payload = new Uint8Array([9, 8, 7, 6]);

    const hybridEnvelope = sdk.sign(payload, { policy: Policy.HYBRID_PREFERRED });
    const pqPlan = sdk.plan({ policy: Policy.PQ_REQUIRED });

    const pqRequiredEnvelope = {
      ...hybridEnvelope,
      policy: Policy.PQ_REQUIRED,
      execution: pqPlan.execution,
      execution_log: pqPlan.execution.log
    };

    const verification = sdk.verify(payload, pqRequiredEnvelope);

    expect(verification.valid).toBe(false);
    expect(verification.verified_with).toBe(null);
    expect(
      verification.verification_log.some(step =>
        step.reason.includes("Classical signature verified")
      )
    ).toBe(false);
  });
});
