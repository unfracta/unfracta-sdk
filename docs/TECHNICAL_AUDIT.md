# Technical Capability Audit

This document audits the implemented technical capabilities of the Unfracta SDK
and links each capability to evidence in the repository.

## Capability map

### 1) Governance & Policy Engine

- **Status:** Implemented
- **Evidence:**
  - `src/core/PolicyEngine.ts`
  - `docs/02_POLICY_MODEL.md`
  - `tests/policyEngine.test.ts`
- **Notes:** Deterministic plan generation with four policies. `PQ_REQUIRED`
  fails closed when post-quantum support is unavailable.

### 2) Signing Orchestration

- **Status:** Implemented
- **Evidence:**
  - `src/core/UnfractaSDK.ts`
  - `src/core/Signer.ts`
  - `docs/05_SDK_CONTRACT.md`
- **Notes:** Clean Policy → Plan → Execution separation with centralized
  orchestration.

### 3) Classical Crypto (ECDSA P-256)

- **Status:** Implemented (real cryptography)
- **Evidence:**
  - `src/adapters/ClassicalECDSA.ts`
- **Notes:** Uses Node.js `crypto` with `prime256v1` and IEEE‑P1363 encoding.
  Public key bytes are included in the signature envelope.

### 4) Post‑Quantum Crypto (ML‑DSA‑44 via liboqs)

- **Status:** Implemented (native optional)
- **Evidence:**
  - `src/core/internal/backends/OqsSignatureBackend.ts`
  - `native/oqs/`
- **Notes:** PQ backend is optional; policies that allow fallback degrade
  gracefully. `PQ_REQUIRED` fails closed.

### 5) Verification Semantics (Policy‑Aware)

- **Status:** Implemented
- **Evidence:**
  - `src/core/UnfractaSDK.ts`
  - `tests/unfractaSDK.pq-required.test.ts`
- **Notes:** Verification order respects policy. No classical fallback under
  `PQ_REQUIRED`.

### 6) Auditability (Logs + Envelope)

- **Status:** Implemented
- **Evidence:**
  - `src/model/SignatureEnvelope.ts`
  - `docs/05_SDK_CONTRACT.md`
  - `tests/unfractaSDK.test.ts`
- **Notes:** Execution and verification logs are ordered and explain decisions.
  Envelope includes policy, execution plan, timestamps, and signature metadata.

### 7) Performance Benchmarks

- **Status:** Implemented
- **Evidence:**
  - `src/bench/runBench.ts`
  - `docs/BENCHMARKS.md`
  - `benchmarks/*.json`
- **Notes:** Benchmarks include median and p95 latencies. Snapshots are stored
  for diligence.

### 8) Diligence Artifacts

- **Status:** Implemented
- **Evidence:**
  - `sbom.cdx.json`
  - `docs/DILIGENCE.md`
  - `docs/DEPENDENCIES.md`
  - `docs/AUDIT_TRAIL.md`
- **Notes:** Audit trail links commits to SBOM and benchmark artifacts.

### 9) Developer Experience

- **Status:** Implemented
- **Evidence:**
  - `docs/INTEGRATION_GUIDE.md`
  - `scripts/hello.mjs`
  - `scripts/verify-env.mjs`
- **Notes:** One‑command validation (`npm run hello`, `npm run env:check`).

### 10) CI + Stability

- **Status:** Implemented
- **Evidence:**
  - `.github/workflows/ci.yml`
  - `.nvmrc`
  - `package.json`
- **Notes:** Node 22 is pinned; CI validates build and tests.

## Known limitations (deliberate scope)

- No key management (HSM/KMS/vault) integration.
- No external identity/PKI management.
- No multi‑runtime SDKs.
- PQ backend is optional and native (liboqs).
- Signature determinism is not enforced (ECDSA/PQ randomness by design).

## Low‑effort, high‑value polish (optional)

1. External integration example that does not rely on `dist/` import paths.
2. Auto‑generated API reference from TypeScript types.
3. Lightweight runtime health check inside the demo (report PQ backend status).
