import { Policy, UnfractaSDK } from "../index.js";
import { MockClassicalECDSA } from "../adapters/MockClassicalECDSA.js";
import { MockPostQuantumDilithium } from "../adapters/MockPostQuantumDilithium.js";

const payloadText = "Approve benefit disbursement – Reference #847392";
const payload = new TextEncoder().encode(payloadText);

function print(title: string, obj: unknown) {
  console.log("\n=== " + title + " ===");
  console.log(JSON.stringify(obj, null, 2));
}

// Verifier environments
const legacyEnv = new UnfractaSDK({
  version: "0.1.0",
  capabilities: { classicalSupported: true, postQuantumSupported: false },
  classicalAdapter: new MockClassicalECDSA()
});

const hybridEnv = new UnfractaSDK({
  version: "0.1.0",
  capabilities: { classicalSupported: true, postQuantumSupported: true },
  classicalAdapter: new MockClassicalECDSA(),
  postQuantumAdapter: new MockPostQuantumDilithium()
});

const pqEnv = hybridEnv; // same as hybrid for MVP

// Part A — Legacy
const envForSigning = hybridEnv; // signer has both capabilities; policy controls output
const legacyEnvelope = envForSigning.sign(payload, Policy.LEGACY_REQUIRED, { demo: "partA" });
print("Part A - Sign (legacy_required)", legacyEnvelope);
print("Part A - Verify in legacy-only", legacyEnv.verify(payload, legacyEnvelope));
print("Part A - Verify in hybrid", hybridEnv.verify(payload, legacyEnvelope));
print("Part A - Verify in pq-capable", pqEnv.verify(payload, legacyEnvelope));

// Part B — Hybrid
const hybridEnvelope = envForSigning.sign(payload, Policy.HYBRID_PREFERRED, { demo: "partB" });
print("Part B - Sign (hybrid_preferred)", hybridEnvelope);
print("Part B - Verify in legacy-only", legacyEnv.verify(payload, hybridEnvelope));
print("Part B - Verify in hybrid", hybridEnv.verify(payload, hybridEnvelope));
print("Part B - Verify in pq-capable", pqEnv.verify(payload, hybridEnvelope));

// Part C — PQ Preferred
const pqEnvelope = envForSigning.sign(payload, Policy.PQ_PREFERRED, { demo: "partC" });
print("Part C - Sign (pq_preferred)", pqEnvelope);
print("Part C - Verify in legacy-only", legacyEnv.verify(payload, pqEnvelope));
print("Part C - Verify in hybrid", hybridEnv.verify(payload, pqEnvelope));
print("Part C - Verify in pq-capable", pqEnv.verify(payload, pqEnvelope));
