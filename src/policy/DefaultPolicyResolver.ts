import { PolicyResolver } from "../core/PolicyResolver.js";
import { SigningContext } from "../core/types.js";
import { SigningProfile } from "../core/SigningProfile.js";

export class DefaultPolicyResolver implements PolicyResolver {
  constructor(private readonly defaultProfile: SigningProfile) {}

  resolve(_context: SigningContext): SigningProfile {
    return this.defaultProfile;
  }
}