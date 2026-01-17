import { UnfractaSDK } from "../core/UnfractaSDK.js";
import { Policy } from "../policy/Policy.js";

import { ClassicalECDSA } from "../adapters/ClassicalECDSA.js"; // ✅ real adapter
import { PostQuantumSigner } from "../adapters/PostQuantumSigner.js";

import type { Capabilities } from "../core/Capabilities.js";

const payloadText = "Approve benefit disbursement – Reference #847392";
const payload = new TextEncoder().encode(payloadText);

function print(title: string, obj: unknown) {
  console.log("\n=== " + title + " ===");
  console.log(JSON.stringify(obj, null, 2));
}

/**
 * Verifier environments
 */

const legacyCapabilities: Capabilities = {
  classicalSupported: true,
  postQuantumSupported: false
};

const hybridCapabilities: Capabilities = {
  classicalSupported: true,
  postQuantumSupported: true
};

/**
 * Adapters
 * One real classical adapter shared across environments
 */
const classical = new ClassicalECDSA();
const postQuantum = new PostQuantumSigner(); // still mocked

const legacyEnv = new UnfractaSDK(
  legacyCapabilities,
  classical,
  postQuantum
);

const hybridEnv = new UnfractaSDK(
  hybridCapabilities,
  classical,
  postQuantum
);

// For MVP, PQ-capable verifier == hybrid verifier
const pqEnv = hybridEnv;

/**
 * Signing environment
 * Has both capabilities; policy controls output
 */
const signingEnv = hybridEnv;

/**
 * Part A — Legacy Required
 */
const legacyEnvelope = signingEnv.sign(payload, Policy.LEGACY_REQUIRED);
print("Part A - Sign (legacy_required)", legacyEnvelope);
print("Part A - Verify in legacy-only", legacyEnv.verify(payload, legacyEnvelope));
print("Part A - Verify in hybrid", hybridEnv.verify(payload, legacyEnvelope));
print("Part A - Verify in pq-capable", pqEnv.verify(payload, legacyEnvelope));

/**
 * Part B — Hybrid Preferred
 */
const hybridEnvelope = signingEnv.sign(payload, Policy.HYBRID_PREFERRED);
print("Part B - Sign (hybrid_preferred)", hybridEnvelope);
print("Part B - Verify in legacy-only", legacyEnv.verify(payload, hybridEnvelope));
print("Part B - Verify in hybrid", hybridEnv.verify(payload, hybridEnvelope));
print("Part B - Verify in pq-capable", pqEnv.verify(payload, hybridEnvelope));

/**
 * Part C — PQ Preferred
 */
const pqEnvelope = signingEnv.sign(payload, Policy.PQ_PREFERRED);
print("Part C - Sign (pq_preferred)", pqEnvelope);
print("Part C - Verify in legacy-only", legacyEnv.verify(payload, pqEnvelope));
print("Part C - Verify in hybrid", hybridEnv.verify(payload, pqEnvelope));
print("Part C - Verify in pq-capable", pqEnv.verify(payload, pqEnvelope));
