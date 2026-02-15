# Unfracta Benchmarks

This document captures how to measure signing and verification performance.

## How to Run

```bash
npm run build
npm run bench
```

Note: `npm run bench` runs a build first to keep `dist/` up to date.

Optional environment overrides:

```bash
UNFRACTA_BENCH_SIGN_ITERS=50 \
UNFRACTA_BENCH_VERIFY_ITERS=200 \
npm run bench
```

## Output

The benchmark prints JSON to stdout, including:
- Node version, platform, and payload size
- Per-operation totals, averages, and ops/sec
- Median and p95 latency per operation
- Separate entries for classical and hybrid (PQ) paths
- PQ-only results when supported

The benchmark also writes a timestamped JSON file into `benchmarks/` and
appends a short summary to this document for each run.

## Latest Results (Local Baseline)

Environment:
- Node: v24.13.0
- Platform: darwin arm64
- Payload size: 211 bytes

```json
{
  "timestamp": "2026-02-15T18:40:07.003Z",
  "node": "v24.13.0",
  "platform": "darwin",
  "arch": "arm64",
  "payload_bytes": 211,
  "pq_only_supported": true,
  "iterations": {
    "sign": 50,
    "verify": 200
  },
  "results": [
    {
      "name": "sign_classical",
      "iterations": 50,
      "total_ms": 2.582,
      "avg_ms": 0.051647,
      "median_ms": 0.037875,
      "p95_ms": 0.079708,
      "ops_per_sec": 19362.03
    },
    {
      "name": "verify_classical",
      "iterations": 200,
      "total_ms": 14.072,
      "avg_ms": 0.07036,
      "median_ms": 0.063917,
      "p95_ms": 0.096583,
      "ops_per_sec": 14212.66
    },
    {
      "name": "sign_hybrid",
      "iterations": 50,
      "total_ms": 12.593,
      "avg_ms": 0.251853,
      "median_ms": 0.179,
      "p95_ms": 0.679916,
      "ops_per_sec": 3970.57
    },
    {
      "name": "verify_hybrid",
      "iterations": 200,
      "total_ms": 9.578,
      "avg_ms": 0.047892,
      "median_ms": 0.044917,
      "p95_ms": 0.061458,
      "ops_per_sec": 20880.12
    },
    {
      "name": "sign_pq_only",
      "iterations": 50,
      "total_ms": 9.953,
      "avg_ms": 0.199069,
      "median_ms": 0.1755,
      "p95_ms": 0.365,
      "ops_per_sec": 5023.38
    },
    {
      "name": "verify_pq_only",
      "iterations": 200,
      "total_ms": 9.667,
      "avg_ms": 0.048336,
      "median_ms": 0.045083,
      "p95_ms": 0.056667,
      "ops_per_sec": 20688.41
    }
  ]
}
```

## Snapshot 2026-02-15T20:29:11.677Z

- Output: `benchmarks/bench-2026-02-15T20-29-11-677Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.066016 | 0.041917 | 0.160083 | 15147.9 |
| verify_classical | 0.085869 | 0.066667 | 0.16 | 11645.68 |
| sign_hybrid | 0.285331 | 0.240708 | 0.591875 | 3504.7 |
| verify_hybrid | 0.062098 | 0.046542 | 0.108625 | 16103.6 |
| sign_pq_only | 0.183871 | 0.15025 | 0.436666 | 5438.6 |
| verify_pq_only | 0.058657 | 0.046167 | 0.099916 | 17048.37 |


## Snapshot 2026-02-15T20:34:58.859Z

- Output: `benchmarks/bench-2026-02-15T20-34-58-859Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.049796 | 0.040292 | 0.073333 | 20082.01 |
| verify_classical | 0.0739 | 0.063292 | 0.113542 | 13531.72 |
| sign_hybrid | 0.25809 | 0.184167 | 0.597792 | 3874.62 |
| verify_hybrid | 0.050699 | 0.04575 | 0.080208 | 19724.27 |
| sign_pq_only | 0.218201 | 0.174042 | 0.485875 | 4582.93 |
| verify_pq_only | 0.051712 | 0.045292 | 0.06625 | 19337.7 |


## Snapshot 2026-02-15T20:51:47.866Z

- Output: `benchmarks/bench-2026-02-15T20-51-47-866Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.034183 | 0.032208 | 0.050167 | 29254.07 |
| verify_classical | 0.056741 | 0.053834 | 0.064542 | 17624.05 |
| sign_hybrid | 0.215627 | 0.182791 | 0.445292 | 4637.63 |
| verify_hybrid | 0.043599 | 0.043083 | 0.046 | 22936.23 |
| sign_pq_only | 0.173015 | 0.133958 | 0.425041 | 5779.85 |
| verify_pq_only | 0.043874 | 0.043083 | 0.044333 | 22792.57 |


## Snapshot 2026-02-15T20:56:33.589Z

- Output: `benchmarks/bench-2026-02-15T20-56-33-589Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.038482 | 0.035875 | 0.059959 | 25986.4 |
| verify_classical | 0.070913 | 0.063458 | 0.0825 | 14101.88 |
| sign_hybrid | 0.24768 | 0.211584 | 0.425333 | 4037.47 |
| verify_hybrid | 0.046403 | 0.044542 | 0.05475 | 21550.26 |
| sign_pq_only | 0.172285 | 0.136083 | 0.421208 | 5804.34 |
| verify_pq_only | 0.047899 | 0.045417 | 0.050292 | 20877.1 |


## Snapshot 2026-02-15T20:59:07.750Z

- Output: `benchmarks/bench-2026-02-15T20-59-07-750Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.039488 | 0.036041 | 0.06975 | 25324.46 |
| verify_classical | 0.070853 | 0.062917 | 0.079583 | 14113.71 |
| sign_hybrid | 0.226353 | 0.180583 | 0.419167 | 4417.89 |
| verify_hybrid | 0.047313 | 0.045042 | 0.060625 | 21135.87 |
| sign_pq_only | 0.183012 | 0.139417 | 0.476 | 5464.14 |
| verify_pq_only | 0.049208 | 0.045167 | 0.056333 | 20321.78 |


## Snapshot 2026-02-15T21:05:15.445Z

- Output: `benchmarks/bench-2026-02-15T21-05-15-445Z.json`
- Node: v24.13.0
- Platform: darwin arm64
- Payload: 211 bytes
- PQ-only supported: yes
- Iterations: sign 50, verify 200

| Operation | avg ms | median ms | p95 ms | ops/sec |
| --- | --- | --- | --- | --- |
| sign_classical | 0.050228 | 0.034667 | 0.120333 | 19909.1 |
| verify_classical | 0.118477 | 0.062792 | 0.306 | 8440.46 |
| sign_hybrid | 0.42846 | 0.348125 | 0.988166 | 2333.94 |
| verify_hybrid | 0.079719 | 0.051417 | 0.1795 | 12544 |
| sign_pq_only | 0.238912 | 0.165833 | 0.627167 | 4185.65 |
| verify_pq_only | 0.051679 | 0.045709 | 0.070875 | 19350.31 |

