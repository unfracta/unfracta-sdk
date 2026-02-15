export interface SignatureBackend {
  readonly id: string;

  publicKey(): Uint8Array;
  sign(payload: Uint8Array): Uint8Array;
  verify(
    payload: Uint8Array,
    signature: Uint8Array,
    publicKey?: Uint8Array
  ): boolean;
}
