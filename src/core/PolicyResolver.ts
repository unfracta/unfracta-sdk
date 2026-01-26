import type { SigningContext } from "./types.js";
import type { SigningProfile } from "./SigningProfile.js";
import { Policy } from "../policy/Policy.js";

export class PolicyResolver {
  resolve(_context: SigningContext): SigningProfile {
    // MVP: deterministic default policy
    const policy = Policy.LEGACY_REQUIRED;

    return {
      kind: "classical",
      policy
    };
  }
}
