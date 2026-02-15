# Unfracta SDK — Technical Brief (One Page)

## Summary

Unfracta is a policy-driven signing control layer that governs cryptographic
choices and enables safe, auditable migration from classical to post-quantum
signing without breaking legacy systems.

## What it is

- Deterministic policy engine + signing orchestrator.
- Sits between application logic and cryptographic backends.
- Produces audit-grade envelopes with decision rationale.

## What it is not

- Not a wallet, not a key manager, not a crypto library.
- Not a security platform or compliance framework.

## Problem

Enterprise systems cannot shift to post-quantum cryptography in one step. They
need deterministic policy enforcement, explainable decisions, and a safe path
from classical to hybrid to PQ-only signing.

## Solution overview

- Policy → Plan → Execution separation.
- Capability-aware signing with explicit audit logs.
- Classical + PQ support with policy-driven fallback.
- `PQ_REQUIRED` fails closed when PQ is unavailable.

## Determinism and auditability

- Policy evaluation is deterministic and repeatable.
- Execution and verification include ordered logs with rationale.
- Output envelope includes explicit policy, timestamps, and signature metadata.

## Why teams adopt instead of building

- 6–12 months saved vs implementing a safe policy layer from scratch.
- Reduced migration risk and faster PQ readiness for regulated customers.
- Clear governance narrative instead of ad-hoc crypto wiring.

## Proof points (today)

- Deterministic policy evaluation and explainable execution logs.
- Real classical crypto (ECDSA P-256) + PQ backend (liboqs).
- Stable public API contract and tests.
- Demo shows classical → hybrid → PQ-only end state in one application.
- CI configured for build + test.

## Performance baseline (local)

Environment: Node v24.13.0, darwin arm64, payload 211 bytes.

- Classical sign: avg 0.052 ms, p95 0.080 ms
- Classical verify: avg 0.070 ms, p95 0.097 ms
- Hybrid sign: avg 0.252 ms, p95 0.680 ms
- Hybrid verify: avg 0.048 ms, p95 0.061 ms
- PQ-only sign: avg 0.199 ms, p95 0.365 ms
- PQ-only verify: avg 0.048 ms, p95 0.057 ms

Full benchmark output: `docs/BENCHMARKS.md`.

## Integration posture

- Minimal surface area, policy-first API.
- PQ backend optional with explicit fallback behavior.
- No key management built in (deliberate scope control).

## Diligence artifacts (in repo)

- `docs/DILIGENCE.md` (build/test/demo/bench commands)
- `docs/DEPENDENCIES.md` (license references)
- `sbom.cdx.json` (CycloneDX SBOM)
- `.github/workflows/ci.yml` (build/test CI)

## IP / licensing

- Repo is UNLICENSED (proprietary).
- liboqs: MIT (with upstream subcomponent licenses).
- node-addon-api: MIT.
