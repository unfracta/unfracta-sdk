import { SigningProfile } from "./SigningProfile.js";
export interface Signer {
    sign(profile: SigningProfile, payload: Uint8Array): Uint8Array;
}
//# sourceMappingURL=Signer.d.ts.map