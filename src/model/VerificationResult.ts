import type { ExecutionStep } from "./ExecutionStep.js";

export interface VerificationResult {
  valid: boolean;
  verified_with: string | null;
  verification_log: ExecutionStep[];
}
