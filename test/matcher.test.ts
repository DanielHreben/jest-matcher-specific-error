import "../src";

class SpecificError extends Error {
  constructor(message: string, readonly other: any = {}) {
    super(message);
  }
}

class SpecificError2 extends Error {
  constructor(message: string, readonly other: any = {}) {
    super(message);
  }
}

function throwError(err: Error) {
  return () => {
    throw err;
  };
}

describe("matcher", () => {
  describe("error factory", () => {
    it("should be successful if the error factory result matches", () => {
      expect(throwError(new SpecificError("test"))).toMatchError(
        new SpecificError("test")
      );
    });

    it("should throw error if different types", () => {
      expect(() => {
        expect(throwError(new SpecificError2("test"))).toMatchError(
          new SpecificError("test")
        );
      }).toThrowErrorMatchingInlineSnapshot(`
        "Error class is not the same:
        - Expected
        + Received

        - [Function SpecificError]
        + [Function SpecificError2]"
      `);
    });

    it("should throw error if different messages", () => {
      expect(() => {
        expect(throwError(new SpecificError("test"))).toMatchError(
          new SpecificError("test2")
        );
      }).toThrowErrorMatchingInlineSnapshot(`
        "Error message is not the same:
        - Expected
        + Received

        - test2
        + test"
      `);
    });

    it("should throw error if different properties", () => {
      expect(() => {
        expect(throwError(new SpecificError("test"))).toMatchError(
          new SpecificError("test", false)
        );
      }).toThrowErrorMatchingInlineSnapshot(`
        "Error public fields is not the same:
        - Expected
        + Received

          Object {
        -   "other": false,
        +   "other": Object {},
          }"
      `);
    });

    it("should fail if no error is thrown", () => {
      expect(() => {
        expect(() => true).toMatchError(new SpecificError("test"));
      }).toThrowErrorMatchingInlineSnapshot(
        `"Expected to receive an error, but no error was thrown"`
      );
    });
  });

  describe("rejected promises", () => {
    it("should be successful if the error factory result matches", async () => {
      await expect(
        Promise.reject(new SpecificError("test"))
      ).rejects.toMatchError(new SpecificError("test"));
    });

    it("should throw an error if error factory result does not match", async () => {
      await expect(async () => {
        await expect(
          Promise.reject(new SpecificError("test"))
        ).rejects.toMatchError(new SpecificError2("test"));
      }).rejects.toThrowErrorMatchingInlineSnapshot(`
              "Error class is not the same:
              - Expected
              + Received

              - [Function SpecificError2]
              + [Function SpecificError]"
            `);
    });
  });
});
