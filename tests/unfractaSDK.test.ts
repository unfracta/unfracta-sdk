import { describe, it, expect } from "vitest";
import { UnfractaSDK } from "../src/core/UnfractaSDK.js";
import { Policy } from "../src/policy/Policy.js";

describe("UnfractaSDK signing and verification", () => {
  it("signs and verifies with deterministic logs", () => {
    const sdk = new UnfractaSDK();
    const payload = new Uint8Array([1, 2, 3, 4]);

    const envelope = sdk.sign(payload, { policy: Policy.HYBRID_PREFERRED });
    const plan = sdk.plan({ policy: Policy.HYBRID_PREFERRED });

    expect(envelope.version).toBe("v1");
    expect(envelope.created_at).toBeTruthy();
    expect(envelope.execution_log.length).toBeGreaterThan(0);
    expect(envelope.signatures.length).toBeGreaterThan(0);

    const pq = envelope.signatures.find(
      sig => sig.algorithm_family === "post_quantum"
    );
    if (plan.execution.doPostQuantum && pq) {
      expect(pq.public_key).toBeTruthy();
      expect(pq.public_key?.length).toBeGreaterThan(0);
    }

    const verification = sdk.verify(payload, envelope);
    expect(verification.valid).toBe(true);
    expect(verification.verification_log.length).toBeGreaterThan(0);
  });

  it("enforces PQ_REQUIRED when supported", () => {
    const sdk = new UnfractaSDK();
    const payload = new Uint8Array([9, 8, 7, 6]);

    const plan = sdk.plan({ policy: Policy.PQ_REQUIRED });
    const envelope = sdk.sign(payload, { policy: Policy.PQ_REQUIRED });
    const verification = sdk.verify(payload, envelope);

    if (plan.execution.doPostQuantum && !plan.execution.doClassical) {
      expect(envelope.signatures.length).toBe(1);
      expect(envelope.signatures[0].algorithm_family).toBe("post_quantum");
      expect(verification.valid).toBe(true);
    } else {
      expect(envelope.signatures.length).toBe(0);
      expect(verification.valid).toBe(false);
    }
  });
});
//import { test, describe, strict as assert } from "node:test";

//import { UnfractaSDK } from "../src/core/UnfractaSDK.js";
//import { Policy } from "../src/policy/Policy.js";
//import { ClassicalSigner } from "../src/adapters/ClassicalSigner.js";
//import { PostQuantumSigner } from "../src/adapters/PostQuantumSigner.js";

//import type { Capabilities } from "../src/core/Capabilities.js";

//describe("UnfractaSDK signing and verification flow", () => {

  //const classicalOnly: Capabilities = {
    //classicalSupported: true,
    //postQuantumSupported: false
 // };

 // const hybridCapable: Capabilities = {
   // classicalSupported: true,
   // postQuantumSupported: true
 // };

 // test("LEGACY_REQUIRED → produces classical signature only", () => {
   // const sdk = new UnfractaSDK(
     // hybridCapable,
     // new ClassicalSigner(),
     // new PostQuantumSigner()
   // );

   // const envelope = sdk.sign(
     // new Uint8Array([1, 2, 3]),
     // Policy.LEGACY_REQUIRED
   // );

   // assert.equal(envelope.signatures.length, 1);
   // assert.equal(envelope.signatures[0].algorithm_family, "classical");
 // });

 // test("HYBRID_PREFERRED with PQ support → produces classical and PQ signatures", () => {
   // const sdk = new UnfractaSDK(
     // hybridCapable,
     // new ClassicalSigner(),
     // new PostQuantumSigner()
   // );

   // const envelope = sdk.sign(
     // new Uint8Array([1, 2, 3]),
     // Policy.HYBRID_PREFERRED
   // );

   // assert.equal(envelope.signatures.length, 2);
   // assert.ok(envelope.signatures.some(s => s.algorithm_family === "classical"));
   // assert.ok(envelope.signatures.some(s => s.algorithm_family === "post_quantum"));
 // });

 // test("HYBRID_PREFERRED without PQ support → produces classical only", () => {
   // const sdk = new UnfractaSDK(
     // classicalOnly,
     // new ClassicalSigner(),
     // new PostQuantumSigner()
   // );

  //  const envelope = sdk.sign(
    //  new Uint8Array([1, 2, 3]),
    //  Policy.HYBRID_PREFERRED
   // );

    //assert.equal(envelope.signatures.length, 1);
   // assert.equal(envelope.signatures[0].algorithm_family, "classical");
 // });

  //test("verify() fails safely when no verification adapters are implemented", () => {
    //const sdk = new UnfractaSDK(
     // hybridCapable,
     // new ClassicalSigner(),
     // new PostQuantumSigner()
   // );

    //const envelope = sdk.sign(
      //new Uint8Array([1, 2, 3]),
     // Policy.HYBRID_PREFERRED
   // );

   // const result = sdk.verify(
     // new Uint8Array([1, 2, 3]),
     // envelope
   // );

   // assert.equal(result.valid, false);
   // assert.equal(result.verified_with, null);
 // });

  //test("verification log explains failure reason", () => {
    //const sdk = new UnfractaSDK(
     // hybridCapable,
     // new ClassicalSigner(),
     // new PostQuantumSigner()
   // );

   // const envelope = sdk.sign(
     // new Uint8Array([1, 2, 3]),
     // Policy.HYBRID_PREFERRED
   // );

   // const result = sdk.verify(
     // new Uint8Array([1, 2, 3]),
     // envelope
    //);

   // assert.ok(
     // result.verification_log.some(step =>
      //  step.step === "verification_decision" &&
      //  step.outcome === "failure"
     // )
   // );
 // });
//});
