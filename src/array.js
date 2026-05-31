/**
 * Converts a value to an array. If the value is undefined or null, returns an empty array.
 * If the value is already an array, returns it. Otherwise, returns a single-element array containing the value.
 *
 * @template T
 * @param {T|T[]|undefined|null} value - The value to convert.
 * @returns {T[]} An array containing the value, or an empty array.
 */
export const toArray = (value) => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

/**
 * Shuffles the elements of an array in place using the Fisher-Yates algorithm.
 *
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} A new array with its elements shuffled.
 */
export const shuffleArray = (array) => {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between min and max.
 */
export const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Selects a random element from an array.
 *
 * @template T
 * @param {T[]} array - The array to select from.
 * @returns {T} A randomly selected element from the array.
 */
export const randomValue = (array) => array[Math.floor(Math.random() * array.length)];
