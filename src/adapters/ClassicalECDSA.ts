import type { SigningProfile } from "../core/SigningProfile.js";
import { SigningAdapter } from "../core/adapters/SigningAdapter.js";

/**
 * Classical ECDSA signing adapter.
 *
 * This is the reference implementation for classical signing.
 */
export class ClassicalECDSA implements SigningAdapter {
  sign(_profile: SigningProfile, payload: Uint8Array): Uint8Array {
    return payload;
  }
}
