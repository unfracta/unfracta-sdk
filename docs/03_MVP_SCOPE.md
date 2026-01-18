# Unfracta MVP Capability & Explicit Non-Goals

## MVP Capabilities (In Scope)

1. Unified signing & verification interface
2. Policy-driven execution: `legacy_required`, `hybrid_preferred`, `pq_preferred`
3. Legacy signatures: generate + verify
4. Post-quantum signatures: generate + verify
5. Hybrid signing: classical + PQ together
6. Seamless transition: no re-signing, no code changes, no ecosystem coordination
7. Signature metadata & provenance: explainability for audits and disputes

## Explicit Non-Goals (Out of Scope)

- End-user apps, wallets, UI
- Key custody / identity issuance
- Algorithm proliferation
- Jurisdiction-specific legal compliance logic
- Vertical workflows or sector-specific behaviour

## Success Criteria

A single flow demonstrates legacy support, PQ support, and seamless transition across mixed environments.
