import { Signer } from "../core/Signer.js";
import type { SigningProfile } from "../core/SigningProfile.js";

export class ClassicalECDSA implements Signer {
  sign(_profile: SigningProfile, payload: Uint8Array): Uint8Array {
    return payload;
  }
}