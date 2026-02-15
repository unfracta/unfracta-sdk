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

## Minimal usage (in-repo)

```js
import { UnfractaSDK } from "./dist/core/UnfractaSDK.js";
import { Policy } from "./dist/policy/Policy.js";

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

## Expected output (shape)

```text
plan: { doClassical: true, doPostQuantum: true, ... }
verify: true oqs_ml_dsa_44
explain: Classical and post-quantum signing will be executed.
```

If PQ is unavailable, you should see a classical-only plan and a classical
verification path.

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
