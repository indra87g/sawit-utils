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
