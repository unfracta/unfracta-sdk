import path from "path";
import { createRequire } from "module";
import type { SignatureBackend } from "../SignatureBackend.js";

const require = createRequire(import.meta.url);

// -----------------------------------------------------------------------------
// Native addon loader (ESM-safe)
// -----------------------------------------------------------------------------

function loadOqsAddon(): any {
  const candidates = [
    path.resolve(process.cwd(), "native/oqs/build/Release/oqs_backend.node"),
    path.resolve(process.cwd(), "build/Release/oqs_backend.node"),
  ];

  for (const p of candidates) {
    try {
      return require(p);
    } catch {
      /* try next */
    }
  }

  throw new Error(
    "Failed to load oqs_backend.node. " +
    "Expected at native/oqs/build/Release/oqs_backend.node"
  );
}

// -----------------------------------------------------------------------------
// OQS ML-DSA-44 Signature Backend
// -----------------------------------------------------------------------------

export class OqsSignatureBackend implements SignatureBackend {
  public readonly id = "oqs-ml-dsa-44";

  private readonly oqs: any;
  private readonly publicKey: Buffer;
  private readonly secretKey: Buffer;

  constructor() {
    this.oqs = loadOqsAddon();

    const kp = this.oqs.keypairMLDSA44();
    if (!kp || !Buffer.isBuffer(kp.publicKey) || !Buffer.isBuffer(kp.secretKey)) {
      throw new Error("OQS keypair generation failed");
    }

    this.publicKey = kp.publicKey;
    this.secretKey = kp.secretKey;
  }

  sign(payload: Uint8Array): Uint8Array {
    const sig: Buffer = this.oqs.signMLDSA44(
      Buffer.from(payload),
      this.secretKey
    );
    return new Uint8Array(sig);
  }

  verify(payload: Uint8Array, signature: Uint8Array): boolean {
    return Boolean(
      this.oqs.verifyMLDSA44(
        Buffer.from(payload),
        Buffer.from(signature),
        this.publicKey
      )
    );
  }
}
