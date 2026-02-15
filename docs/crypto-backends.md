# Cryptographic Backends — Design Notes

This document describes the internal cryptographic backend seam used by Unfracta.

It is intended for maintainers and contributors, not SDK consumers.

---

## Purpose

Unfracta separates:
- policy and planning
- execution intent
- cryptographic implementation

Cryptographic backends exist to provide concrete signing and verification
implementations without leaking algorithm-specific concerns into the core SDK.

---

## Backend Responsibilities

A cryptographic backend **must**:

- Implement signing and verification over opaque byte payloads
- Fail closed (explicit failure on error)
- Be deterministic in behaviour selection
- Treat keys and cryptographic material as opaque
- Expose a stable backend identifier

A backend **must not**:

- Influence policy or planning decisions
- Perform algorithm selection outside of its scope
- Modify execution intent
- Leak implementation details into public APIs

---

## Determinism

Determinism in Unfracta applies to:

- policy evaluation
- execution planning
- backend selection

Cryptographic operations themselves may involve randomness, provided that:
- the same backend is selected
- the same algorithm is used
- failure modes are explicit and reproducible

---

## Backend Selection

Backends are selected internally by the `Signer` based on:

- execution intent (classical vs post-quantum)
- runtime capability checks
- SDK configuration (future)

Backend selection is not exposed to consumers.

---

## Extensibility

Adding a new cryptographic algorithm should require:

- implementing a new backend
- registering it internally
- no changes to public SDK APIs
- no changes to planning or policy logic

This design intentionally keeps cryptographic evolution isolated and additive.

---

## Current Backends

- Classical (Node.js crypto, ECDSA P-256)
- Post-quantum (liboqs native backend, ML-DSA-44)

---

## Non-Goals

This document does not define:

- key management strategies
- hardware security modules
- performance optimisations
- algorithm parameter tuning

These concerns are intentionally deferred.
