import { expect, test, toBe, beforeAll } from "vitest";
import { convertMsToDuration, formatSize } from "../index.js";
import { igdl } from "../scraper/igdl.js";

test("convert 10000ms to equal 10s", () => {
  expect(convertMsToDuration(10000)).toBe("10 seconds");
});

test("format 100000000bytes to equal 95.37 MiB", () => {
  expect(formatSize(100000000)).toBe("95.37 MiB");
});

test("download instagram video, must return true", () => {
  let instagram;
  
  beforeAll(async () => {
    instagram = await igdl("https://www.instagram.com/reel/DVXpryaE841/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==");
    expect(instagram.success).toBe(true);
  })  
});
