import type { SigningProfile } from "./SigningProfile.js";
import type { RuntimeCapabilities } from "./RuntimeCapabilities.js";
import { ClassicalECDSA } from "../adapters/ClassicalECDSA.js";
import type { SignatureBackend } from "./internal/SignatureBackend.js";
import { createSignatureBackend } from "./internal/createSignatureBackend.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
import { Policy } from "../policy/Policy.js";

const CLASSICAL_ALGORITHM_ID = "ECDSA_P256";

export class Signer {
  private readonly classical = new ClassicalECDSA();
  private readonly pqBackend?: SignatureBackend;
  private readonly pqAvailable: boolean;

  constructor() {
    let backend: SignatureBackend | undefined;
    let available = false;

    try {
      backend = createSignatureBackend();
      available = true;
    } catch {
      available = false;
    }

    this.pqBackend = backend;
    this.pqAvailable = available;
  }

  capabilities(): RuntimeCapabilities {
    return {
      classicalSupported: true,
      postQuantumSupported: this.pqAvailable
    };
  }

  sign(profile: SigningProfile, payload: Uint8Array): SignatureEntry {
    if (profile.kind === "post_quantum") {
      if (!this.pqBackend) {
        throw new Error("Post-quantum backend unavailable.");
      }

      return {
        algorithm_family: "post_quantum",
        algorithm_identifier: this.pqBackend.id,
        signature_bytes: this.pqBackend.sign(payload),
        public_key: this.pqBackend.publicKey()
      };
    }

    const signature = this.classical.sign(profile, payload);

    return {
      algorithm_family: "classical",
      algorithm_identifier: CLASSICAL_ALGORITHM_ID,
      signature_bytes: signature,
      public_key: this.classical.publicKeyBytes()
    };
  }

  verify(payload: Uint8Array, signature: SignatureEntry): boolean {
    if (signature.algorithm_family === "post_quantum") {
      if (!this.pqBackend) {
        return false;
      }

      return this.pqBackend.verify(
        payload,
        signature.signature_bytes,
        signature.public_key
      );
    }

    if (signature.algorithm_identifier !== CLASSICAL_ALGORITHM_ID) {
      return false;
    }

    return this.classical.verify(
      payload,
      signature.signature_bytes,
      signature.public_key
    );
  }
}
