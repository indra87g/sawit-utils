/**
 * This file is part of the Starseed Bot WhatsApp project, solely developed and maintained by Lia Wynn.
 * https://github.com/itsliaaa/starseed
 *
 * All rights reserved.
 *
 * - You are NOT allowed to copy, rewrite, modify, redistribute, or reuse this file in any form.
 * - You are NOT allowed to claim this file or any part of this project as your own.
 * - This credit notice must NOT be removed or altered.
 * - This file may ONLY be used within the Starseed project.
 */

import { isMimeAudio, isMimeImage, isMimeVideo } from "./validation.js";

const defaultRegistry = {
  turu: "https://mending-turu.web.id/api/",
  lexcode: "https://api.lexcode.biz.id/api/",
  zenzxz: "https://api.zenzxz.my.id/",
  faa: "https://api-faa.my.id/faa",
  nexray: "https://api.nexray.web.id/",
  deline: "https://api.deline.web.id/",
  xemoz: "https://api-xemoz-official.my.id/api/",
};

/**
 * A client for making API requests to registered endpoints.
 */
export class ApiClient {
  #requestTimeout = 1_000 * 60 * 1.5;
  #registry;

  /**
   * @param {Object} [config={}] - Client configuration.
   * @param {Record<string, string>} [config.registry] - Extra endpoints to register, merged over (and overriding) the built-in defaults.
   * @param {number} [config.timeout] - Request timeout in milliseconds.
   */
  constructor(config = {}) {
    this.#registry = { ...defaultRegistry, ...(config.registry ?? {}) };
    if (typeof config.timeout === "number") {
      this.#requestTimeout = config.timeout;
    }
    
    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (prop in target || typeof prop === "symbol") {
          const value = Reflect.get(target, prop, receiver);
          return typeof value === "function" ? value.bind(target) : value;
        }

        return async (path = "", params = {}, options = {}) => {
          return target.callApiFromProxy(prop, path, params, options);
        };
      }
    });  
  }

  /**
   * Registers (or overrides) a named endpoint at runtime.
   *
   * @param {string} name - The endpoint name.
   * @param {string} baseUrl - The base URL for the endpoint.
   */
  register(name, baseUrl) {
    this.#registry[name] = baseUrl;
  }
  
  async callApiFromProxy(apiName, path = "", params = {}, options = {}) {
    const baseUrl = this.#registry[apiName];
    if (!baseUrl) {
      throw new Error(`API Endpoint '${apiName}' is not registered on Registry.`);
    }

    const url = this.#buildUrl(baseUrl, path, params);
    return this.request(url, options);
  }

  /**
   * Makes an HTTP request to the specified URL.
   *
   * @param {string} url - The URL to request.
   * @param {RequestInit} [options={}] - The fetch options.
   * @returns {Promise<any>} The response data, parsed as JSON, text, or a Buffer depending on the content type.
   * @throws {Error} If the request fails or times out.
   */
  async request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.#requestTimeout,
    );

    try {
      options.signal = controller.signal;
      const response = await fetch(url, options);

      if (!response.ok) {
        await response.body?.cancel();
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");

      if (
        isMimeAudio(contentType) ||
        isMimeImage(contentType) ||
        isMimeVideo(contentType) ||
        contentType?.includes("octet")
      ) {
        return Buffer.from(await response.arrayBuffer());
      }

      if (contentType?.startsWith("text")) {
        return await response.text();
      }
      
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`Request timeout after ${this.#requestTimeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  
  #buildUrl(baseUrl, path, params) {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(cleanPath, baseUrl);

    if (params && Object.keys(params).length > 0) {
      url.search = new URLSearchParams(params).toString();
    }

    return url.toString();
  }

  async getContentType(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.#requestTimeout);

    try {
      const response = await fetch(url, { method: "HEAD", signal: controller.signal });
      if (!response.ok) throw new Error(response.statusText);
      return response.headers.get("content-type");
    } catch (error) {
      if (controller.signal.aborted) {
        throw new Error(`Request timeout after ${this.#requestTimeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

/**
 * A pre-instantiated API client.
 * @type {ApiClient}
 */
export const api = new ApiClient();
