# Unfracta SDK API (Reference)

This document summarizes the public API surface and data contracts for the
SDK. For full contract details, see `docs/05_SDK_CONTRACT.md`.

## Class: `UnfractaSDK`

### `plan(context: SigningContext): Plan`

Produces a deterministic execution plan.

### `sign(payload: Uint8Array, context: SigningContext): SignatureEnvelope`

Signs the payload according to the resolved policy and returns a signed
`SignatureEnvelope` with execution logs and signatures.

### `verify(payload: Uint8Array, envelope: SignatureEnvelope): VerificationResult`

Verifies a payload against a signature envelope. The verification order is
policy-aware and will not fall back to classical verification under
`PQ_REQUIRED`.

### `explain(context: SigningContext): { summary: string; details: string[] }`

Returns a human-readable summary and details of the policy decision.

## Types

### `SigningContext`

```ts
{
  application?: string;
  environment?: string;
  userId?: string;
  purpose?: string;
  policy?: Policy;
}
```

### `Plan`

```ts
{
  policy: Policy;
  execution: ExecutionPlan;
}
```

### `ExecutionPlan`

```ts
{
  doClassical: boolean;
  doPostQuantum: boolean;
  log: ExecutionStep[];
}
```

### `ExecutionStep`

```ts
{
  step: string;
  outcome: "success" | "failure" | "unsupported" | "skipped";
  reason: string;
}
```

### `SignatureEnvelope`

```ts
{
  version: "v1";
  policy: Policy;
  execution: ExecutionPlan;
  execution_log: ExecutionStep[];
  signatures: SignatureEntry[];
  created_at: string;
  createdAt?: string;
}
```

### `SignatureEntry`

```ts
{
  algorithm_family: "classical" | "post_quantum";
  algorithm_identifier: string;
  signature_bytes: Uint8Array;
  public_key?: Uint8Array;
  key_id?: string;
}
```

### `VerificationResult`

```ts
{
  valid: boolean;
  verified_with: string | null;
  verification_log: ExecutionStep[];
}
```

## Policy identifiers

- `LEGACY_REQUIRED`
- `HYBRID_PREFERRED`
- `PQ_PREFERRED`
- `PQ_REQUIRED`

## Algorithm identifiers (current backends)

- Classical: `ECDSA_P256`
- Post-quantum: `oqs-ml-dsa-44`
