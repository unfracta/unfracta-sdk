import type { Policy } from "../policy/Policy.js";
import type { ExecutionPlan } from "../core/PolicyEngine.js";

export interface SignatureEnvelope {
  /**
   * Schema version for forward compatibility.
   */
  version: "v1";

  /**
   * Policy that governed execution.
   */
  policy: Policy;

  /**
   * Execution plan and audit log.
   */
  execution: ExecutionPlan;

  /**
   * Signatures produced during execution.
   */
  signatures: Record<string, unknown>;

  /**
   * Creation timestamp (ISO-8601).
   */
  createdAt: string;
}

