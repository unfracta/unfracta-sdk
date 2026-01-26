import type { Policy } from "../policy/Policy.js";

export interface SigningProfile {
  kind: "classical" | "post_quantum" | "hybrid";
  policy: Policy;
}
