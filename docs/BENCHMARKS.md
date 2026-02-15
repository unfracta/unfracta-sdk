# Unfracta Benchmarks

This document captures how to measure signing and verification performance.

## How to Run

```bash
npm run build
npm run bench
```

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
