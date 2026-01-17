import type { ExecutionStep } from "../model/ExecutionStep.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";

export class ClassicalSigner {
  sign(payload: Uint8Array, log: ExecutionStep[]): SignatureEntry {
    log.push({
      step: "classical_signing",
      outcome: "success",
      reason: "Classical signing executed (mock implementation)."
    });

    return {
      algorithm_family: "classical",
      algorithm_identifier: "MOCK_CLASSICAL",
      signature_bytes: new Uint8Array([1, 2, 3])
    };
  }
}
