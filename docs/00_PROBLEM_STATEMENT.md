# Problem statement: the post-quantum transition

Post-quantum cryptography (PQC) is not a single upgrade. It is a long transition where systems must remain trustworthy while capabilities differ across time, platforms, and organisations.

Most cryptographic libraries focus on algorithms.
Unfracta focuses on the transition.

## What breaks during a PQ migration

Real-world environments often include:

- Legacy verifiers that cannot parse or validate post-quantum signatures
- Mixed runtimes (some services upgraded, others not)
- Long-lived signatures that must remain verifiable for years (documents, audit logs, contracts, software releases)
- Incremental, policy-driven migrations rather than “flag-day” cutovers

If a system adopts PQ signatures too early, it can break verification in legacy environments.
If it waits too long, it carries growing future risk.
Most organisations need both properties at once: compatibility now, resilience later.

## The missing layer

PQC adds new algorithms, but the harder engineering problem is:

- deciding what to sign with (and when),
- based on an environment’s capabilities,
- while preserving continuity of trust across old and new verifiers,
- with decisions that are deterministic and auditable.

That decision layer is typically implemented ad hoc in every product.
Unfracta exists to make that layer explicit, reusable, and safe.

## What Unfracta provides

Unfracta is a policy-driven signing orchestration layer that:

- lets applications express intent as policy (not algorithms),
- derives a deterministic execution plan from policy + capabilities,
- executes via adapters (classical and post-quantum),
- records an audit-grade execution log explaining every decision.

## Design boundaries (by intent)

Unfracta deliberately does not attempt to be:

- a key manager,
- a wallet,
- a cryptographic toolkit,
- a compliance framework.

Those components can be integrated later, but they should not be entangled with the transition layer.

## Why this matters

The post-quantum transition will last years.
Systems that treat PQC as “swap the algorithm” will repeatedly face trust discontinuities.

Unfracta is designed to make trust:

- continuous across mixed environments,
- explainable to engineers and auditors,
- future-proof without premature commitments.
