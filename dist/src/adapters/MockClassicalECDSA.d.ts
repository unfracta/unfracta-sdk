import type { SignerAdapter } from "./SignerAdapter.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";
export declare class MockClassicalECDSA implements SignerAdapter {
    algorithmFamily: "classical";
    algorithmIdentifier: string;
    sign(payload: Uint8Array): SignatureEntry;
    verify(payload: Uint8Array, signature: SignatureEntry): boolean;
}
//# sourceMappingURL=MockClassicalECDSA.d.ts.map