import { PolicyResolver } from "../core/PolicyResolver.js";
import { SigningContext } from "../core/types.js";
import { SigningProfile } from "../core/SigningProfile.js";
export declare class DefaultPolicyResolver implements PolicyResolver {
    private readonly defaultProfile;
    constructor(defaultProfile: SigningProfile);
    resolve(_context: SigningContext): SigningProfile;
}
//# sourceMappingURL=DefaultPolicyResolver.d.ts.map