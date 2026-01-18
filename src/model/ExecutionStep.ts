export type ExecutionOutcome =
  | "success"
  | "unsupported"
  | "skipped"
  | "failure"
  | "unimplemented";

export type ExecutionStep = {
  step: string;
  outcome: ExecutionOutcome;
  reason: string;
};
/**
 * A minimal, explainable audit step.
 *
 * In the MVP we keep this deliberately flexible (strings) so we can evolve
 * without breaking existing envelopes. Avoid literal unions for `step` and `reason`.
 */