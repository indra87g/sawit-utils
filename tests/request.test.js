import { ApiClient, api } from "../src/request.js";
import { afterEach, describe, expect, test, vi } from "vitest";

/**
 * Builds a minimal Response-like stub for the global fetch mock.
 */
const makeResponse = ({
  ok = true,
  status = 200,
  statusText = "OK",
  contentType = "application/json",
  text = "",
  arrayBuffer = new ArrayBuffer(0),
} = {}) => ({
  ok,
  status,
  statusText,
  headers: { get: (name) => (name === "content-type" ? contentType : null) },
  body: { cancel: vi.fn() },
  text: async () => text,
  arrayBuffer: async () => arrayBuffer,
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ApiClient.request - content-type handling", () => {
  test("parses JSON responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        makeResponse({ contentType: "application/json", text: '{"a":1}' }),
      ),
    );
    const client = new ApiClient();
    expect(await client.request("https://x.test")).toEqual({ a: 1 });
  });

  test("returns null for an empty JSON body", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        makeResponse({ contentType: "application/json", text: "" }),
      ),
    );
    expect(await new ApiClient().request("https://x.test")).toBeNull();
  });

  test("returns text for text/* responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        makeResponse({ contentType: "text/plain", text: "hello" }),
      ),
    );
    expect(await new ApiClient().request("https://x.test")).toBe("hello");
  });

  test("returns a Buffer for binary content types", async () => {
    const bytes = new Uint8Array([1, 2, 3]).buffer;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        makeResponse({ contentType: "image/png", arrayBuffer: bytes }),
      ),
    );
    const result = await new ApiClient().request("https://x.test");
    expect(Buffer.isBuffer(result)).toBe(true);
    expect([...result]).toEqual([1, 2, 3]);
  });

  test("throws on a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        makeResponse({ ok: false, status: 404, statusText: "Not Found" }),
      ),
    );
    await expect(new ApiClient().request("https://x.test")).rejects.toThrow(
      /404/,
    );
  });

  test("translates an aborted request into a timeout error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url, options) => {
        const err = new Error("aborted");
        // Simulate the AbortController firing.
        options.signal.dispatchEvent?.(new Event("abort"));
        Object.defineProperty(options.signal, "aborted", { value: true });
        throw err;
      }),
    );
    const client = new ApiClient({ timeout: 5 });
    await expect(client.request("https://slow.test")).rejects.toThrow(
      /timeout/i,
    );
  });
});

describe("ApiClient.getContentType", () => {
  test("returns the content-type header", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => makeResponse({ contentType: "video/mp4" })),
    );
    expect(await new ApiClient().getContentType("https://x.test")).toBe(
      "video/mp4",
    );
  });

  test("throws when the HEAD request is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => makeResponse({ ok: false, statusText: "Boom" })),
    );
    await expect(
      new ApiClient().getContentType("https://x.test"),
    ).rejects.toThrow(/Boom/);
  });
});

describe("ApiClient registry", () => {
  test("named endpoints build the correct URL", async () => {
    const fetchMock = vi.fn(async () =>
      makeResponse({ contentType: "application/json", text: "{}" }),
    );
    vi.stubGlobal("fetch", fetchMock);
    await new ApiClient().turu("status", { q: "1" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://mending-turu.web.id/api/status?q=1",
      expect.any(Object),
    );
  });

  test("custom registry passed to the constructor is usable", async () => {
    const fetchMock = vi.fn(async () =>
      makeResponse({ contentType: "application/json", text: "{}" }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const client = new ApiClient({
      registry: { mine: "https://mine.test/api/" },
    });
    await client.zenzxz("a"); // built-in default still present
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.zenzxz.my.id/a",
      expect.any(Object),
    );
  });

  test("register() adds an endpoint at runtime, reachable via #callApi", async () => {
    const fetchMock = vi.fn(async () =>
      makeResponse({ contentType: "text/plain", text: "ok" }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const client = new ApiClient();
    client.register("turu", "https://override.test/");
    await client.turu("ping");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://override.test/ping",
      expect.any(Object),
    );
  });

  test("api singleton exposes all named endpoint helpers", () => {
    for (const name of [
      "deline",
      "faa",
      "nexray",
      "zenzxz",
      "lexcode",
      "turu",
      "xemoz",
    ]) {
      expect(api[name]).toBeTypeOf("function");
    }
  });
});
