import { Policy } from "../policy/Policy.js";
import type { SignatureEnvelope } from "../model/SignatureEnvelope.js";
import type { VerificationResult } from "../model/VerificationResult.js";
import type { Capabilities } from "./Capabilities.js";
import { PolicyEngine } from "./PolicyEngine.js";
import type { SignerAdapter } from "../adapters/SignerAdapter.js";
import type { SignatureEntry } from "../model/SignatureEntry.js";

export interface SDKConfig {
  version: string;
  capabilities: Capabilities;
  classicalAdapter: SignerAdapter;
  postQuantumAdapter?: SignerAdapter;
}

export class UnfractaSDK {
  private readonly version: string;
  private readonly capabilities: Capabilities;
  private readonly classical: SignerAdapter;
  private readonly pq?: SignerAdapter;

  constructor(cfg: SDKConfig) {
    this.version = cfg.version;
    this.capabilities = cfg.capabilities;
    this.classical = cfg.classicalAdapter;
    this.pq = cfg.postQuantumAdapter;
  }

  sign(payload: Uint8Array, policy: Policy, context: Record<string, string> = {}): SignatureEnvelope {
    const plan = PolicyEngine.plan(policy, this.capabilities);

    const signatures: SignatureEntry[] = [];
    const execution_log = [...plan.log];

    if (plan.doClassical) {
      signatures.push(this.classical.sign(payload));
      execution_log.push({ step: "classical_signed", outcome: "success", reason: `Signed using ${this.classical.algorithmIdentifier}.` });
    } else {
      execution_log.push({ step: "classical_signed", outcome: "failed", reason: "Classical signing not executed." });
    }

    if (plan.doPostQuantum) {
      if (!this.pq) {
        execution_log.push({ step: "pq_signed", outcome: "unsupported", reason: "PQ adapter not configured." });
      } else {
        signatures.push(this.pq.sign(payload));
        execution_log.push({ step: "pq_signed", outcome: "success", reason: `Signed using ${this.pq.algorithmIdentifier}.` });
      }
    } else {
      execution_log.push({ step: "pq_signed", outcome: "skipped", reason: "PQ signing not selected by policy/capability." });
    }

    return {
      version: this.version,
      policy,
      created_at: new Date().toISOString(),
      signatures,
      execution_log,
      context
    };
  }

  verify(payload: Uint8Array, envelope: SignatureEnvelope, context: Record<string, string> = {}): VerificationResult {
    const log = [{ step: "verification_started", outcome: "success", reason: `Verifying envelope created under policy '${envelope.policy}'.` } as const];

    // Try PQ first if available in this environment AND a PQ signature exists.
    const pqSig = envelope.signatures.find(s => s.algorithm_family === "post_quantum");
    if (this.capabilities.postQuantumSupported && this.pq && pqSig) {
      const ok = this.pq.verify(payload, pqSig);
      log.push({ step: "pq_verify", outcome: ok ? "success" : "failed", reason: ok ? "PQ verification succeeded." : "PQ verification failed." });
      if (ok) return { valid: true, verified_with: pqSig.algorithm_identifier, verification_log: [...log] };
    } else if (pqSig) {
      log.push({ step: "pq_verify", outcome: "skipped", reason: "PQ signature present but PQ verification unsupported in this environment." });
    }

    // Classical verification is the continuity anchor.
    const classicalSig = envelope.signatures.find(s => s.algorithm_family === "classical");
    if (!classicalSig) {
      log.push({ step: "classical_verify", outcome: "failed", reason: "No classical signature present." });
      return { valid: false, verified_with: "", verification_log: [...log] };
    }

    const ok = this.classical.verify(payload, classicalSig);
    log.push({ step: "classical_verify", outcome: ok ? "success" : "failed", reason: ok ? "Classical verification succeeded." : "Classical verification failed." });

    return { valid: ok, verified_with: ok ? classicalSig.algorithm_identifier : "", verification_log: [...log] };
  }
}
