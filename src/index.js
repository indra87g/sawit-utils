export * from "./format.js";
export * from "./string.js";
export * from "./validation.js";
export { igdl } from "./scraper/igdl.js";

/**
 * Generates a unique ID based on the provided string.
 * @param {string} id - The base string to generate UID from.
 * @returns {string|null} The generated UID or null if the input is empty.
 */
export function generateUID(id) {
  if (!id) return null;

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const charCode = id.charCodeAt(i);
    hash = (hash * 31 + charCode) % 1000000007;
  }

  const uniquePart = id.split("").reverse().join("").charCodeAt(0).toString(16);
  let uid = `${Math.abs(hash).toString(16).toLowerCase()}-${uniquePart}`;
  return uid;
}

/**
 * Gets a random element from the provided array.
 * @param {Array<any>} array - The array to get an element from.
 * @returns {any|null} The random element or null if the array is empty.
 */
export function getRandomElement(array) {
  if (!array || !array.length || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Delays execution by the specified milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>|null} A Promise that resolves after the specified delay, or null if no ms is provided.
 */
export function delay(ms) {
  if (!ms) return null;
  return new Promise((res) => setTimeout(res, ms));
}
