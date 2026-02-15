# Unfracta MVP Demo Script

## Goal

Demonstrate:
1) policy-driven signing,
2) post-quantum readiness,
3) deterministic decision logs,
4) policy migration without code changes.

The demo focuses on **policy-driven orchestration and auditability**.

---

## Payload

Payment instruction (JSON):
- instruction id
- payer / payee account ids
- amount + currency
- reference
- requested_at

---

## Demo Flow

### Part A — Legacy Policy

- `sign(payload, legacy_required)`
- Classical signature generated
- Post-quantum signature excluded by policy
- Verification succeeds using the classical path

### Part B — Hybrid Policy

- `sign(payload, hybrid_preferred)`
- Classical + post-quantum signatures generated together
- Verification prefers post-quantum when available

### Part C — PQ Required (End State)

- `sign(payload, pq_required)`
- Post-quantum signatures only
- Verification uses post-quantum path exclusively

### Migration Demonstration

The payload and API call do not change.
Only the policy value changes:

- `legacy_required` → `hybrid_preferred` → `pq_required`

This is the core governance value proposition.

---

## Output Expectations

The demo prints:
- Execution plan (classical vs PQ)
- Deterministic decision log
- Signature metadata (algorithm ids + lengths)
- Verification result + log

Signature bytes are summarized to keep output human-readable.

Expected algorithm identifiers:
- Classical: `ECDSA_P256`
- Post-quantum: `oqs-ml-dsa-44`
