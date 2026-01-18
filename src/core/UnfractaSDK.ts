import { PolicyResolver } from "./PolicyResolver.js";
import { Signer } from "./Signer.js";
import { SigningContext } from "./types.js";

export class UnfractaSDK {
  constructor(
    private readonly policyResolver: PolicyResolver,
    private readonly signer: Signer
  ) {}

  sign(context: SigningContext, payload: Uint8Array): Uint8Array {
    const profile = this.policyResolver.resolve(context);
    return this.signer.sign(profile, payload);
  }
}