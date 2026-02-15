export type AlgorithmFamily = "classical" | "post_quantum";

export interface SignatureEntry {
  algorithm_family: AlgorithmFamily;
  algorithm_identifier: string;
  signature_bytes: Uint8Array;
  /**
   * Optional public key bytes (required for portable PQ verification).
   */
  public_key?: Uint8Array;
}
