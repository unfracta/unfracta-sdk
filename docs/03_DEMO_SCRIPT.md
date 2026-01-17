# Unfracta MVP Demo Script

## Goal

Demonstrate:
1) legacy compatibility,
2) post-quantum readiness,
3) seamless transition behaviour across mixed environments.

The demo focuses on **policy-driven signing and verification semantics**, not cryptographic correctness.

---

## Payload

"Approve benefit disbursement – Reference #847392"

---

## Environments

- Legacy-only verifier: post-quantum unsupported
- Hybrid verifier: post-quantum optional
- PQ-capable verifier: post-quantum supported

Each environment evaluates the same signed envelope based on its own capabilities.

---

## Part A — Legacy

- `sign(payload, legacy_required)`
- Classical signature generated
- Post-quantum signature explicitly excluded by policy

Verification behaviour:
- All environments attempt verification
- Legacy path remains compatible everywhere
- Verification outcomes are explainable and refusal-safe

---

## Part B — Hybrid

- `sign(payload, hybrid_preferred)`
- Classical and post-quantum signatures generated together

Verification behaviour:
- Legacy-only environment ignores PQ signature and evaluates classical path
- Hybrid and PQ-capable environments recognise both signatures
- Verification semantics demonstrate continuity without requiring capability symmetry

---

## Part C — PQ-Preferred

- `sign(payload, pq_preferred)`
- Post-quantum signature preferred, classical retained as fallback

Verification behaviour:
- Legacy-only environment evaluates classical fallback path
- PQ-capable environment prefers post-quantum path
- No verification attempt fails solely due to lack of PQ support

---

## Key Demonstration Outcome

The same signed envelope:
- Survives across heterogeneous environments
- Preserves legacy trust
- Enables post-quantum readiness
- Requires no re-signing or code changes

Cryptographic verification is intentionally mocked; the demo proves **orchestration, policy enforcement, and transition safety**.
