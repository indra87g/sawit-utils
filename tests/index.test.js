import { expect, test, toBe } from "vitest";
import { convertMsToDuration, formatSize } from "../index.js";

test("convert 10000ms to equal 10s", () => {
  expect(convertMsToDuration(10000)).toBe("10 seconds");
});

test("format 100000000bytes to equal 95.37 MiB", () => {
  expect(formatSize(100000000)).toBe("95.37 MiB");
});
