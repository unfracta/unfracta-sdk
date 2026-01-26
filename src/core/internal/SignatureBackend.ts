export interface SignatureBackend {
  readonly id: string;

  sign(payload: Uint8Array): Uint8Array;
  verify(payload: Uint8Array, signature: Uint8Array): boolean;
}
