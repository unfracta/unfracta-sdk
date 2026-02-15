import type { SigningContext } from "./types.js";
import type { SigningProfile } from "./SigningProfile.js";
import { Policy } from "../policy/Policy.js";

export class PolicyResolver {
  resolve(context: SigningContext): SigningProfile {
    // MVP: deterministic default policy with optional override
    const policy = context.policy ?? Policy.LEGACY_REQUIRED;

    return {
      kind:
        policy === Policy.LEGACY_REQUIRED
          ? "classical"
          : policy === Policy.PQ_REQUIRED
            ? "post_quantum"
            : "hybrid",
      policy
    };
  }
}
