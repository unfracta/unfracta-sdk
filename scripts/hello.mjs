import { UnfractaSDK } from "../dist/core/UnfractaSDK.js";
import { Policy } from "../dist/policy/Policy.js";

const sdk = new UnfractaSDK();
const encoder = new TextEncoder();

const payload = encoder.encode(JSON.stringify({
  instruction_id: "pi_2026_02_15_0001",
  amount: "25000.00",
  currency: "USD",
  requested_at: new Date().toISOString()
}));

const context = { policy: Policy.HYBRID_PREFERRED };

const envelope = sdk.sign(payload, context);
const verification = sdk.verify(payload, envelope);
const explanation = sdk.explain(context);

console.log("plan:", envelope.execution);
console.log("verify:", verification.valid, verification.verified_with);
console.log("explain:", explanation.summary);
