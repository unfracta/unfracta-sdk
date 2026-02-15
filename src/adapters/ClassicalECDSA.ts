import crypto from "crypto";
import type { SigningProfile } from "../core/SigningProfile.js";
import { SigningAdapter } from "../core/adapters/SigningAdapter.js";

/**
 * Classical ECDSA signing adapter.
 *
 * This is the reference implementation for classical signing.
 */
export class ClassicalECDSA implements SigningAdapter {
  private readonly privateKey: crypto.KeyObject;
  private readonly publicKey: crypto.KeyObject;

  constructor() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
      namedCurve: "prime256v1"
    });
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  publicKeyBytes(): Uint8Array {
    const der = this.publicKey.export({ type: "spki", format: "der" });
    return new Uint8Array(der);
  }

  sign(_profile: SigningProfile, payload: Uint8Array): Uint8Array {
    const signature = crypto.sign("sha256", Buffer.from(payload), {
      key: this.privateKey,
      dsaEncoding: "ieee-p1363"
    });
    return new Uint8Array(signature);
  }

  verify(
    payload: Uint8Array,
    signature: Uint8Array,
    publicKeyBytes?: Uint8Array
  ): boolean {
    const key = publicKeyBytes
      ? crypto.createPublicKey({
          key: Buffer.from(publicKeyBytes),
          type: "spki",
          format: "der"
        })
      : this.publicKey;

    return crypto.verify(
      "sha256",
      Buffer.from(payload),
      { key, dsaEncoding: "ieee-p1363" },
      Buffer.from(signature)
    );
  }
}
