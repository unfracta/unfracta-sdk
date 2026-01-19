import { SigningProfile } from "../SigningProfile.js";

/**
 * A SigningAdapter performs the actual cryptographic signing.
 *
 * Adapters are responsible for execution, not policy or planning.
 * This allows the SDK to support multiple backends (classical,
 * hybrid, post-quantum) without changing its public API.
 */
export interface SigningAdapter {
  sign(profile: SigningProfile, payload: Uint8Array): Uint8Array;
}
