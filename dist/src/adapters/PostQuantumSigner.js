export class PostQuantumSigner {
    sign(payload, log) {
        log.push({
            step: "post_quantum_signing",
            outcome: "success",
            reason: "Post-quantum signing executed (mock implementation)."
        });
        return {
            algorithm_family: "post_quantum",
            algorithm_identifier: "MOCK_PQ",
            signature_bytes: new Uint8Array([9, 9, 9])
        };
    }
}
//# sourceMappingURL=PostQuantumSigner.js.map