import { UnfractaSDK } from "../core/UnfractaSDK.js";
import type { SigningContext } from "../core/types.js";

// Example payload
const payload = new Uint8Array([1, 2, 3, 4]);

// Example signing context
const context: SigningContext = {
  application: "demo-app",
  environment: "test"
};

const sdk = new UnfractaSDK();

const result = sdk.sign(payload, context);
const explanation = sdk.explain(context);

console.log("Signing result:");
console.log(JSON.stringify(result, null, 2));

console.log("\nExplanation:");
console.log(explanation.summary);
explanation.details.forEach(line => console.log(line));
