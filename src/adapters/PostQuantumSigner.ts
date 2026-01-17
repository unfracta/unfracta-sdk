import type { ExecutionStep } from "../model/ExecutionStep.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";

export class PostQuantumSigner {
  sign(payload: Uint8Array, log: ExecutionStep[]): SignatureEntry {
    log.push({
      step: "post_quantum_signing",
      outcome: "success",
      reason: "Post-quantum signing executed (mock implementation)."
    });

    return {
      algorithm_family: "post_quantum",
      algorithm_identifier: "MOCK_PQ",
      signature_bytes: new Uint8Array([9, 9, 9])
    };
  }
}
