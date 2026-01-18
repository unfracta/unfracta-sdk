import type { SignatureEntry } from "../model/SignatureEntry.js";
export interface SignerAdapter {
    algorithmFamily: "classical" | "post_quantum";
    algorithmIdentifier: string;
    sign(payload: Uint8Array): SignatureEntry;
    verify(payload: Uint8Array, signature: SignatureEntry): boolean;
}
//# sourceMappingURL=SignerAdapter.d.ts.map