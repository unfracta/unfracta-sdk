import { UnfractaSDK } from "../core/UnfractaSDK.js";
import { DefaultPolicyResolver } from "../policy/DefaultPolicyResolver.js";
import { ClassicalECDSA } from "../adapters/ClassicalECDSA.js";
import { SigningMode } from "../core/types.js";
// ---- Setup ----
// Define a signing profile (policy intent)
const defaultProfile = {
    algorithm: "ECDSA_P256",
    mode: SigningMode.SIGN,
    keyRef: "demo-key-1"
};
// Create resolver + signer
const policyResolver = new DefaultPolicyResolver(defaultProfile);
const signer = new ClassicalECDSA();
// Create SDK
const sdk = new UnfractaSDK(policyResolver, signer);
// ---- Demo payload ----
const payload = new TextEncoder().encode("Hello from Unfracta");
// Optional signing context (metadata only)
const context = {
    application: "demo",
    environment: "local",
    purpose: "example-signing"
};
// ---- Sign ----
const signature = sdk.sign(context, payload);
// ---- Output ----
console.log("Payload:", payload);
console.log("Signature:", signature);
//# sourceMappingURL=runDemo.js.map