import type { Policy } from "../policy/Policy.js";

export enum SigningMode {
  SIGN = "SIGN",
  VERIFY = "VERIFY"
}

export type SigningContext = {
  application?: string;
  environment?: string;
  userId?: string;
  purpose?: string;
  /**
   * Optional explicit policy override.
   * If omitted, the resolver falls back to the default policy.
   */
  policy?: Policy;
};
