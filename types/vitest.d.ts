import "vitest";

declare module "vitest" {
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must match Vitest's declaration
    T = unknown,
  > {
    toMatchError(error: Error): R;
  }
}
