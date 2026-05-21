import { isMimeAudio, isMimeImage, isMimeVideo } from "./validation.js";

const requestTimeout = 1_000 * 60 * 1.5;

/**
 * Performs a generic HTTP request with a timeout.
 * Returns text, JSON, or Buffer based on the response Content-Type.
 *
 * @param {string} url - The URL to request.
 * @param {RequestInit} [options={}] - The fetch options.
 * @returns {Promise<any>} The response data.
 */
export const request = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

  try {
    options.signal = controller.signal;

    const response = await fetch(url, options);

    if (!response.ok) {
      await response.body?.cancel();
      throw new Error(response.statusText);
    }

    const contentType = response.headers.get("content-type");

    if (
      isMimeAudio(contentType) ||
      isMimeImage(contentType) ||
      isMimeVideo(contentType) ||
      contentType?.includes("octet")
    )
      return Buffer.from(await response.arrayBuffer());

    if (contentType?.startsWith("text")) return await response.text();

    return await response.json();
  } catch (error) {
    if (controller.signal.aborted)
      throw new Error(`Request timeout after ${requestTimeout}ms`);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Performs a HEAD request to determine the content type of a URL.
 *
 * @param {string} url - The URL to check.
 * @returns {Promise<string | null>} The content type, or null if not found.
 */
export const getContentType = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

  try {
    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(response.statusText);

    return response.headers.get("content-type");
  } catch (error) {
    if (controller.signal.aborted)
      throw new Error(`Request timeout after ${requestTimeout}ms`);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Makes a request to the Deline API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const deline = async (path = "", params = {}, options) =>
  request(
    `https://api.deline.web.id/` + path + "?" + new URLSearchParams(params),
    options,
  );

/**
 * Makes a request to the FAA API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const faa = async (path = "", params = {}, options) =>
  request(
    `https://api-faa.my.id/faa/` + path + "?" + new URLSearchParams(params),
    options,
  );

/**
 * Makes a request to the NekoLabs API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const nekolabs = async (path = "", params = {}, options) =>
  request(
    `https://rynekoo-api.hf.space/` + path + "?" + new URLSearchParams(params),
    options,
  );

/**
 * Makes a request to the Nexray API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const nexray = async (path = "", params = {}, options) =>
  request(
    `https://api.nexray.web.id/` + path + "?" + new URLSearchParams(params),
    options,
  );

/**
 * Makes a request to the Zenzxz API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const zenzxz = async (path = "", params = {}, options) =>
  request(
    `https://api.zenzxz.my.id/` + path + "?" + new URLSearchParams(params),
    options,
  );

/**
 * Makes a request to the Lexcode API.
 *
 * @param {string} [path=""] - The API path.
 * @param {Record<string, string>} [params={}] - The query parameters.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} The API response.
 */
export const lexcode = async (path = "", params = {}, options) =>
  request(
    `https://api.lexcode.biz.id/api/` + path + "?" + new URLSearchParams(params),
    options,
  );