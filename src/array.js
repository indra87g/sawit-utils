export const toArray = (value) => {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
};

export const shuffleArray = (array) => {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

export const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomValue = (array) => array[Math.floor(Math.random() * array.length)];
