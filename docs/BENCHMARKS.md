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

