import * as validationUtils from "../src/validation.js";
import { describe, expect, test } from "vitest";

describe("Validation Utils", () => {
  test("isWhatsAppURL handles short domain", () => {
    expect(validationUtils.isWhatsAppURL("https://wa.me/1234567890")).toBe(
      true,
    );
  });

  test("isMime types", () => {
    expect(validationUtils.isMimeImage("image/png")).toBe(true);
    expect(validationUtils.isMimeVideo("video/mp4")).toBe(true);
    expect(validationUtils.isMimeGif("image/gif")).toBe(true);
    expect(validationUtils.isMimeWebP("image/webp")).toBe(true);
    expect(validationUtils.isMimeAudio("audio/mp3")).toBe(true);
  });

  test("isEmptyObject", () => {
    expect(validationUtils.isEmptyObject({})).toBe(true);
    expect(validationUtils.isEmptyObject({ a: 1 })).toBe(false);
  });

  test("isURL", () => {
    expect(validationUtils.isURL("https://google.com")).toBe(true);
    expect(validationUtils.isURL("not-a-url")).toBe(false);
  });

  test("isWhatsAppURL", () => {
    expect(
      validationUtils.isWhatsAppURL("https://chat.whatsapp.com/invite"),
    ).toBe(true);
    expect(validationUtils.isWhatsAppURL("https://google.com")).toBe(false);
  });
});
