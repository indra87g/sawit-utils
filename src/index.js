export * from "./array.js";
import * from "./array.js";
export * from "./format.js";
export * from "./parsing.js";
export * from "./string.js";
export * from "./validation.js";
export * from "./request.js";
export * from "./watcher.js";

/**
 * Generates a deterministic ID derived from the provided string. The same input
 * always produces the same output. Two independent rolling hashes are combined
 * so distinct inputs are very unlikely to collide.
 * @param {string} id - The base string to generate the ID from.
 * @returns {string|null} The generated ID or null if the input is empty.
 */
export function generateUID(id) {
  if (!id) return null;

  let hash = 0;
  let mix = 0;
  for (let i = 0; i < id.length; i++) {
    const charCode = id.charCodeAt(i);
    hash = (hash * 31 + charCode) % 1000000007;
    mix = (mix * 131 + charCode * (i + 1)) % 1000000007;
  }

  const left = Math.abs(hash).toString(16).toLowerCase();
  const right = Math.abs(mix).toString(16).toLowerCase();
  return `${left}-${right}`;
}

/**
 * Gets a random element from the provided array. Alias of {@link randomValue}.
 * @param {Array<any>} array - The array to get an element from.
 * @returns {any|null} The random element or null if the array is empty.
 */
export function getRandomElement(array) {
  return randomValue(array);
}

/**
 * Delays execution by the specified milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>|null} A Promise that resolves after the specified delay, or null if no ms is provided.
 */
export function delay(ms) {
  if (ms == null) return null;
  return new Promise((res) => setTimeout(res, ms));
}
