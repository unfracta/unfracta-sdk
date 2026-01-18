import type { Policy } from "../policy/Policy.js";
import type { SignatureEntry } from "./SignatureEntry.js";
import type { ExecutionStep } from "./ExecutionStep.js";
export interface SignatureEnvelope {
    version: string;
    policy: Policy;
    created_at: string;
    signatures: SignatureEntry[];
    execution_log: ExecutionStep[];
    context: Record<string, string>;
}
//# sourceMappingURL=SignatureEnvelope.d.ts.map