# Audit Trail

This log links repository states to diligence artifacts for verification.

## How to add a new entry

1. Run `npm run sbom`.
2. Run `npm run bench` (optional but recommended).
3. Commit changes and add a row below with the commit hash and artifact paths.

## Entries

| Date | Commit | SBOM | Benchmarks | Notes |
| --- | --- | --- | --- | --- |
| 2026-02-16 | `1b9e255` | `sbom.cdx.json` | `benchmarks/bench-2026-02-15T20-29-11-677Z.json` and `docs/BENCHMARKS.md` | Tagged milestone `v0.1.0-alpha.1`. |
| 2026-02-16 | `7fafacc` | `sbom.cdx.json` | `docs/BENCHMARKS.md` and `benchmarks/` | Initial diligence-ready baseline. |
