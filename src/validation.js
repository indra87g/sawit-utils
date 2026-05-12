export const isMimeImage = (mime) =>
  typeof mime === "string" && mime.startsWith("image");

export const isMimeVideo = (mime) =>
  typeof mime === "string" && mime.startsWith("video");

export const isMimeGif = (mime) =>
  typeof mime === "string" && mime.endsWith("gif");

export const isMimeWebP = (mime) =>
  typeof mime === "string" && mime.endsWith("webp");

export const isMimeAudio = (mime) =>
  typeof mime === "string" && mime.startsWith("audio");

export const isEmptyObject = (object) => {
  for (const _ in object) return false;
  return true;
};

export const isURL = (string) => {
  if (typeof string !== "string") return false;
  const urlRegex = /^(https?:\/\/)[^\s]+$/i;
  return URL.canParse(string) || urlRegex.test(string);
};

export const isWhatsAppURL = (string) => {
  if (typeof string !== "string") return false;
  const whatsappRegex =
    /https?:\/\/(www\.)?(chat\.whatsapp\.com\/[A-Za-z0-9]+|whatsapp\.com\/channel\/[A-Za-z0-9]+|wa\.me\/(\d+|p\/[A-Za-z0-9]+|c\/[A-Za-z0-9]+)(\?[^\s]*)?)/i;
  return string.includes("whatsapp.com") || whatsappRegex.test(string);
};
