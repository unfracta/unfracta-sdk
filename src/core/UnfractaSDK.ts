import { PolicyEngine } from "./PolicyEngine.js";
import type { Capabilities } from "./Capabilities.js";
import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
import type { VerificationResult } from "../model/VerificationResult.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
import { Policy } from "../policy/Policy.js";

import { ClassicalSigner } from "../adapters/ClassicalSigner.js";
import { PostQuantumSigner } from "../adapters/PostQuantumSigner.js";

type VerificationOutcome = "verified" | "unsupported" | "unimplemented";

export class UnfractaSDK {

  constructor(
    private readonly capabilities: Capabilities,
    private readonly classicalSigner: ClassicalSigner,
    private readonly postQuantumSigner: PostQuantumSigner
  ) {}

  sign(payload: Uint8Array, policy: Policy): SignatureEnvelope {
    const plan = PolicyEngine.plan(policy, this.capabilities);

    const signatures: SignatureEntry[] = [];
    const executionLog: ExecutionStep[] = [...plan.log];

    if (plan.doClassical) {
      signatures.push(
        this.classicalSigner.sign(payload, executionLog)
      );
    }

    if (plan.doPostQuantum) {
      signatures.push(
        this.postQuantumSigner.sign(payload, executionLog)
      );
    }

    return {
      version: "v1",
      policy,
      created_at: new Date().toISOString(),
      signatures,
      execution_log: executionLog,
      context: {}
    };
  }

  verify(payload: Uint8Array, envelope: SignatureEnvelope): VerificationResult {
    const verificationLog: ExecutionStep[] = [
      {
        step: "verification_started",
        outcome: "success",
        reason: `Verifying envelope created under policy '${envelope.policy}'.`
      }
    ];

    for (const sig of envelope.signatures) {
      const outcome = this.verifyWithAdapter(sig, payload, verificationLog);

      if (outcome === "verified") {
        verificationLog.push({
          step: "verification_decision",
          outcome: "success",
          reason: `Signature verified using ${sig.algorithm_identifier}.`
        });

        return {
          valid: true,
          verified_with: sig.algorithm_identifier,
          verification_log: verificationLog
        };
      }
    }

    verificationLog.push({
      step: "verification_decision",
      outcome: "failure",
      reason: "No verifiable signature available in this environment."
    });

    return {
      valid: false,
      verified_with: null,
      verification_log: verificationLog
    };
  }

  private verifyWithAdapter(
    sig: SignatureEntry,
    payload: Uint8Array,
    log: ExecutionStep[]
  ): VerificationOutcome {

    if (sig.algorithm_family === "classical") {
      if (!this.capabilities.classicalSupported) {
        log.push({
          step: "verification_attempt",
          outcome: "unsupported",
          reason: "Classical verification not supported in this environment."
        });
        return "unsupported";
      }

      log.push({
        step: "verification_attempt",
        outcome: "unimplemented",
        reason: "Classical verification adapter not yet implemented."
      });
      return "unimplemented";
    }

    if (sig.algorithm_family === "post_quantum") {
      if (!this.capabilities.postQuantumSupported) {
        log.push({
          step: "verification_attempt",
          outcome: "unsupported",
          reason: "Post-quantum verification not supported in this environment."
        });
        return "unsupported";
      }

      log.push({
        step: "verification_attempt",
        outcome: "unimplemented",
        reason: "Post-quantum verification adapter not yet implemented."
      });
      return "unimplemented";
    }

    log.push({
      step: "verification_attempt",
      outcome: "failure",
      reason: `Unknown algorithm family '${sig.algorithm_family}'.`
    });

    return "unsupported";
  }
}
