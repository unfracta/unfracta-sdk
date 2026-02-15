import { UnfractaSDK, Policy } from "unfracta-sdk";

const sdk = new UnfractaSDK();
const encoder = new TextEncoder();

const payload = encoder.encode(JSON.stringify({
  instruction_id: "pi_hello_0001",
  amount: "100.00",
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

if (!envelope.execution.doPostQuantum) {
  console.log("");
  console.log("post-quantum: unavailable");
  console.log("To enable PQ signing:");
  console.log("  brew install liboqs");
  console.log("  cd native/oqs && npm install && cd ../..");
}
