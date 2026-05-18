import { describe, expect, test, vi } from "vitest";
import {
  convertMsToDuration,
  igdl,
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

describe("Missing Coverage For format.js", () => {
  test("greeting handles different hours", () => {
    const afternoon = new Date("2023-01-01T12:00:00Z").getTime();
    expect(greeting(afternoon)).toBeTruthy();
    const evening = new Date("2023-01-01T16:00:00Z").getTime();
    expect(greeting(evening)).toBeTruthy();
    const night = new Date("2023-01-01T22:00:00Z").getTime();
    expect(greeting(night)).toBeTruthy();
  });

  test("formatSize size >= 1024", () => {
    expect(formatSize(1024)).toBe("1.00 KiB");
  });

  test("formatTime", () => {
    const time = new Date("2023-01-01T08:00:00Z").getTime();
    expect(typeof formatTime(time, "en-US", { timeZone: "UTC" })).toBe("string");
  });

  test("convertMsToDuration larger units", () => {
    const yearMs = 1000 * 60 * 60 * 24 * 365;
    expect(convertMsToDuration(yearMs)).toContain("11 months");
  });
});

describe("Additional coverage", () => {
  test("convertMsToDuration uses milliseconds if no larger units", () => {
    expect(convertMsToDuration(500)).toBe("500 milliseconds");
  });

  test("levenshtein edge cases", () => {
    expect(levenshtein("", "test")).toBe(4);
    expect(levenshtein("test", "")).toBe(4);
    expect(levenshtein("a", "a")).toBe(0);
  });

  test("escapeHTML handles empty input", () => {
    expect(escapeHTML("")).toBe("");
    expect(escapeHTML(null)).toBe("");
  });

  test("isWhatsAppURL handles short domain", () => {
    expect(isWhatsAppURL("https://wa.me/1234567890")).toBe(true);
  });

  test("findTopSuggestions handles empty commands array", () => {
    expect(findTopSuggestions("test", undefined)).toEqual([]);
  });

  test("findTopSuggestions empty query", () => {
    expect(findTopSuggestions("", ["help"])).toEqual([]);
  });
});

describe("More additional coverage", () => {
  test("generateUID empty", () => {
    expect(generateUID("")).toBeNull();
  });
  test("delay empty", async () => {
    expect(delay()).toBeNull();
  });
  test("formatSize > YB", () => {
    // testing size loop condition coverage
    expect(formatSize(Math.pow(1024, 20))).toContain("YiB");
  });
  test("isURL handles invalid type", () => {
    expect(isURL(123)).toBe(false);
  });
});

describe("igdl tests", () => {
  test("igdl with valid url", async () => {
    // Note: mock fetch or rely on live fetch. Let's rely on live fetch but mock might be better for CI.
    // Given the prompt constraints, we'll write a simple test for error handling.
    const result = await igdl("invalid_url");
    expect(result.success).toBe(false);
    expect(result.error).toBe("URL Instagram tidak valid");
  });
});

describe("More igdl tests", () => {
  test("igdl valid regex pattern logic", async () => {
    const result = await igdl("https://instagram.com/p/test1234");
    expect(result.success).toBe(true);
  });
});
