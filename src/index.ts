import { toMatchError } from "./matcher";

const jestExpect = ((global as NodeJS.Global) && { expect }).expect;

if (jestExpect !== undefined) {
  jestExpect.extend({ toMatchError });
} else {
  throw new Error(
    [
      "Unable to find Jest's global expect.",
      "Please check you have added jest-extended correctly to your jest configuration.",
      "See https://github.com/jest-community/jest-extended#setup for help.",
    ].join("\n")
  );
}
