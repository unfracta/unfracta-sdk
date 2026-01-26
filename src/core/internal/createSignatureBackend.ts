import type { SignatureBackend } from "./SignatureBackend.js";
import { OqsSignatureBackend } from "./backends/OqsSignatureBackend.js";

/**
 * Creates the default SignatureBackend for the SDK.
 *
 * Current implementation:
 * - Native liboqs backend
 * - ML-DSA-44 (NIST Dilithium)
 */
export function createSignatureBackend(): SignatureBackend {
  return new OqsSignatureBackend();
}
