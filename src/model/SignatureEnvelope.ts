import type { Policy } from "../policy/Policy.js";
import type { ExecutionPlan } from "../core/PolicyEngine.js";
import type { ExecutionStep } from "./ExecutionStep.js";
import type { SignatureEntry } from "./SignatureEntry.js";

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
   * Flat execution log for SDK consumers.
   */
  execution_log: ExecutionStep[];

  /**
   * Signatures produced during execution.
   */
  signatures: SignatureEntry[];

  /**
   * Creation timestamp (ISO-8601).
   */
  created_at: string;

  /**
   * Legacy camelCase timestamp for backward compatibility.
   */
  createdAt?: string;
}
