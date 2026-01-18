export class DefaultPolicyResolver {
    defaultProfile;
    constructor(defaultProfile) {
        this.defaultProfile = defaultProfile;
    }
    resolve(_context) {
        return this.defaultProfile;
    }
}
//# sourceMappingURL=DefaultPolicyResolver.js.map