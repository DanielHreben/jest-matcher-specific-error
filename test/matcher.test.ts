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
      }).toThrowErrorMatchingSnapshot();
    });

    it("should throw error if different messages", () => {
      expect(() => {
        expect(throwError(new SpecificError("test"))).toMatchError(
          new SpecificError("test2")
        );
      }).toThrowErrorMatchingSnapshot();
    });

    it("should throw error if different properties", () => {
      expect(() => {
        expect(throwError(new SpecificError("test"))).toMatchError(
          new SpecificError("test", false)
        );
      }).toThrowErrorMatchingSnapshot();
    });

    it("should fail if no error is thrown", () => {
      expect(() => {
        expect(() => true).toMatchError(new SpecificError("test"));
      }).toThrowErrorMatchingSnapshot();
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
      }).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
