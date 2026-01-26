import type { ExecutionPlan } from "../core/PolicyEngine.js";
import type { Policy } from "../policy/Policy.js";

/**
 * A deterministic plan describing how the SDK intends to sign a payload.
 *
 * - `policy` is the policy resolved by the PolicyResolver.
 * - `execution` is the execution plan produced by the PolicyEngine,
 *   including decisions and an audit log.
 */
export interface Plan {
  policy: Policy;
  execution: ExecutionPlan;
}
