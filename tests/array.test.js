import * as arrayUtils from "../src/array.js";
import { describe, expect, test } from "vitest";

describe("Array Utils", () => {
  test("toArray wraps, passes through, and handles nullish", () => {
    expect(arrayUtils.toArray(undefined)).toEqual([]);
    expect(arrayUtils.toArray(null)).toEqual([]);
    expect(arrayUtils.toArray("a")).toEqual(["a"]);
    expect(arrayUtils.toArray([1, 2])).toEqual([1, 2]);
    // falsy-but-valid values must still be wrapped, not dropped
    expect(arrayUtils.toArray(0)).toEqual([0]);
    expect(arrayUtils.toArray("")).toEqual([""]);
    expect(arrayUtils.toArray(false)).toEqual([false]);
  });

  test("shuffleArray returns a new array with the same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = arrayUtils.shuffleArray(input);
    expect(result).not.toBe(input); // new array, not mutated in place
    expect(input).toEqual([1, 2, 3, 4, 5]); // original untouched
    expect([...result].sort()).toEqual([...input].sort());
  });

  test("shuffleArray handles empty and single-element arrays", () => {
    expect(arrayUtils.shuffleArray([])).toEqual([]);
    expect(arrayUtils.shuffleArray([42])).toEqual([42]);
  });

  test("randomInteger stays within the inclusive bounds", () => {
    for (let i = 0; i < 100; i++) {
      const n = arrayUtils.randomInteger(5, 10);
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThanOrEqual(10);
      expect(Number.isInteger(n)).toBe(true);
    }
  });

  test("randomInteger with equal bounds returns that value", () => {
    expect(arrayUtils.randomInteger(7, 7)).toBe(7);
  });

  test("randomValue returns an element or null for empty input", () => {
    const arr = ["a", "b", "c"];
    expect(arr).toContain(arrayUtils.randomValue(arr));
    expect(arrayUtils.randomValue([])).toBeNull();
    expect(arrayUtils.randomValue(null)).toBeNull();
    expect(arrayUtils.randomValue(undefined)).toBeNull();
  });
});
