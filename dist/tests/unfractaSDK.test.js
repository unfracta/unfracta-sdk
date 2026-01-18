import { test, describe, strict as assert } from "node:test";
import { UnfractaSDK } from "../src/core/UnfractaSDK.js";
import { Policy } from "../src/policy/Policy.js";
import { ClassicalSigner } from "../src/adapters/ClassicalSigner.js";
import { PostQuantumSigner } from "../src/adapters/PostQuantumSigner.js";
describe("UnfractaSDK signing and verification flow", () => {
    const classicalOnly = {
        classicalSupported: true,
        postQuantumSupported: false
    };
    const hybridCapable = {
        classicalSupported: true,
        postQuantumSupported: true
    };
    test("LEGACY_REQUIRED → produces classical signature only", () => {
        const sdk = new UnfractaSDK(hybridCapable, new ClassicalSigner(), new PostQuantumSigner());
        const envelope = sdk.sign(new Uint8Array([1, 2, 3]), Policy.LEGACY_REQUIRED);
        assert.equal(envelope.signatures.length, 1);
        assert.equal(envelope.signatures[0].algorithm_family, "classical");
    });
    test("HYBRID_PREFERRED with PQ support → produces classical and PQ signatures", () => {
        const sdk = new UnfractaSDK(hybridCapable, new ClassicalSigner(), new PostQuantumSigner());
        const envelope = sdk.sign(new Uint8Array([1, 2, 3]), Policy.HYBRID_PREFERRED);
        assert.equal(envelope.signatures.length, 2);
        assert.ok(envelope.signatures.some(s => s.algorithm_family === "classical"));
        assert.ok(envelope.signatures.some(s => s.algorithm_family === "post_quantum"));
    });
    test("HYBRID_PREFERRED without PQ support → produces classical only", () => {
        const sdk = new UnfractaSDK(classicalOnly, new ClassicalSigner(), new PostQuantumSigner());
        const envelope = sdk.sign(new Uint8Array([1, 2, 3]), Policy.HYBRID_PREFERRED);
        assert.equal(envelope.signatures.length, 1);
        assert.equal(envelope.signatures[0].algorithm_family, "classical");
    });
    test("verify() fails safely when no verification adapters are implemented", () => {
        const sdk = new UnfractaSDK(hybridCapable, new ClassicalSigner(), new PostQuantumSigner());
        const envelope = sdk.sign(new Uint8Array([1, 2, 3]), Policy.HYBRID_PREFERRED);
        const result = sdk.verify(new Uint8Array([1, 2, 3]), envelope);
        assert.equal(result.valid, false);
        assert.equal(result.verified_with, null);
    });
    test("verification log explains failure reason", () => {
        const sdk = new UnfractaSDK(hybridCapable, new ClassicalSigner(), new PostQuantumSigner());
        const envelope = sdk.sign(new Uint8Array([1, 2, 3]), Policy.HYBRID_PREFERRED);
        const result = sdk.verify(new Uint8Array([1, 2, 3]), envelope);
        assert.ok(result.verification_log.some(step => step.step === "verification_decision" &&
            step.outcome === "failure"));
    });
});
//# sourceMappingURL=unfractaSDK.test.js.map