import { PolicyResolver } from "./PolicyResolver.js";
import { Signer } from "./Signer.js";
import { SigningContext } from "./types.js";
import { Plan } from "../model/Plan.js";

export class UnfractaSDK {
  constructor(
    private readonly policyResolver: PolicyResolver,
    private readonly signer: Signer
  ) {}

  sign(context: SigningContext, payload: Uint8Array): Uint8Array {
    const profile = this.policyResolver.resolve(context);
    return this.signer.sign(profile, payload);
  }

  plan(context: SigningContext): Plan {
    const policy = this.policyResolver.resolve(context);

    return {
      policy,
      paths: ["classical"],
      reasons: {
        classical: "Default MVP signing path"
      }
    };
  }

  explain(context: SigningContext) {
    const plan = this.plan(context);

    const explanation =
      `Signing policy resolved to "${plan.policy}". ` +
      `Planned signing paths: ${plan.paths.join(", ")}.`;

    return {
      plan,
      explanation,
      rationale: plan.reasons
    };
  }
}
