import { UnfractaSDK } from "../core/UnfractaSDK.js";
import type { SigningContext } from "../core/types.js";

// Example payload
const payload = new Uint8Array([1, 2, 3, 4]);

// Example signing context
const context: SigningContext = {
  application: "demo-app",
  environment: "test"
};

// Initialise SDK
const sdk = new UnfractaSDK();

// Execute signing
const result = sdk.sign(payload, context);

console.log("Signing result:");
console.log(JSON.stringify(result, null, 2));
