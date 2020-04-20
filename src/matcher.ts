type MatcherContext = jest.MatcherContext;
type CustomMatcherResult = jest.CustomMatcherResult;

function errorToObject(error: Error) {
  const { stack, ...publicFields } = error;

  return {
    class: error.constructor,
    message: error.message,
    publicFields,
  };
}

export function toMatchError(
  this: MatcherContext,
  gotError: Error,
  expectedError: Error
): CustomMatcherResult {
  const got = errorToObject(gotError);
  const expected = errorToObject(expectedError);

  const diff: string[] = [];

  if (got.class !== expected.class) {
    diff.push(
      "Error class is not the same:",
      this.utils.diff(got.class, expected.class) as string
    );
  }

  if (got.message !== expected.message) {
    diff.push(
      "Error message is not the same:",
      this.utils.diff(got.message, expected.message) as string
    );
  }

  if (!this.equals(got.publicFields, expected.publicFields)) {
    diff.push(
      "Error public fields is not the same:",
      this.utils.diff(got.publicFields, expected.publicFields) as string
    );
  }

  return {
    pass: diff.length === 0,
    message: () => diff.join("\n"),
  };
}
