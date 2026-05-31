import * as indexUtils from "../src/index.js";
import { describe, expect, test } from "vitest";

describe("Index Utils", () => {
  test("generateUID", () => {
    expect(indexUtils.generateUID("test")).toBeTypeOf("string");
    expect(indexUtils.generateUID(null)).toBeNull();
  });

  test("getRandomElement", () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(indexUtils.getRandomElement(arr));
    expect(indexUtils.getRandomElement([])).toBeNull();
  });

  test("delay", async () => {
    const start = Date.now();
    await indexUtils.delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(99);
  });
});


describe("More additional coverage", () => {
  test("generateUID empty", () => {
    expect(indexUtils.generateUID("")).toBeNull();
  });
  test("delay empty", async () => {
    expect(indexUtils.delay()).toBeNull();
  });
  test("formatSize > YB", () => {
    // testing size loop condition coverage
    expect(indexUtils.formatSize(Math.pow(1024, 20))).toContain("YiB");
  });
  test("isURL handles invalid type", () => {
    expect(indexUtils.isURL(123)).toBe(false);
  });
});
