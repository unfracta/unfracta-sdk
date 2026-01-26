import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
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
   */
  sign(payload: Uint8Array, context: SigningContext): SignatureEnvelope {
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
      version: "v1",
      policy: plan.policy,
      execution,
      signatures,
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Explain the execution decision in human-readable terms.
   */
  explain(context: SigningContext) {
    const plan = this.plan(context);
    const execution = plan.execution;

    const details = execution.log.map(entry => {
      switch (entry.outcome) {
        case "success":
          return `✓ ${entry.reason}`;
        case "unsupported":
          return `⚠ ${entry.reason}`;
        case "failure":
          return `✗ ${entry.reason}`;
        default:
          return entry.reason;
      }
    });

    const summary = execution.doPostQuantum
      ? "Classical and post-quantum signing will be executed."
      : "Classical signing will be executed.";

    return {
      summary,
      details
    };
  }
}
