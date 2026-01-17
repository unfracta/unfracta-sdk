import { createSign, createVerify, generateKeyPairSync } from "crypto";
import type { SignerAdapter } from "./SignerAdapter.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";

/**
 * Real classical ECDSA (P-256) adapter.
 * Uses Node.js crypto for signing and verification.
 */
export class ClassicalECDSA implements SignerAdapter {
  algorithmFamily = "classical" as const;
  algorithmIdentifier = "ECDSA_P256";

  private readonly privateKeyPem: string;
  private readonly publicKeyPem: string;

  constructor() {
    const { privateKey, publicKey } = generateKeyPairSync("ec", {
      namedCurve: "prime256v1", // P-256
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" }
    });

    this.privateKeyPem = privateKey;
    this.publicKeyPem = publicKey;
  }

  sign(payload: Uint8Array): SignatureEntry {
    const signer = createSign("SHA256");
    signer.update(payload);
    signer.end();

    const signature = signer.sign(this.privateKeyPem);

    return {
      algorithm_family: this.algorithmFamily,
      algorithm_identifier: this.algorithmIdentifier,
      public_key: this.publicKeyPem,
      signature_bytes: new Uint8Array(signature)
    };
  }

  verify(payload: Uint8Array, signature: SignatureEntry): boolean {
    if (signature.algorithm_identifier !== this.algorithmIdentifier) {
      return false;
    }

    const verifier = createVerify("SHA256");
    verifier.update(payload);
    verifier.end();

    return verifier.verify(
      signature.public_key,
      Buffer.from(signature.signature_bytes)
    );
  }
}
