import { describe, expect, test, vi } from "vitest";
import {
  convertMsToDuration,
  formatSize,
  greeting,
  medal,
  toTime,
  formatNumber,
  formatTime,
  formatUptime,
  levenshtein,
  findTopSuggestions,
  escapeHTML,
  isMimeImage,
  isMimeVideo,
  isMimeGif,
  isMimeWebP,
  isMimeAudio,
  isEmptyObject,
  isURL,
  isWhatsAppURL,
  generateUID,
  getRandomElement,
  delay
} from "../src/index.js";

describe("Format Utils", () => {
  test("convertMsToDuration", () => {
    expect(convertMsToDuration(10000)).toBe("10 seconds");
    expect(convertMsToDuration(0)).toBe("0 seconds");
  });

  test("formatSize", () => {
    expect(formatSize(100000000)).toBe("95.37 MiB");
    expect(formatSize(0)).toBe("0 yBytes");
  });

  test("greeting", () => {
    const morning = new Date("2023-01-01T08:00:00Z").getTime();
    expect(typeof greeting(morning)).toBe("string");
  });

  test("medal", () => {
    expect(medal(0)).toBe("🥇");
    expect(medal(1)).toBe("🥈");
    expect(medal(2)).toBe("🥉");
    expect(medal(3)).toBe("🏅");
  });

  test("toTime", () => {
    expect(toTime(3661000)).toBe("01:01:01");
  });

  test("formatNumber", () => {
    expect(formatNumber(1000)).toBe("1,000");
  });

  test("formatUptime", () => {
    const past = Date.now() - 10000;
    expect(formatUptime(past)).toContain("10s");
  });
});

describe("String Utils", () => {
  test("levenshtein", () => {
    expect(levenshtein("kitten", "sitting")).toBe(3);
  });

  test("findTopSuggestions", () => {
    const cmds = ["help", "hello", "world"];
    expect(findTopSuggestions("hel", cmds)).toContain("help");
  });

  test("escapeHTML", () => {
    expect(escapeHTML("<script>")).toBe("&lt;script&gt;");
  });
});

describe("Validation Utils", () => {
  test("isMime types", () => {
    expect(isMimeImage("image/png")).toBe(true);
    expect(isMimeVideo("video/mp4")).toBe(true);
    expect(isMimeGif("image/gif")).toBe(true);
    expect(isMimeWebP("image/webp")).toBe(true);
    expect(isMimeAudio("audio/mp3")).toBe(true);
  });

  test("isEmptyObject", () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });

  test("isURL", () => {
    expect(isURL("https://google.com")).toBe(true);
    expect(isURL("not-a-url")).toBe(false);
  });

  test("isWhatsAppURL", () => {
    expect(isWhatsAppURL("https://chat.whatsapp.com/invite")).toBe(true);
    expect(isWhatsAppURL("https://google.com")).toBe(false);
  });
});

describe("Index Utils", () => {
  test("generateUID", () => {
    expect(generateUID("test")).toBeTypeOf("string");
    expect(generateUID(null)).toBeNull();
  });

  test("getRandomElement", () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(getRandomElement(arr));
    expect(getRandomElement([])).toBeNull();
  });

  test("delay", async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(99);
  });
});
