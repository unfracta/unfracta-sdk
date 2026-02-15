# Audit Trail

This log links repository states to diligence artifacts for verification.

## How to add a new entry

1. Run `npm run audit:prepare` to generate `sbom.cdx.json` and benchmarks.
2. Commit the artifacts (SBOM + benchmark JSON + `docs/BENCHMARKS.md`).
3. Run `npm run audit:record` to append a new row using the current commit.
4. (Optional) Create a tag by setting `UNFRACTA_AUDIT_TAG`:
   `UNFRACTA_AUDIT_TAG=v0.1.0-alpha.2 npm run audit:record`
5. Commit the updated audit trail (and push the tag if created).

## Entries

| Date | Commit | SBOM | Benchmarks | Notes |
| --- | --- | --- | --- | --- |
| 2026-02-15 | `4e3e700` | `sbom.cdx.json` | `benchmarks/bench-2026-02-15T20-51-47-866Z.json` and `docs/BENCHMARKS.md` | Tagged milestone v0.1.0-alpha.2. |
| 2026-02-15 | `512481b` | `sbom.cdx.json` | `benchmarks/bench-2026-02-15T20-34-58-859Z.json` and `docs/BENCHMARKS.md` | Tagged milestone v0.1.0-alpha.2. |
| 2026-02-15 | `7fce543` | `sbom.cdx.json` | `benchmarks/bench-2026-02-15T20-34-58-859Z.json` and `docs/BENCHMARKS.md` | Artifacts recorded. |
| 2026-02-16 | `1b9e255` | `sbom.cdx.json` | `benchmarks/bench-2026-02-15T20-29-11-677Z.json` and `docs/BENCHMARKS.md` | Tagged milestone `v0.1.0-alpha.1`. |
| 2026-02-16 | `7fafacc` | `sbom.cdx.json` | `docs/BENCHMARKS.md` and `benchmarks/` | Initial diligence-ready baseline. |


