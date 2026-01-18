export enum SigningMode {
  SIGN = "SIGN",
  VERIFY = "VERIFY"
}

export type SigningContext = {
  application?: string;
  environment?: string;
  userId?: string;
  purpose?: string;
};