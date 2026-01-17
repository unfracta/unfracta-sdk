import type { SignerAdapter } from "./SignerAdapter.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";

// Mock implementation: deterministic bytes derived from payload.
// Replace with real Dilithium adapter later without changing SDK contracts.
export class MockPostQuantumDilithium implements SignerAdapter {
  algorithmFamily = "post_quantum" as const;
  algorithmIdentifier = "DILITHIUM";

  sign(payload: Uint8Array): SignatureEntry {
    const sig = new Uint8Array(48);
    for (let i = 0; i < sig.length; i++) sig[i] = payload[(payload.length - 1 - (i % payload.length))] ^ 0x5A;
    return { algorithm_family: this.algorithmFamily, algorithm_identifier: this.algorithmIdentifier, signature_bytes: sig };
  }

  verify(payload: Uint8Array, signature: SignatureEntry): boolean {
    if (signature.algorithm_identifier !== this.algorithmIdentifier) return false;
    const expected = this.sign(payload).signature_bytes;
    if (expected.length !== signature.signature_bytes.length) return false;
    for (let i = 0; i < expected.length; i++) if (expected[i] !== signature.signature_bytes[i]) return false;
    return true;
  }
}
