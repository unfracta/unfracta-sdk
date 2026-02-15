import { UnfractaSDK } from "../core/UnfractaSDK.js";
import type { SigningContext } from "../core/types.js";
import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
import type { VerificationResult } from "../model/VerificationResult.js";
import { Policy } from "../policy/Policy.js";

type PaymentInstruction = {
  instruction_id: string;
  payer_account: string;
  payee_account: string;
  amount: string;
  currency: string;
  reference: string;
  requested_at: string;
};

const payment: PaymentInstruction = {
  instruction_id: "pi_2026_02_15_0001",
  payer_account: "ACCT-001-7734",
  payee_account: "ACCT-892-1190",
  amount: "25000.00",
  currency: "USD",
  reference: "Invoice 847392",
  requested_at: new Date().toISOString()
};

const payload = new TextEncoder().encode(JSON.stringify(payment));

const baseContext: Omit<SigningContext, "policy"> = {
  application: "payments-api",
  environment: "sandbox",
  purpose: "payment_instruction_signing"
};

const sdk = new UnfractaSDK();

function runPolicy(policy: Policy) {
  const context: SigningContext = { ...baseContext, policy };
  const envelope = sdk.sign(payload, context);
  const verification = sdk.verify(payload, envelope);
  return { envelope, verification, context };
}

function summarizeEnvelope(envelope: SignatureEnvelope) {
  return {
    version: envelope.version,
    policy: envelope.policy,
    execution: {
      doClassical: envelope.execution.doClassical,
      doPostQuantum: envelope.execution.doPostQuantum
    },
    execution_log: envelope.execution_log,
    signatures: envelope.signatures.map(signature => ({
      algorithm_family: signature.algorithm_family,
      algorithm_identifier: signature.algorithm_identifier,
      signature_bytes: signature.signature_bytes.length,
      public_key_bytes: signature.public_key
        ? signature.public_key.length
        : undefined
    })),
    created_at: envelope.created_at
  };
}

function printResult(
  label: string,
  envelope: SignatureEnvelope,
  verification: VerificationResult
) {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(summarizeEnvelope(envelope), null, 2));
  console.log("\nVerification:");
  console.log(JSON.stringify(verification, null, 2));
}

console.log("=== Unfracta Payment Instruction Signing Demo ===");
console.log("Payload:");
console.log(JSON.stringify(payment, null, 2));

const legacy = runPolicy(Policy.LEGACY_REQUIRED);
const hybrid = runPolicy(Policy.HYBRID_PREFERRED);
const pqRequired = runPolicy(Policy.PQ_REQUIRED);

console.log(
  "\nPolicy migration example: same payload, same API, policy change only."
);
printResult("Legacy policy (classical only)", legacy.envelope, legacy.verification);
printResult("Hybrid policy (classical + PQ)", hybrid.envelope, hybrid.verification);
printResult("PQ required (post-quantum only)", pqRequired.envelope, pqRequired.verification);
