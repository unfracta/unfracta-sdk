# Unfracta SDK Integration Guide

This guide shows the fastest, lowest-friction path to integrate the SDK and
validate signing/verification behavior.

## Prerequisites

- Node.js 22+ and npm.
- Build step is required (`dist/` output is used below).

## Install and build

```bash
npm install
npm run build
```

## Fastest sanity check

Run the included hello script (no edits required):

```bash
npm run hello
```

This prints the execution plan, verification result, and a short explanation.

Optional environment validation:

```bash
npm run env:check
```

## Post-quantum backend (optional)

PQ signing requires the native liboqs backend. If you need PQ policies enabled:

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

To see PQ enabled in the external example:

```bash
brew install liboqs
cd native/oqs
npm install
cd ../..
cd examples/hello-service
npm start
```

## Minimal usage (package import)

```js
import { UnfractaSDK, Policy } from "unfracta-sdk";

const sdk = new UnfractaSDK();
const encoder = new TextEncoder();

const payload = encoder.encode(JSON.stringify({
  instruction_id: "pi_2026_02_15_0001",
  amount: "25000.00",
  currency: "USD",
  requested_at: new Date().toISOString()
}));

const context = { policy: Policy.HYBRID_PREFERRED };

const envelope = sdk.sign(payload, context);
const verification = sdk.verify(payload, envelope);
const explanation = sdk.explain(context);

console.log("plan:", envelope.execution);
console.log("verify:", verification.valid, verification.verified_with);
console.log("explain:", explanation.summary);
```

If you are running from the repo without installing the package, use:

```js
import { UnfractaSDK, Policy } from "./dist/index.js";
```

## Expected output (shape)

```text
plan: { doClassical: true, doPostQuantum: true, ... }
verify: true oqs-ml-dsa-44
explain: Classical and post-quantum signing will be executed.
```

If PQ is unavailable, you should see a classical-only plan and a classical
verification path.

## Policy migration (no code change)

The payload and SDK call stay identical. Only the policy changes:

```js
// Legacy-only → Hybrid → PQ-only
const context = { policy: Policy.LEGACY_REQUIRED };
// const context = { policy: Policy.HYBRID_PREFERRED };
// const context = { policy: Policy.PQ_REQUIRED };
```

This illustrates the governance layer: policy changes drive cryptographic
behavior without application code changes.

## Five-minute policy paths

Use the same snippet above and only change the policy line.

### Legacy-only (no PQ required)

```js
const context = { policy: Policy.LEGACY_REQUIRED };
```

Expected output shape:

```text
plan: { doClassical: true, doPostQuantum: false, ... }
verify: true ECDSA_P256
```

### Hybrid (PQ when available)

```js
const context = { policy: Policy.HYBRID_PREFERRED };
```

Expected output shape (PQ available):

```text
plan: { doClassical: true, doPostQuantum: true, ... }
verify: true oqs-ml-dsa-44
```

If PQ is unavailable, the verification line should show `ECDSA_P256`.

### PQ-only (end state)

```js
const context = { policy: Policy.PQ_REQUIRED };
```

Expected output shape:

```text
plan: { doClassical: false, doPostQuantum: true, ... }
verify: true oqs-ml-dsa-44
```

If PQ is unavailable, signing will fail closed as expected.

## Policy quick reference

- `LEGACY_REQUIRED` → classical only
- `HYBRID_PREFERRED` → classical + PQ when available
- `PQ_PREFERRED` → PQ preferred, classical fallback
- `PQ_REQUIRED` → PQ only (fail closed if unsupported)

## Troubleshooting

- `Cannot find module dist/...` → run `npm run build`.
- `post-quantum cryptography is not supported` → ensure liboqs is installed and
  `native/oqs` has been built.

## Next steps

- Policy details: `docs/02_POLICY_MODEL.md`
- SDK contract: `docs/05_SDK_CONTRACT.md`
- Demo flow: `docs/04_DEMO_SCRIPT.md`
- Benchmarks: `docs/BENCHMARKS.md`
- External example: `examples/hello-service`

Run the external example:

```bash
cd examples/hello-service
npm install
npm start
```
