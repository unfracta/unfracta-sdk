/**
 * Describes the cryptographic capabilities exposed by the SDK.
 *
 * This is intentionally declarative and deterministic so it can be used
 * for feature discovery, audits, and compatibility checks.
 */
export interface Capabilities {
  /**
   * Supported signing paths exposed by the SDK.
   * The MVP supports classical signing only.
   */
  signingPaths: string[];

  /**
   * Whether hybrid (classical + post-quantum) signing is supported.
   */
  supportsHybrid: boolean;

  /**
   * Whether pure post-quantum signing is supported.
   */
  supportsPostQuantum: boolean;
}
