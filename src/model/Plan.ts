import type { Policy } from "../policy/Policy.js";

/**
 * A deterministic plan describing how the SDK intends to sign a payload.
 *
 * - `policy` is the policy resolved by the PolicyResolver.
 * - `paths` is an ordered list of signing paths (e.g. classical, hybrid, post_quantum)
 *   that will be attempted during signing. The MVP always includes a single classical path.
 * - `reasons` maps each path to a human-readable explanation of why it was included or excluded.
 */
export interface Plan {
  policy: Policy;
  paths: string[];
  reasons: Record<string, string>;
}
