import type { SigningContext } from "./types.js";
import type { Plan } from "../model/Plan.js";

import { PolicyEngine } from "./PolicyEngine.js";
import { PolicyResolver } from "./PolicyResolver.js";
import { Signer } from "./Signer.js";

export class UnfractaSDK {
  private readonly policyResolver: PolicyResolver;
  private readonly signer: Signer;

  constructor() {
    this.policyResolver = new PolicyResolver();
    this.signer = new Signer();
  }

  /**
   * Produce a deterministic signing plan from context.
   */
  plan(context: SigningContext): Plan {
    const signingProfile = this.policyResolver.resolve(context);

    const execution = PolicyEngine.plan(signingProfile.policy, {
      classicalSupported: true,
      postQuantumSupported: false
    });

    return {
      policy: signingProfile.policy,
      execution
    };
  }

  /**
   * Execute signing according to the execution plan.
   *
   * For MVP:
   * - Classical signing is mandatory
   * - Post-quantum signing is optional
   */
  sign(payload: Uint8Array, context: SigningContext) {
    const plan = this.plan(context);
    const execution = plan.execution;

    const signatures: Record<string, unknown> = {};

    if (execution.doClassical) {
      signatures.classical = this.signer.sign(
        { kind: "classical", policy: plan.policy },
        payload
      );
    }

    if (execution.doPostQuantum) {
      signatures.postQuantum = this.signer.sign(
        { kind: "post_quantum", policy: plan.policy },
        payload
      );
    }

    return {
      signatures,
      log: execution.log
    };
  }
}
