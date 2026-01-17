# Unfracta SDK Interface & Signature Metadata Contract (MVP)

## Interface
- `sign(payload, policy, context?) -> SignatureEnvelope`
- `verify(payload, signatureEnvelope, context?) -> VerificationResult`

## Policy
- `legacy_required`
- `hybrid_preferred`
- `pq_preferred`

## SignatureEnvelope (required)
- version
- policy
- created_at
- signatures[]
- execution_log[]
- context (optional)

## VerificationResult (required)
- valid
- verified_with
- verification_log[]

## Rule
Policies express intent; algorithms are implementation details.
