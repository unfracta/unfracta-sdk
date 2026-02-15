# Unfracta SDK

**Policy-driven cryptographic signing for the post-quantum transition.**

Unfracta is a policy-driven cryptographic signing SDK designed to preserve **continuity of trust** across **classical, hybrid, and post-quantum environments**.

It enables systems to transition to post-quantum cryptography **gradually and safely**, without breaking existing verifiers, re-signing historical data, or making premature algorithm commitments.

Unfracta is **infrastructure** — not a wallet, not a UI, and not a cryptographic toolkit.

---

## Why Unfracta exists

Most real-world systems cannot move to post-quantum cryptography in a single step.

In practice, environments contain:

- Legacy verifiers that cannot process post-quantum signatures  
- Mixed or partially upgraded runtimes  
- Long-lived signatures that must remain verifiable for years  
- Incremental, policy-driven migrations rather than “flag-day” cutovers  

Existing cryptographic libraries focus on **algorithms**.  
**Unfracta focuses on transition.**

It separates **policy**, **capability**, and **cryptographic execution**, allowing systems to evolve without trust discontinuities.

---

## What Unfracta is

- A **policy-driven signing orchestration layer**
- A **capability-aware execution engine**
- A **deterministic, auditable decision system**
- A **stable SDK interface** spanning classical → hybrid → post-quantum futures

Developers express **intent**, not cryptographic mechanics.

---

## What Unfracta is not

- Not a wallet  
- Not a key manager  
- Not a UI or end-user product  
- Not a low-level cryptography library  
- Not a standards or compliance framework  

These concerns deliberately sit **outside** the SDK.

---

## Core design principles

### 1. Policy over algorithms

Developers choose **policy**, not cryptographic primitives.  
The SDK decides how to fulfil that policy based on environment capabilities.

### 2. Capability-aware execution

Unfracta never attempts an operation the runtime cannot safely support.

### 3. Continuity first

Classical cryptography remains a **first-class baseline**, not a deprecated path.

### 4. Deterministic behaviour

The same inputs always produce the same execution plan.

### 5. Explainability

Every decision is logged, inspectable, and auditable.

### 6. Algorithm agnosticism

No hard dependency on any specific post-quantum scheme.

---

## Supported policies

Unfracta currently supports the following signing policies:

### `LEGACY_REQUIRED`
Classical signatures only.

### `HYBRID_PREFERRED`
Classical + post-quantum signatures when supported.

### `PQ_PREFERRED`
Post-quantum signatures preferred, with classical fallback.

### `PQ_REQUIRED`
Post-quantum signatures only. Fails closed if PQ is unsupported.

Policies are enforced **centrally** and cannot be bypassed by adapters or callers.

---

## How Unfracta works (conceptually)

1. The application declares a signing policy  
2. The runtime declares its cryptographic capabilities  
3. The policy engine derives a deterministic execution plan  
4. Signer adapters execute the plan  
5. Results and decisions are captured in an **audit-grade envelope**

This separation allows the SDK to evolve without breaking applications.

---

## What this SDK does today (MVP)

- Policy-driven signing orchestration  
- Classical and post-quantum adapter abstraction  
- Explicit signing and verification semantics  
- Deterministic execution planning  
- Audit-grade execution and verification logs  
- SDK-level contract tests  
- Executable demo harness  

**Note:** Cryptographic implementations are real, but key management is
intentionally minimal (in-process keys only).

---

## What this SDK does not do (yet)

- Manage keys, identities, or wallets  
- Enforce standards, profiles, or compliance regimes  
- Provide hardware security module (HSM) integrations  

These are **deliberate non-goals** for the MVP.

---

## Demo harness

The repository includes a runnable demo that exercises the SDK across:

- Legacy-only environments  
- Hybrid environments  
- Post-quantum-preferred policies with fallback  
- PQ-only end state  

**Location:**  
`src/demo/runDemo.ts`

---

## Quick start (development)

```bash
npm install
npm run build
npm run demo
npm run bench
```

Note: `npm run demo` runs a build first to keep `dist/` up to date.

## Hello example

Run a minimal signing example:

```bash
npm run hello
```

This executes `scripts/hello.mjs` and prints the execution plan, verification
result, and a short explanation.

## Post-quantum backend (optional, required for PQ policies)

PQ features use liboqs via a native addon. To enable PQ signing:

```bash
brew install liboqs
cd native/oqs
npm install
cd ../..
```

If the native backend is not available:
- `HYBRID_PREFERRED` falls back to classical only
- `PQ_PREFERRED` falls back to classical
- `PQ_REQUIRED` fails closed (no signing path)

---

## Documentation

- Docs index: `docs/README.md`
- Integration guide: `docs/INTEGRATION_GUIDE.md`
- Policy model: `docs/02_POLICY_MODEL.md`
- SDK contract: `docs/05_SDK_CONTRACT.md`
- Demo flow: `docs/04_DEMO_SCRIPT.md`
- Benchmarks: `docs/BENCHMARKS.md`
- Diligence checklist: `docs/DILIGENCE.md`
- Dependencies/licenses: `docs/DEPENDENCIES.md`
- Technical brief: `docs/TECHNICAL_BRIEF.md`

---

## Diligence artifacts

For build/test, SBOM generation, and licensing references, see:

- `docs/DILIGENCE.md`
- `docs/DEPENDENCIES.md`
