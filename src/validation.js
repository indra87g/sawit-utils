/**
 * Checks if a given MIME type is an image.
 * @param {string} mime - The MIME type string.
 * @returns {boolean} True if it is an image, false otherwise.
 */
export const isMimeImage = (mime) =>
  typeof mime === "string" && mime.startsWith("image");

/**
 * Checks if a given MIME type is a video.
 * @param {string} mime - The MIME type string.
 * @returns {boolean} True if it is a video, false otherwise.
 */
export const isMimeVideo = (mime) =>
  typeof mime === "string" && mime.startsWith("video");

/**
 * Checks if a given MIME type is a GIF.
 * @param {string} mime - The MIME type string.
 * @returns {boolean} True if it is a GIF, false otherwise.
 */
export const isMimeGif = (mime) =>
  typeof mime === "string" && mime.endsWith("gif");

/**
 * Checks if a given MIME type is a WebP image.
 * @param {string} mime - The MIME type string.
 * @returns {boolean} True if it is a WebP, false otherwise.
 */
export const isMimeWebP = (mime) =>
  typeof mime === "string" && mime.endsWith("webp");

/**
 * Checks if a given MIME type is an audio format.
 * @param {string} mime - The MIME type string.
 * @returns {boolean} True if it is an audio format, false otherwise.
 */
export const isMimeAudio = (mime) =>
  typeof mime === "string" && mime.startsWith("audio");

/**
 * Checks if an object is empty.
 * @param {Object} object - The object to check.
 * @returns {boolean} True if empty, false otherwise.
 */
export const isEmptyObject = (object) => {
  for (const _ in object) return false;
  return true;
};

/**
 * Checks if a given string is a valid URL.
 * @param {string} string - The string to validate.
 * @returns {boolean} True if it is a URL, false otherwise.
 */
export const isURL = (string) => {
  if (typeof string !== "string") return false;
  const urlRegex = /^(https?:\/\/)[^\s]+$/i;
  return URL.canParse(string) || urlRegex.test(string);
};

/**
 * Checks if a given string is a valid WhatsApp URL.
 * @param {string} string - The string to validate.
 * @returns {boolean} True if it is a WhatsApp URL, false otherwise.
 */
export const isWhatsAppURL = (string) => {
  if (typeof string !== "string") return false;
  const whatsappRegex =
    /https?:\/\/(www\.)?(chat\.whatsapp\.com\/[A-Za-z0-9]+|whatsapp\.com\/channel\/[A-Za-z0-9]+|wa\.me\/(\d+|p\/[A-Za-z0-9]+|c\/[A-Za-z0-9]+)(\?[^\s]*)?)/i;
  return string.includes("whatsapp.com") || whatsappRegex.test(string);
};
