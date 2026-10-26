// Plain JS so tsc (TS 4) and Jest skip it; run with `yarn test:vitest`, no `globals: true`.
import { describe, expect, it } from "vitest";
import "../dist/src/index.js";

class SpecificError extends Error {}

describe("vitest", () => {
  it("matches the same error", async () => {
    expect(() => {
      throw new SpecificError("test");
    }).toMatchError(new SpecificError("test"));
    await expect(Promise.reject(new SpecificError("test"))).rejects.toMatchError(
      new SpecificError("test")
    );
  });

  it("fails on a different error", () => {
    expect(() =>
      expect(new Error("test")).toMatchError(new SpecificError("test"))
    ).toThrow("Error class is not the same");
  });
});
