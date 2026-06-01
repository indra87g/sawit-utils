import * as formatUtils from "../src/format.js";
import { describe, expect, test } from "vitest";

describe("Format Utils", () => {
  test("convertMsToDuration", () => {
    expect(formatUtils.convertMsToDuration(10000)).toBe("10 seconds");
    expect(formatUtils.convertMsToDuration(0)).toBe("0 seconds");
  });

  test("formatSize", () => {
    expect(formatUtils.formatSize(100000000)).toBe("95.37 MiB");
    expect(formatUtils.formatSize(0)).toBe("0 Bytes");
    expect(formatUtils.formatSize(512)).toBe("512.00 Bytes");
  });

  test("greeting", () => {
    const morning = new Date("2023-01-01T08:00:00Z").getTime();
    expect(typeof formatUtils.greeting(morning)).toBe("string");
  });

  test("medal", () => {
    expect(formatUtils.medal(0)).toBe("🥇");
    expect(formatUtils.medal(1)).toBe("🥈");
    expect(formatUtils.medal(2)).toBe("🥉");
    expect(formatUtils.medal(3)).toBe("🏅");
  });

  test("toTime", () => {
    expect(formatUtils.toTime(3661000)).toBe("01:01:01");
  });

  test("formatNumber", () => {
    expect(formatUtils.formatNumber(1000)).toBe("1,000");
  });

  test("formatUptime", () => {
    const past = Date.now() - 10000;
    expect(formatUtils.formatUptime(past)).toContain("10s");
  });
});

describe("Missing Coverage For format.js", () => {
  test("greeting handles different hours", () => {
    const afternoon = new Date("2023-01-01T12:00:00Z").getTime();
    expect(formatUtils.greeting(afternoon)).toBeTruthy();
    const evening = new Date("2023-01-01T16:00:00Z").getTime();
    expect(formatUtils.greeting(evening)).toBeTruthy();
    const night = new Date("2023-01-01T22:00:00Z").getTime();
    expect(formatUtils.greeting(night)).toBeTruthy();
  });

  test("formatSize size >= 1024", () => {
    expect(formatUtils.formatSize(1024)).toBe("1.00 KiB");
  });

  test("formatTime", () => {
    const time = new Date("2023-01-01T08:00:00Z").getTime();
    expect(
      typeof formatUtils.formatTime(time, "en-US", { timeZone: "UTC" }),
    ).toBe("string");
  });

  test("convertMsToDuration larger units", () => {
    const yearMs = 1000 * 60 * 60 * 24 * 365;
    expect(formatUtils.convertMsToDuration(yearMs)).toContain("11 months");
  });
});

describe("Additional coverage", () => {
  test("convertMsToDuration uses milliseconds if no larger units", () => {
    expect(formatUtils.convertMsToDuration(500)).toBe("500 milliseconds");
  });
});
