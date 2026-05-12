/**
 * Calculates the Levenshtein distance between two strings.
 * @param {string} value - The first string.
 * @param {string} other - The second string.
 * @param {number} [maxDistance=Infinity] - The maximum distance allowed before bailing out.
 * @returns {number} The Levenshtein distance.
 */
export const levenshtein = (value, other, maxDistance = Infinity) => {
  if (value === other) return 0;
  if (!value.length) return other.length;
  if (!other.length) return value.length;

  const v0 = new Array(other.length + 1);
  const v1 = new Array(other.length + 1);

  for (let i = 0; i <= other.length; i++) v0[i] = i;

  for (let i = 0; i < value.length; i++) {
    v1[0] = i + 1;
    let rowMin = v1[0];

    for (let j = 0; j < other.length; j++) {
      const cost = value[i] === other[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      rowMin = Math.min(rowMin, v1[j + 1]);
    }

    if (rowMin > maxDistance) return maxDistance + 1;

    for (let j = 0; j <= other.length; j++) v0[j] = v1[j];
  }

  return v1[other.length];
};

/**
 * Finds the top matching commands based on the input string using Levenshtein distance.
 * @param {string} input - The user input.
 * @param {string[]} [commands=[]] - The list of available commands.
 * @param {number} [limit=3] - The maximum number of suggestions to return.
 * @returns {string[]} An array of top suggested commands.
 */
export const findTopSuggestions = (input, commands = [], limit = 3) => {
  const query = String(input || "").toLowerCase().trim();
  if (!query) return [];

  return commands
    .map((command) => ({
      command,
      distance: levenshtein(query, String(command).toLowerCase(), 3),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map((item) => item.command);
};

/**
 * Escapes HTML characters in a string to prevent XSS attacks.
 * @param {string} text - The input string to escape.
 * @returns {string} The escaped string.
 */
export const escapeHTML = (text) => {
  if (!text) return "";
  return text
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
