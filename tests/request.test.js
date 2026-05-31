import * as reqUtils from "../src/request.js";
import { describe, expect, test } from "vitest";

describe("Request Utils", () => {
  test("request exports are defined", () => {
    // Just testing that the exports exist since testing actual live API requests
    // would be flaky and slow down tests.
    expect(reqUtils.api).toBeDefined();
    expect(reqUtils.api.request).toBeDefined();
    expect(reqUtils.api.getContentType).toBeDefined();
    expect(reqUtils.api.deline).toBeDefined();
    expect(reqUtils.api.faa).toBeDefined();
    expect(reqUtils.api.nexray).toBeDefined();
    expect(reqUtils.api.zenzxz).toBeDefined();
    expect(reqUtils.api.lexcode).toBeDefined();
    expect(reqUtils.api.turu).toBeDefined();
    expect(reqUtils.api.xemoz).toBeDefined();
  });
});
