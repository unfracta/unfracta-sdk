import type { SignerAdapter } from "./SignerAdapter.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
export declare class MockPostQuantumDilithium implements SignerAdapter {
    algorithmFamily: "post_quantum";
    algorithmIdentifier: string;
    sign(payload: Uint8Array): SignatureEntry;
    verify(payload: Uint8Array, signature: SignatureEntry): boolean;
}
//# sourceMappingURL=MockPostQuantumDilithium.d.ts.map