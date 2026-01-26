import type { SigningProfile } from "./SigningProfile.js";

export class Signer {
  sign(profile: SigningProfile, payload: Uint8Array) {
    // MVP placeholder implementation
    return {
      algorithm: profile.kind,
      signature: payload
    };
  }
}
