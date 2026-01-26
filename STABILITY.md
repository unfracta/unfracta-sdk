# Unfracta SDK — Stability Guarantees

This document defines the public stability contract of the Unfracta SDK.

## Stability Philosophy

Unfracta prioritises:
- deterministic behaviour
- explicit policy-driven execution
- forward-compatible design

Public APIs are versioned deliberately. Breaking changes are rare, documented, and gated by major version bumps.

---

## Stable Public API (v1)

The following interfaces are considered **stable** and will not change in a backward-incompatible way within the v1 series:

### Core SDK

- `UnfractaSDK`
  - `plan(context: SigningContext): Plan`
  - `sign(payload: Uint8Array, context: SigningContext): SignatureEnvelope`
  - `explain(context: SigningContext): { summary: string; details: string[] }`

### Models

- `SignatureEnvelope`
- `Plan`
- `Policy`

These types form the contractual boundary between Unfracta and its consumers.

---

## Conditionally Stable

The following areas may evolve as the SDK matures, but will remain backward-compatible where possible:

- Execution log structure
- Signature payload shapes
- Capability detection logic

---

## Internal / Experimental

The following are considered internal implementation details and may change at any time:

- `PolicyEngine`
- `PolicyResolver`
- `Signer`
- Capability providers
- Demo code

Consumers should not rely on these directly.

---

## Versioning

- Patch versions may fix bugs or improve performance.
- Minor versions may add new capabilities.
- Major versions may introduce breaking changes, with migration guidance.

---

## Determinism Guarantee

Given the same:
- `SigningContext`
- runtime capabilities
- SDK version

Unfracta guarantees identical planning decisions and execution behaviour.
