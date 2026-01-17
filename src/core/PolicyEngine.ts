import { Policy } from "../policy/Policy.js";
import type { Capabilities } from "./Capabilities.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";

export type ExecutionPlan = {
  doClassical: boolean;
  doPostQuantum: boolean;
  log: ExecutionStep[];
};

export class PolicyEngine {
  static plan(policy: Policy, caps: Capabilities): ExecutionPlan {
    const log: ExecutionStep[] = [{
      step: "policy_evaluated",
      outcome: "success",
      reason: `Policy '${policy}' received.`
    }];

    // Classical is a hard requirement for MVP continuity.
    if (!caps.classicalSupported) {
      log.push({ step: "classical_capability", outcome: "unsupported", reason: "Classical crypto not supported in this environment." });
      return { doClassical: false, doPostQuantum: false, log };
    }

    if (policy === Policy.LEGACY_REQUIRED) {
      log.push({ step: "pq_attempt", outcome: "skipped", reason: "Policy forbids post-quantum signing." });
      return { doClassical: true, doPostQuantum: false, log };
    }

    if (policy === Policy.HYBRID_PREFERRED) {
      if (caps.postQuantumSupported) {
        log.push({ step: "pq_attempt", outcome: "success", reason: "PQ supported; hybrid signing enabled." });
        return { doClassical: true, doPostQuantum: true, log };
      }
      log.push({ step: "pq_attempt", outcome: "unsupported", reason: "PQ not supported; proceeding with classical only." });
      return { doClassical: true, doPostQuantum: false, log };
    }

    // PQ_PREFERRED
    if (caps.postQuantumSupported) {
      log.push({ step: "pq_attempt", outcome: "success", reason: "PQ supported; PQ preferred." });
      log.push({ step: "classical_fallback", outcome: "success", reason: "Classical retained as fallback for continuity." });
      return { doClassical: true, doPostQuantum: true, log };
    }

    log.push({ step: "pq_attempt", outcome: "unsupported", reason: "PQ not supported; falling back to classical." });
    return { doClassical: true, doPostQuantum: false, log };
  }
}
