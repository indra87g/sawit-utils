import { isMimeAudio, isMimeImage, isMimeVideo } from "./validation.js";

const registry = {
    turu: "https://mending-turu.web.id/api/",
    lexcode: "https://api.lexcode.biz.id/api/",
    zenzxz: "https://api.zenzxz.my.id/",
    faa: "https://api-faa.my.id/faa",
    nexray: "https://api.nexray.web.id/",
    deline: "https://api.deline.web.id/",
    xemoz: "https://api-xemoz-official.my.id/api/"
}

export class ApiClient {
  #requestTimeout = 1_000 * 60 * 1.5;

  async request(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.#requestTimeout);

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

      // Membaca text terlebih dahulu untuk mencegah error JSON parsing jika body kosong
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
  
  async #callApi(apiName, path = "", params = {}, options) {
    const baseUrl = registry[apiName];
    if (!baseUrl) {
      throw new Error(`API Endpoint '${apiName}' is not registered on Registry.`);
    }
    
    const url = this.#buildUrl(baseUrl, path, params);
    return this.request(url, options);
  }

  async getContentType(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.#requestTimeout);

    try {
      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
      });

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
  
  async deline(path, params, options)   { return this.#callApi("deline", path, params, options); }
  async faa(path, params, options)      { return this.#callApi("faa", path, params, options); }
  async nexray(path, params, options)   { return this.#callApi("nexray", path, params, options); }
  async zenzxz(path, params, options)   { return this.#callApi("zenzxz", path, params, options); }
  async lexcode(path, params, options)  { return this.#callApi("lexcode", path, params, options); }
  async turu(path, params, options)  { return this.#callApi("turu", path, params, options); }
  async xemoz(path, params, options)  { return this.#callApi("xemoz", path, params, options); }
}

export const api = new ApiClient();