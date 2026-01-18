import { SigningMode } from "./types.js";

export interface SigningProfile {
  algorithm: string;
  mode: SigningMode;
  keyRef: string;
}
