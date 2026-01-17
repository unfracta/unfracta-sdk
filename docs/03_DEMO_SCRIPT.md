# Unfracta MVP Demo Script

## Goal
Demonstrate:
1) legacy support, 2) post-quantum support, 3) seamless transition.

## Payload
"Approve benefit disbursement – Reference #847392"

## Environments
- Legacy-only verifier: PQ unsupported
- Hybrid verifier: PQ optional
- PQ-capable verifier: PQ supported

## Part A — Legacy
- `sign(payload, legacy_required)`
- Verify in all environments → success

## Part B — Hybrid
- `sign(payload, hybrid_preferred)`
- Verify:
  - Legacy-only → classical verified, PQ ignored
  - Hybrid → success
  - PQ-capable → PQ verified (classical retained)

## Part C — PQ-preferred
- `sign(payload, pq_preferred)`
- Verify:
  - Legacy-only → classical fallback verified
  - PQ-capable → PQ verified
