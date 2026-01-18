# Unfracta SDK Interface & Signature Metadata Contract (MVP)

## SDK Interface (MVP)

- `sign(payload, policy) -> SignatureEnvelope`
- `verify(payload, signatureEnvelope) -> VerificationResult`

The SDK interface is intentionally minimal and policy-driven.
Contextual data may be embedded in the signature envelope but is not part of the core interface.

---

## Supported Policies

- `legacy_required`
- `hybrid_preferred`
- `pq_preferred`

Policy selection determines signing behaviour. Cryptographic algorithms are not user-selectable.

---

## SignatureEnvelope (required fields)

A `SignatureEnvelope` represents the durable output of a signing operation.

Required fields:
- `version` — envelope schema version
- `policy` — policy applied at signing time
- `created_at` — timestamp of signature creation
- `signatures[]` — one or more signature entries
- `execution_log[]` — ordered log of policy evaluation and execution decisions

Optional fields:
- `context` — caller-supplied metadata preserved with the envelope

---

## VerificationResult (required fields)

A `VerificationResult` represents the outcome of an attempted verification.

Required fields:
- `valid` — boolean indicating whether verification succeeded in the current environment
- `verified_with` — identifier of the signature path used, or `null`
- `verification_log[]` — ordered log explaining verification attempts and outcomes

In the MVP, verification semantics may return:
- unsupported
- unimplemented
- refusal-safe failure

Cryptographic verification correctness is intentionally out of scope.

---

## Contract Rule

Policies express intent and risk posture.
Algorithms are implementation details and must not leak into the SDK interface.
