import { SigningContext } from "./types.js";
import { SigningProfile } from "./SigningProfile.js";
export interface PolicyResolver {
    resolve(context: SigningContext): SigningProfile;
}
//# sourceMappingURL=PolicyResolver.d.ts.map