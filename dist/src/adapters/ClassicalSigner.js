export class ClassicalSigner {
    sign(payload, log) {
        log.push({
            step: "classical_signing",
            outcome: "success",
            reason: "Classical signing executed (mock implementation)."
        });
        return {
            algorithm_family: "classical",
            algorithm_identifier: "MOCK_CLASSICAL",
            signature_bytes: new Uint8Array([1, 2, 3])
        };
    }
}
//# sourceMappingURL=ClassicalSigner.js.map