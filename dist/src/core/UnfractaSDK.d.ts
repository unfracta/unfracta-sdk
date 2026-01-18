import { PolicyResolver } from "./PolicyResolver.js";
import { Signer } from "./Signer.js";
import { SigningContext } from "./types.js";
export declare class UnfractaSDK {
    private readonly policyResolver;
    private readonly signer;
    constructor(policyResolver: PolicyResolver, signer: Signer);
    sign(context: SigningContext, payload: Uint8Array): Uint8Array;
}
//# sourceMappingURL=UnfractaSDK.d.ts.map