# unfracta-sdk

Unfracta is a **developer SDK and trust abstraction layer** that enables **continuity of digital signing across pre- and post-quantum environments**.

This repository is intentionally **SDK-first** and **policy-driven**:
- Developers choose **policy**, not cryptographic algorithms.
- The same interface works across **legacy**, **hybrid**, and **post-quantum** environments.
- Unfracta is infrastructure (not a wallet, not a UI product, not a crypto toolkit).

## Source of truth

The `/docs` folder is authoritative. Implementation must conform to:
- Doctrine
- Policy Model
- MVP Scope & Non-Goals
- Demo Script
- SDK Interface & Signature Metadata Contract

## MVP goal

Demonstrate, end-to-end:
1. Legacy support
2. Post-quantum support
3. **Seamless transition** between the two (no re-signing, no re-platforming)

## Quickstart (dev)

```bash
npm install
npm run build
npm run demo
```

> Note: This scaffold uses **mock crypto adapters** so the full flow is runnable immediately.
> Real cryptographic implementations can be added behind the adapter interfaces without changing SDK contracts.
