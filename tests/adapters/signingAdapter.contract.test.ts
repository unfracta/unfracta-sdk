import { describe, it, expect } from "vitest";
import type { SigningAdapter } from "../../src/core/adapters/SigningAdapter.js";
import type { SigningProfile } from "../../src/core/SigningProfile.js";
import { ClassicalECDSA } from "../../src/adapters/ClassicalECDSA.js";

function runSigningAdapterContract(
  name: string,
  createAdapter: () => SigningAdapter
) {
  describe(name, () => {
    const adapter = createAdapter();

    const profile = {} as SigningProfile;
    const payload = new Uint8Array([1, 2, 3, 4]);

    it("returns a Uint8Array", () => {
      const signature = adapter.sign(profile, payload);
      expect(signature).toBeInstanceOf(Uint8Array);
    });

    it("is deterministic for the same input", () => {
      const sig1 = adapter.sign(profile, payload);
      const sig2 = adapter.sign(profile, payload);

      expect(sig1).toEqual(sig2);
    });

    it("does not mutate the input payload", () => {
      const original = new Uint8Array(payload);
      adapter.sign(profile, payload);

      expect(payload).toEqual(original);
    });
  });
}

runSigningAdapterContract("ClassicalECDSA", () => new ClassicalECDSA());
