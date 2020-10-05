import stripColor from "strip-color";

const serializer: jest.SnapshotSerializerPlugin = {
  test(value) {
    return typeof value === "string";
  },
  print(value) {
    const valueWithoutColor = stripColor(value as string);
    return `"${valueWithoutColor}"`;
  },
};

export const test = serializer.test;
export const print = serializer.print;
