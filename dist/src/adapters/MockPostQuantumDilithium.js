// Mock implementation: deterministic bytes derived from payload.
// Replace with real Dilithium adapter later without changing SDK contracts.
export class MockPostQuantumDilithium {
    algorithmFamily = "post_quantum";
    algorithmIdentifier = "DILITHIUM";
    sign(payload) {
        const sig = new Uint8Array(48);
        for (let i = 0; i < sig.length; i++)
            sig[i] = payload[(payload.length - 1 - (i % payload.length))] ^ 0x5A;
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
//# sourceMappingURL=MockPostQuantumDilithium.js.map