import { toMatchError } from "./matcher";

// Jest exposes a global `expect`; Vitest always registers its own under this symbol, even without `globals: true`.
const globalExpect: typeof expect | undefined =
  typeof expect !== "undefined"
    ? expect
    : (global as any)[Symbol.for("expect-global")];

if (globalExpect !== undefined) {
  globalExpect.extend({ toMatchError });
} else {
  throw new Error(
    [
      "Unable to find Jest's or Vitest's global expect.",
      "Please check you have added jest-matcher-specific-error to setupFilesAfterEnv (Jest) or setupFiles (Vitest).",
    ].join("\n")
  );
}
