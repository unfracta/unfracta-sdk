import { Policy } from "../policy/Policy.js";
import type { Capabilities } from "./Capabilities.js";
import type { ExecutionStep } from "../model/ExecutionStep.js";
export type ExecutionPlan = {
    doClassical: boolean;
    doPostQuantum: boolean;
    log: ExecutionStep[];
};
export declare class PolicyEngine {
    static plan(policy: Policy, caps: Capabilities): ExecutionPlan;
}
//# sourceMappingURL=PolicyEngine.d.ts.map