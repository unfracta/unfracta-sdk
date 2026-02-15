# Unfracta Strategic Positioning (Engineering Alignment)

This document locks the strategic brief for Unfracta so engineering decisions
reinforce acquisition value.

## Target Audience (Primary Buyer Profile)

Strategic acquirers, not general developers.

Primary buyer categories:
- Enterprise security platforms
- Cryptographic infrastructure vendors
- API gateways / service mesh vendors
- Fintech infrastructure providers
- GovTech / regulated systems vendors

Buyer priorities:
- Cryptographic governance
- Algorithm agility
- Auditability
- Future-proofing
- Reduced integration risk

Not a priority:
- Hobbyist ergonomics
- Wallet integrations
- Web3 consumer UX

## Product Category

Unfracta is a policy-driven cryptographic control plane for signing systems.
It sits above algorithms and below application logic.

Canonical definition of what Unfracta is and is not: `01_DOCTRINE.md`.

## Core Value Proposition

Unfracta converts crypto from scattered implementation detail into governed
system capability.

Value drivers:
- Deterministic policy evaluation
- Explainable signing decisions
- Cryptographic agility (classical + PQ)
- Minimal integration surface
- Replaceable algorithm backend

PQ is a force multiplier, not the thesis.

## Acquisition Appeal

Strategic acquirers pay for:
- Reduced engineering time
- Reduced risk surface
- Option value for future migrations

## Engineering Priorities (Optimize For)

Architectural cleanliness:
- Clear policy → plan → execution separation
- Deterministic behavior
- Explicit metadata emission

Stability over features:
- Stable public contract
- Versioned policy schema
- Backward compatibility discipline

Integration friction reduction:
- Drop-in middleware patterns
- Clean adapter model
- Predictable runtime footprint

Verifiable security posture:
- SBOM
- Dependency hygiene
- License clarity (liboqs, native bindings)
- Deterministic test harness

## Avoid Optimizing For

- Feature sprawl
- Broad algorithm buffet
- Premature multi-language ports
- Retail crypto community demands

## Strategic Thesis (One Line)

Unfracta is the governance layer between applications and cryptographic signing,
with built-in algorithm agility for future migrations.
