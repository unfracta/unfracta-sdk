# Diligence Checklist

This document collects the artifacts and commands used during diligence.

## Build and Test

```bash
npm install
npm run build
npm test
```

## Quick sanity check

```bash
npm run hello
```

## Post-Quantum Backend (Optional)

PQ signing requires the native liboqs backend.

```bash
brew install liboqs
cd native/oqs
npm install
cd ../..
```

## Demo and Benchmarks

```bash
npm run demo
npm run bench
```

Benchmark output is captured in `docs/BENCHMARKS.md`.

Note: `npm run demo` runs a build first to keep `dist/` up to date.
Note: `npm run bench` runs a build first to keep `dist/` up to date.

## SBOM

Generate a CycloneDX SBOM:

```bash
npm run sbom
```

The output is written to `sbom.cdx.json`.

## Licenses

Third-party licensing details are documented in `docs/DEPENDENCIES.md`.

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

## Release tags (optional)

Tagging milestones makes diligence reviews faster.

```bash
git tag -a v0.1.0-alpha.1 -m "Diligence baseline"
git push origin v0.1.0-alpha.1
```

## Code Ownership

Repository code is proprietary and UNLICENSED unless explicitly stated.
