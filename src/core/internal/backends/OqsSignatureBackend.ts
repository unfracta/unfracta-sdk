import path from "path";
import fs from "node:fs";
import { createRequire } from "module";
import { fileURLToPath } from "node:url";
import type { SignatureBackend } from "../SignatureBackend.js";

const require = createRequire(import.meta.url);

// -----------------------------------------------------------------------------
// Native addon loader (ESM-safe)
// -----------------------------------------------------------------------------

function findPackageRoot(startDir: string): string | null {
  let current = startDir;
  while (true) {
    const candidate = path.join(current, "package.json");
    if (fs.existsSync(candidate)) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return null;
    }
    current = parent;
  }
}

function loadOqsAddon(): any {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = findPackageRoot(moduleDir);

  const candidates = [
    path.resolve(process.cwd(), "native/oqs/build/Release/oqs_backend.node"),
    path.resolve(process.cwd(), "build/Release/oqs_backend.node"),
    ...(packageRoot
      ? [
          path.resolve(
            packageRoot,
            "native/oqs/build/Release/oqs_backend.node"
          ),
          path.resolve(packageRoot, "build/Release/oqs_backend.node")
        ]
      : [])
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
  private readonly publicKeyBytes: Buffer;
  private readonly secretKey: Buffer;

  constructor() {
    this.oqs = loadOqsAddon();

    const kp = this.oqs.keypairMLDSA44();
    if (!kp || !Buffer.isBuffer(kp.publicKey) || !Buffer.isBuffer(kp.secretKey)) {
      throw new Error("OQS keypair generation failed");
    }

    this.publicKeyBytes = kp.publicKey;
    this.secretKey = kp.secretKey;
  }

  publicKey(): Uint8Array {
    return Uint8Array.from(this.publicKeyBytes);
  }

  sign(payload: Uint8Array): Uint8Array {
    const sig: Buffer = this.oqs.signMLDSA44(
      Buffer.from(payload),
      this.secretKey
    );
    return new Uint8Array(sig);
  }

  verify(
    payload: Uint8Array,
    signature: Uint8Array,
    publicKey?: Uint8Array
  ): boolean {
    const key = publicKey ? Buffer.from(publicKey) : this.publicKeyBytes;
    return Boolean(
      this.oqs.verifyMLDSA44(
        Buffer.from(payload),
        Buffer.from(signature),
        key
      )
    );
  }
}
