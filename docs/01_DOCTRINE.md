# Unfracta Doctrine

## Purpose
This doctrine defines the non-negotiable principles, scope, and intent of Unfracta. It exists to preserve architectural clarity, prevent drift, and ensure that all future design, implementation, and commercial decisions reinforce the same core proposition.

This document is intentionally short, opinionated, and stable. It should change rarely.

---

## What Unfracta **Is**

Unfracta is a **developer SDK and trust abstraction layer** that enables **continuity of digital signing across pre- and post-quantum environments**.

It provides a stable, policy-driven interface for digital signing and verification that:
- Preserves legacy cryptographic trust
- Enables post-quantum readiness
- Allows seamless transition between the two without disruption

Unfracta is infrastructure. It is designed to be embedded, invisible, and long-lived.

---

## What Unfracta **Is Not**

Unfracta is explicitly **not**:
- A wallet or end-user application
- A consumer security product
- A cryptographic research project
- A blockchain or token system
- A replacement for PKI, HSMs, or identity systems
- A platform that forces cryptographic choices onto developers or users

Unfracta does not attempt to define cryptographic standards or policy. It implements them.

---

## Problem Framing

Post-quantum cryptography is not a single upgrade. It is a long transition where
systems must remain trustworthy while capabilities differ across time,
platforms, and organisations.

Real-world environments often include:
- Legacy verifiers that cannot parse or validate post-quantum signatures
- Mixed runtimes (some services upgraded, others not)
- Long-lived signatures that must remain verifiable for years
- Incremental, policy-driven migrations rather than “flag-day” cutovers

Organisations face a structural dilemma:
- Moving too early to post-quantum cryptography risks breaking operations,
  interoperability, and legal validity
- Moving too late risks future compromise and emergency migration

The missing layer is decision governance:
- deciding what to sign with (and when),
- based on an environment’s capabilities,
- while preserving continuity of trust,
- with decisions that are deterministic and auditable.

The real problem is not algorithm selection. It is **surviving the transition
without breaking trust**.

---

## Unfracta’s Core Proposition

**Unfracta sells continuity of trust across pre- and post-quantum worlds.**

It does this by:
- Abstracting cryptographic choice behind policy
- Treating legacy, hybrid, and post-quantum modes as first-class states
- Ensuring that signatures remain verifiable as environments and standards evolve

---

## Non-Negotiable Principles

These principles are binding for all MVP and future development.

1. **SDK-First**  
   Unfracta is delivered as a developer SDK. No end-user UI is required to realise its value.

2. **Policy-Driven, Not Algorithm-Driven**  
   Developers express intent and risk posture. Unfracta determines cryptographic execution.

3. **Legacy Before Post-Quantum**  
   Legacy cryptography is preserved as a first-class path. Post-quantum support must never invalidate existing trust.

4. **Hybrid as the Default Transition State**  
   Hybrid signing is the primary mechanism for safe migration and must be supported from the MVP.

5. **Seamless Transition Without Re-Signing**  
   Movement between legacy, hybrid, and post-quantum environments must not require re-signing, re-platforming, or code changes.

6. **Cryptographic Agility**  
   Algorithms are replaceable. The abstraction is not.

7. **Invisibility by Design**  
   End users should never be exposed to cryptographic decisions.

8. **Reversibility and Risk Containment**  
   No cryptographic choice made through Unfracta should be irreversible or system-wide without policy intent.

---

## Success Criteria for Unfracta

Unfracta is successful when:
- It can be embedded into existing systems with minimal friction
- Legacy environments continue to operate unchanged
- Post-quantum capability can be enabled incrementally
- Verification remains valid across different cryptographic capabilities
- Organisations can explain, audit, and defend their cryptographic posture over time

---

## Guiding Statement

> *Unfracta is not building the future of cryptography. It is building the bridge that allows institutions to cross into it safely.*

---

## Change Control

Any proposed change that violates the principles in this doctrine must be explicitly justified and approved. Silence or convenience is not sufficient justification.

This document represents architectural intent and should be treated as authoritative.
