import { UnfractaSDK } from "../core/UnfractaSDK.js";
import { Policy } from "../policy/Policy.js";

type BenchResult = {
  name: string;
  iterations: number;
  total_ms: number;
  avg_ms: number;
  median_ms: number;
  p95_ms: number;
  ops_per_sec: number;
};

const sdk = new UnfractaSDK();
const encoder = new TextEncoder();

const payload = encoder.encode(
  JSON.stringify({
    instruction_id: "pi_2026_02_15_0001",
    payer_account: "ACCT-001-7734",
    payee_account: "ACCT-892-1190",
    amount: "25000.00",
    currency: "USD",
    reference: "Invoice 847392",
    requested_at: new Date().toISOString()
  })
);

const SIGN_ITERS = Number(process.env.UNFRACTA_BENCH_SIGN_ITERS ?? "50");
const VERIFY_ITERS = Number(process.env.UNFRACTA_BENCH_VERIFY_ITERS ?? "200");

function bench(name: string, iterations: number, fn: () => void): BenchResult {
  for (let i = 0; i < Math.min(5, iterations); i++) {
    fn();
  }

  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = process.hrtime.bigint();
    fn();
    const end = process.hrtime.bigint();
    samples.push(Number(end - start) / 1e6);
  }

  const totalMs = samples.reduce((sum, value) => sum + value, 0);
  const avgMs = totalMs / iterations;
  const opsPerSec = iterations / (totalMs / 1000);

  const sorted = [...samples].sort((a, b) => a - b);
  const median = percentile(sorted, 0.5);
  const p95 = percentile(sorted, 0.95);

  return {
    name,
    iterations,
    total_ms: Number(totalMs.toFixed(3)),
    avg_ms: Number(avgMs.toFixed(6)),
    median_ms: Number(median.toFixed(6)),
    p95_ms: Number(p95.toFixed(6)),
    ops_per_sec: Number(opsPerSec.toFixed(2))
  };
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.ceil(p * sorted.length) - 1;
  const clamped = Math.max(0, Math.min(sorted.length - 1, index));
  return sorted[clamped];
}

const legacyContext = { policy: Policy.LEGACY_REQUIRED };
const hybridContext = { policy: Policy.HYBRID_PREFERRED };
const pqOnlyContext = { policy: Policy.PQ_REQUIRED };

const legacyEnvelope = sdk.sign(payload, legacyContext);
const hybridEnvelope = sdk.sign(payload, hybridContext);
const pqOnlyPlan = sdk.plan(pqOnlyContext);
const pqOnlySupported =
  pqOnlyPlan.execution.doPostQuantum && !pqOnlyPlan.execution.doClassical;
const pqOnlyEnvelope = pqOnlySupported
  ? sdk.sign(payload, pqOnlyContext)
  : null;

const results: BenchResult[] = [
  bench("sign_classical", SIGN_ITERS, () => {
    sdk.sign(payload, legacyContext);
  }),
  bench("verify_classical", VERIFY_ITERS, () => {
    sdk.verify(payload, legacyEnvelope);
  }),
  bench("sign_hybrid", SIGN_ITERS, () => {
    sdk.sign(payload, hybridContext);
  }),
  bench("verify_hybrid", VERIFY_ITERS, () => {
    sdk.verify(payload, hybridEnvelope);
  })
];

if (pqOnlySupported && pqOnlyEnvelope) {
  results.push(
    bench("sign_pq_only", SIGN_ITERS, () => {
      sdk.sign(payload, pqOnlyContext);
    }),
    bench("verify_pq_only", VERIFY_ITERS, () => {
      sdk.verify(payload, pqOnlyEnvelope);
    })
  );
}

const report = {
  timestamp: new Date().toISOString(),
  node: process.version,
  platform: process.platform,
  arch: process.arch,
  payload_bytes: payload.length,
  pq_only_supported: pqOnlySupported,
  iterations: {
    sign: SIGN_ITERS,
    verify: VERIFY_ITERS
  },
  results
};

console.log(JSON.stringify(report, null, 2));
