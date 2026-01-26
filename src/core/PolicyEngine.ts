import { Policy } from "../policy/Policy.js";
import type { RuntimeCapabilities } from "./RuntimeCapabilities.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";

export type ExecutionPlan = {
  doClassical: boolean;
  doPostQuantum: boolean;
  log: ExecutionStep[];
};

export class PolicyEngine {
  static plan(policy: Policy, caps: RuntimeCapabilities): ExecutionPlan {
    const log: ExecutionStep[] = [];

    // 1. Record policy intent
    log.push({
      step: "policy_evaluated",
      outcome: "success",
      reason: `Policy '${policy}' evaluated.`
    });

    // 2. Record capability evaluation explicitly
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

    // 3. Classical is a hard requirement for MVP continuity
    if (!caps.classicalSupported) {
      log.push({
        step: "execution_decision",
        outcome: "failure",
        reason: "No valid execution path: classical cryptography is unavailable."
      });

      return { doClassical: false, doPostQuantum: false, log };
    }

    // 4. Policy-specific execution planning
    switch (policy) {
      case Policy.LEGACY_REQUIRED: {
        log.push({
          step: "post_quantum_policy",
          outcome: "skipped",
          reason: "Policy forbids post-quantum signing."
        });

        log.push({
          step: "execution_decision",
          outcome: "success",
          reason: "Executing classical signing only."
        });

        return { doClassical: true, doPostQuantum: false, log };
      }

      case Policy.HYBRID_PREFERRED: {
        if (caps.postQuantumSupported) {
          log.push({
            step: "post_quantum_policy",
            outcome: "success",
            reason: "Hybrid policy allows post-quantum signing."
          });

          log.push({
            step: "execution_decision",
            outcome: "success",
            reason: "Executing classical and post-quantum signing."
          });

          return { doClassical: true, doPostQuantum: true, log };
        }

        log.push({
          step: "post_quantum_policy",
          outcome: "unsupported",
          reason: "Hybrid policy allows PQ, but PQ is unsupported in this environment."
        });

        log.push({
          step: "execution_decision",
          outcome: "success",
          reason: "Executing classical signing only."
        });

        return { doClassical: true, doPostQuantum: false, log };
      }

      case Policy.PQ_PREFERRED: {
        if (caps.postQuantumSupported) {
          log.push({
            step: "post_quantum_policy",
            outcome: "success",
            reason: "Policy prefers post-quantum signing."
          });

          log.push({
            step: "execution_decision",
            outcome: "success",
            reason: "Executing post-quantum signing with classical fallback."
          });

          return { doClassical: true, doPostQuantum: true, log };
        }

        log.push({
          step: "post_quantum_policy",
          outcome: "unsupported",
          reason: "Policy prefers PQ, but PQ is unsupported; falling back to classical."
        });

        log.push({
          step: "execution_decision",
          outcome: "success",
          reason: "Executing classical signing only."
        });

        return { doClassical: true, doPostQuantum: false, log };
      }

      default: {
        // 5. Refuse to guess
        log.push({
          step: "execution_decision",
          outcome: "failure",
          reason: `Unknown policy '${policy}'. Refusing to guess execution behaviour.`
        });

        throw new Error(`Unsupported policy: ${policy}`);
      }
    }
  }
}
