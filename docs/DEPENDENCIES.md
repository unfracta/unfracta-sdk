# Dependencies and Licenses

This document summarizes third-party components used by Unfracta and where to
find their license text. For full transitive coverage, see `sbom.cdx.json`.

## Native Dependencies

### liboqs (post-quantum backend)

- Used by the native addon in `native/oqs`.
- License: MIT (with third-party subcomponents licensed separately).
- Local license file (Homebrew): `/opt/homebrew/Cellar/liboqs/<version>/LICENSE.txt`
- Note: liboqs includes third-party components; see the upstream subfolders for
  their specific licenses.

Update cadence:
- Review liboqs quarterly or when NIST PQC guidance changes.
- Update with `brew upgrade liboqs`, then rebuild `native/oqs`.

## Node Dependencies

### node-addon-api

- Used for the native Node.js addon interface.
- License: MIT
- Local license file: `node_modules/node-addon-api/LICENSE.md`

### Other dev tools (TypeScript, Vitest, node-gyp)

These are build/test tooling dependencies. License files can be found in:

- `node_modules/typescript/LICENSE.txt`
- `node_modules/vitest/LICENSE`
- `node_modules/node-gyp/LICENSE`

If a file path changes with package updates, consult the package root in
`node_modules`.

### SBOM tooling (CycloneDX)

SBOMs are generated with the `@cyclonedx/cyclonedx-npm` CLI via `npm run sbom`.
When the tool is installed, its license can be found at:

- `node_modules/@cyclonedx/cyclonedx-npm/LICENSE`
