# unfracta-sdk

Unfracta is a **policy-driven cryptographic signing SDK** that enables **continuity of trust across pre- and post-quantum environments**.

Unfracta is designed to manage the **transition** to post-quantum cryptography safely.
It does not force premature algorithm choices and does not break legacy verification environments.

Instead, Unfracta introduces a policy-driven execution model that allows systems to:
- Continue using classical cryptography
- Introduce post-quantum signatures when available
- Transition seamlessly between the two without trust discontinuities

This repository is intentionally **SDK-first**:
- Developers choose **policy**, not cryptographic algorithms
- The same interface works across **legacy**, **hybrid**, and **post-quantum** environments
- Unfracta is infrastructure (not a wallet, not a UI product, not a crypto toolkit)

## Why Unfracta exists

Most systems will not transition to post-quantum cryptography in a single step.

Real-world environments contain:
- Legacy verifiers that cannot process PQ signatures
- Hybrid environments with mixed capabilities
- Gradual, policy-driven migrations rather than “flag days”

Unfracta addresses this reality by separating **policy**, **capability**, and **cryptographic execution**.

## Core principles

- **Policy-driven** — Signing behaviour is dictated by explicit policy
- **Capability-aware** — Execution adapts to what the environment supports
- **Continuity-first** — Classical cryptography remains a first-class baseline
- **Explainable** — Every decision is logged and auditable
- **Algorithm-agnostic** — No hard dependency on specific PQ schemes

## Supported policies

- `LEGACY_REQUIRED` — Classical signatures only
- `HYBRID_PREFERRED` — Classical and post-quantum when available
- `PQ_PREFERRED` — Post-quantum preferred, with classical fallback

Policies are enforced centrally and cannot be bypassed.

## Source of truth

The `/docs` folder is authoritative. Implementation must conform to:
- Doctrine
- Policy model
- MVP scope and non-goals
- Demo script
- SDK interface and signature metadata contract

## MVP goal

Demonstrate, end-to-end:
1. Legacy support
2. Post-quantum support
3. **Seamless transition** between the two (no re-signing, no re-platforming)

## What this SDK does today

- Policy-driven signing orchestration
- Classical and post-quantum adapter abstraction
- Explicit verification semantics
- Audit-grade execution and verification logs
- SDK-level contract tests
- Executable demo harness

All cryptographic implementations are **intentionally mocked** at this stage.

## What this SDK does not do (yet)

- Implement real cryptographic algorithms
- Perform cryptographic verification
- Manage keys, identities, or wallets
- Enforce standards or compliance regimes

These are deliberate non-goals for the MVP.

## Demo harness

The repository includes a CLI demo that exercises the SDK across:
- Legacy-only environments
- Hybrid environments
- PQ-preferred policies with fallback

Location: src/demo/runDemo.ts


## Quickstart (dev)

```bash
npm install
npm run build
npm run demo
