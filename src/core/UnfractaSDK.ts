import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
import type { SigningContext } from "./types.js";
import type { Plan } from "../model/Plan.js";
import type { VerificationResult } from "../model/VerificationResult.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";
import { Policy } from "../policy/Policy.js";

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

    const execution = PolicyEngine.plan(
      signingProfile.policy,
      this.signer.capabilities()
    );

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

    const signatures: SignatureEntry[] = [];

    if (execution.doClassical) {
      signatures.push(this.signer.sign(
        { kind: "classical", policy: plan.policy },
        payload
      ));
    }

    if (execution.doPostQuantum) {
      signatures.push(this.signer.sign(
        { kind: "post_quantum", policy: plan.policy },
        payload
      ));
    }

    return {
      version: "v1",
      policy: plan.policy,
      execution,
      execution_log: execution.log,
      signatures,
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
  }

  /**
   * Verify a signature envelope against a payload.
   */
  verify(payload: Uint8Array, envelope: SignatureEnvelope): VerificationResult {
    const log: ExecutionStep[] = [];

    log.push({
      step: "verification_policy",
      outcome: "success",
      reason: `Policy '${envelope.policy}' evaluated for verification.`
    });

    const caps = this.signer.capabilities();

    log.push({
      step: "classical_capability",
      outcome: caps.classicalSupported ? "success" : "unsupported",
      reason: caps.classicalSupported
        ? "Classical cryptography is supported."
        : "Classical cryptography is not supported."
    });

    log.push({
      step: "post_quantum_capability",
      outcome: caps.postQuantumSupported ? "success" : "unsupported",
      reason: caps.postQuantumSupported
        ? "Post-quantum cryptography is supported."
        : "Post-quantum cryptography is not supported."
    });

    const signatures = envelope.signatures ?? [];
    const pqSig = signatures.find(sig => sig.algorithm_family === "post_quantum");
    const classicalSig = signatures.find(sig => sig.algorithm_family === "classical");

    let ordered: Array<"post_quantum" | "classical"> = [];
    if (envelope.policy === Policy.LEGACY_REQUIRED) {
      ordered = ["classical"];
    } else if (envelope.policy === Policy.PQ_REQUIRED) {
      ordered = ["post_quantum"];
    } else {
      ordered = ["post_quantum", "classical"];
    }

    for (const family of ordered) {
      if (family === "post_quantum") {
        if (!caps.postQuantumSupported) {
          log.push({
            step: "verification_attempt",
            outcome: "unsupported",
            reason: "Post-quantum verification unavailable in this environment."
          });
          continue;
        }

        if (!pqSig) {
          log.push({
            step: "verification_attempt",
            outcome: "failure",
            reason: "No post-quantum signature present."
          });
          continue;
        }

        if (this.signer.verify(payload, pqSig)) {
          log.push({
            step: "verification_attempt",
            outcome: "success",
            reason: "Post-quantum signature verified."
          });
          return {
            valid: true,
            verified_with: pqSig.algorithm_identifier,
            verification_log: log
          };
        }

        log.push({
          step: "verification_attempt",
          outcome: "failure",
          reason: "Post-quantum verification failed."
        });
        continue;
      }

      if (!caps.classicalSupported) {
        log.push({
          step: "verification_attempt",
          outcome: "unsupported",
          reason: "Classical verification unavailable in this environment."
        });
        continue;
      }

      if (!classicalSig) {
        log.push({
          step: "verification_attempt",
          outcome: "failure",
          reason: "No classical signature present."
        });
        continue;
      }

      if (this.signer.verify(payload, classicalSig)) {
        log.push({
          step: "verification_attempt",
          outcome: "success",
          reason: "Classical signature verified."
        });
        return {
          valid: true,
          verified_with: classicalSig.algorithm_identifier,
          verification_log: log
        };
      }

      log.push({
        step: "verification_attempt",
        outcome: "failure",
        reason: "Classical verification failed."
      });
    }

    log.push({
      step: "verification_decision",
      outcome: "failure",
      reason: "No valid verification path succeeded."
    });

    return {
      valid: false,
      verified_with: null,
      verification_log: log
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

    let summary = "No valid signing path.";
    if (execution.doClassical && execution.doPostQuantum) {
      summary = "Classical and post-quantum signing will be executed.";
    } else if (execution.doPostQuantum && !execution.doClassical) {
      summary = "Post-quantum signing will be executed.";
    } else if (execution.doClassical && !execution.doPostQuantum) {
      summary = "Classical signing will be executed.";
    }

    return {
      summary,
      details
    };
  }
}
