import { PolicyEngine } from "./PolicyEngine.js";
import type { Capabilities } from "./Capabilities.js";
import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
import type { VerificationResult } from "../model/VerificationResult.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
import { Policy } from "../policy/Policy.js";

import { ClassicalSigner } from "../adapters/ClassicalSigner.js";
import { PostQuantumSigner } from "../adapters/PostQuantumSigner.js";

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
      if (this.verifyWithAdapter(sig, payload, verificationLog)) {
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
      reason: "No signature could be verified in this environment."
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
  ): boolean {
    // Stubbed for now — concrete verification is adapter-specific
    log.push({
      step: "verification_attempt",
      outcome: "skipped",
      reason: `Verification adapter for '${sig.algorithm_identifier}' not yet implemented.`
    });

    return false;
  }
}
