import * as stringUtils from "../src/string.js";
import { describe, expect, test } from "vitest";

describe("String Utils", () => {
  test("levenshtein edge cases", () => {
    expect(stringUtils.levenshtein("", "test")).toBe(4);
    expect(stringUtils.levenshtein("test", "")).toBe(4);
    expect(stringUtils.levenshtein("a", "a")).toBe(0);
  });
  test("escapeHTML handles empty input", () => {
    expect(stringUtils.escapeHTML("")).toBe("");
    expect(stringUtils.escapeHTML(null)).toBe("");
  });
  test("findTopSuggestions handles empty commands array", () => {
    expect(stringUtils.findTopSuggestions("test", undefined)).toEqual([]);
  });
  test("findTopSuggestions empty query", () => {
    expect(stringUtils.findTopSuggestions("", ["help"])).toEqual([]);
  });

  test("levenshtein", () => {
    expect(stringUtils.levenshtein("kitten", "sitting")).toBe(3);
  });

  test("findTopSuggestions", () => {
    const cmds = ["help", "hello", "world"];
    expect(stringUtils.findTopSuggestions("hel", cmds)).toContain("help");
  });

  test("escapeHTML", () => {
    expect(stringUtils.escapeHTML("<script>")).toBe("&lt;script&gt;");
  });
});


describe("String Utils - looksLikeCode", () => {

  test("identifies code snippets", () => {
    expect(stringUtils.looksLikeCode("function test() {}")).toBe(true);
    expect(stringUtils.looksLikeCode("const a = 1;")).toBe(true);
    expect(stringUtils.looksLikeCode("let b = 2;")).toBe(true);
    expect(stringUtils.looksLikeCode("var c = 3;")).toBe(true);
    expect(stringUtils.looksLikeCode("class Test {}")).toBe(true);
    expect(stringUtils.looksLikeCode("() => {}")).toBe(true);
    expect(stringUtils.looksLikeCode("console.log('test')")).toBe(true);
    expect(stringUtils.looksLikeCode("<div>test</div>")).toBe(true);
    expect(stringUtils.looksLikeCode("```javascript\nconsole.log('test')\n```")).toBe(true);
  });

  test("identifies non-code text", () => {
    expect(stringUtils.looksLikeCode("Just a normal string of text.")).toBe(false);
    expect(stringUtils.looksLikeCode("Hello world!")).toBe(false);
    expect(stringUtils.looksLikeCode("12345")).toBe(false);
  });
});
