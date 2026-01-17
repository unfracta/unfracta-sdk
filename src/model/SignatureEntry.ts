export type AlgorithmFamily = "classical" | "post_quantum";

export interface SignatureEntry {
  algorithm_family: AlgorithmFamily;
  algorithm_identifier: string;
  signature_bytes: Uint8Array;
}
