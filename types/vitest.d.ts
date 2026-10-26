import "vitest";

declare module "vitest" {
  interface Matchers<T = any> {
    toMatchError(error: Error): T;
  }
}
