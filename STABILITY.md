# Stability and API contracts

This repository is the Unfracta SDK MVP (`v0.1.0-mvp`).

The project aims to be easy to adopt and safe to integrate. To achieve that, we separate:

- Contractual principles (stable)
- Public API surface (stabilising)
- Internal implementation (free to evolve)

## Contractual principles (will not change)

These are architectural commitments:

- Policy-driven behaviour (intent over algorithms)
- Capability-aware execution (never attempt unsupported operations)
- Continuity-first (classical support remains first-class)
- Deterministic planning (same inputs produce the same plan)
- Explainable execution (audit-grade logs for decisions)

## Public API stability (what to expect)

During `0.x` versions:

- Public APIs may change with minor versions
- Changes will be documented in release notes
- Breaking changes will be intentional and explicit

Once `1.0.0` is reached:

- Public APIs follow semantic versioning
- Breaking changes only in major versions

## What is considered public API

Public API includes:

- `src/core/*` exported types and classes
- Policy identifiers and policy semantics
- Signature envelope and metadata fields exposed to callers

If you depend on behaviour outside these areas, consider it internal.

## What is explicitly not stable yet

These may change freely in `0.x`:

- Adapter interfaces and naming
- Demo harness structure
- Logging field names (until locked)
- Folder layout under `src/` (except public exports)

## How to propose changes

Please open an issue or PR describing:

- the problem you are solving,
- the affected contract area,
- migration impact and a suggested transition plan.
