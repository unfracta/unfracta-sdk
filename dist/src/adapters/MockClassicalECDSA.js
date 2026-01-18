// Mock implementation: deterministic bytes derived from payload.
// Replace with real ECDSA(P-256) adapter later without changing SDK contracts.
export class MockClassicalECDSA {
    algorithmFamily = "classical";
    algorithmIdentifier = "ECDSA_P256";
    sign(payload) {
        const sig = new Uint8Array(32);
        for (let i = 0; i < sig.length; i++)
            sig[i] = payload[i % payload.length] ^ 0xA5;
        return { algorithm_family: this.algorithmFamily, algorithm_identifier: this.algorithmIdentifier, signature_bytes: sig };
    }
    verify(payload, signature) {
        if (signature.algorithm_identifier !== this.algorithmIdentifier)
            return false;
        const expected = this.sign(payload).signature_bytes;
        if (expected.length !== signature.signature_bytes.length)
            return false;
        for (let i = 0; i < expected.length; i++)
            if (expected[i] !== signature.signature_bytes[i])
                return false;
        return true;
    }
}
//# sourceMappingURL=MockClassicalECDSA.js.map