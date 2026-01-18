export class UnfractaSDK {
    policyResolver;
    signer;
    constructor(policyResolver, signer) {
        this.policyResolver = policyResolver;
        this.signer = signer;
    }
    sign(context, payload) {
        const profile = this.policyResolver.resolve(context);
        return this.signer.sign(profile, payload);
    }
}
//# sourceMappingURL=UnfractaSDK.js.map