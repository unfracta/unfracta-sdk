# Unfracta Policy Model (MVP)

## Purpose
This document defines the **canonical policy model** for the Unfracta MVP. Policies express **intent and risk posture**, not cryptographic algorithms. They are the primary control surface through which developers and organisations interact with Unfracta.

This policy model is deliberately minimal and frozen for the MVP to prevent scope creep and ambiguity.

---

## Core Design Rule

> **Developers never choose cryptographic algorithms. They choose policy.**

Unfracta is solely responsible for mapping policy to cryptographic execution based on environment capability, availability, and compatibility.

---

## Policy Set (MVP – Frozen)

Exactly **four policies** are supported in the MVP.

---

## 1. `legacy_required`

### Intent
Preserve legal, operational, and interoperability continuity in environments where post-quantum cryptography is unavailable, unsupported, or undesirable.

### Behaviour
- Only legacy (classical) cryptographic signatures are generated
- Post-quantum algorithms are ignored, even if technically available
- Verification must succeed in all environments that support standard PKI

### Explicitly Forbidden
- Generation of any post-quantum signature material
- Silent upgrade to hybrid or PQ modes

---

## 2. `hybrid_preferred` (Core Transition Policy)

### Intent
Enable safe, incremental transition to post-quantum cryptography without breaking existing trust, verification, or legal validity.

### Behaviour
- Both legacy and post-quantum signatures are generated together
- Either signature may independently verify the payload
- Verification succeeds even if post-quantum support is unavailable or rejected

### Explicitly Forbidden
- Exclusive reliance on post-quantum verification
- Invalidation of legacy-only verifiers

---

## 3. `pq_preferred`

### Intent
Support environments preparing for post-quantum dominance while retaining continuity with legacy systems where necessary.

### Behaviour
- Post-quantum signature is treated as primary
- Legacy signature is retained as a fallback where supported
- Verification prefers post-quantum but must not fail solely due to lack of PQ support

### Explicitly Forbidden
- PQ-only signatures without explicit policy intent
- Breaking verification in legacy environments

---

## 4. `pq_required`

### Intent
Represent the end-state where post-quantum cryptography is mandatory and
legacy signatures are no longer acceptable.

### Behaviour
- Post-quantum signatures only
- Fails closed if post-quantum support is unavailable
- No classical fallback path

### Explicitly Forbidden
- Emitting classical signatures
- Silent downgrade to hybrid or legacy policies

---

## Stability & Change Control

This policy model is **frozen for the MVP**.
