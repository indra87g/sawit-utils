import moment from "moment-timezone";

/**
 * Returns a greeting message based on the current hour.
 * @param {number} [now=Date.now()] - The current timestamp in milliseconds.
 * @returns {string} The greeting message (e.g., "Good morning", "Good afternoon").
 */
export const greeting = (now = Date.now()) => {
  const hour = new Date(now).getHours();
  if (hour >= 4 && hour < 10) return "Good morning";
  if (hour >= 10 && hour < 15) return "Good afternoon";
  if (hour >= 15 && hour < 18) return "Good evening";
  return "Good night";
};

/**
 * Returns a medal emoji based on the index (0 for 1st, 1 for 2nd, 2 for 3rd, others get a generic medal).
 * @param {number} index - The zero-based index or rank.
 * @returns {string} The medal emoji.
 */
export const medal = (index) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return "🏅";
};

/**
 * Converts milliseconds to a format of HH:MM:SS.
 * @param {number} ms - The time in milliseconds.
 * @returns {string} The formatted time as "HH:MM:SS".
 */
export const toTime = (ms) => {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hrs = Math.floor(ms / (1000 * 60 * 60));

  return [hrs, min, sec]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};

/**
 * Formats a number with en-US locale string.
 * @param {number|string} number - The number to format.
 * @returns {string} The localized number string.
 */
export const formatNumber = (number) => Number(number).toLocaleString("en-US");

/**
 * Formats a given byte count into a human-readable string.
 * @param {number} byteCount - The size in bytes.
 * @param {boolean} [withPerSecond=false] - Whether to append "/s" at the end.
 * @returns {string} The formatted size string.
 */
export function formatSize(byteCount, withPerSecond = false) {
  if (!byteCount) return `0 yBytes${withPerSecond ? "/s" : ""}`;

  let index = 8;
  let size = byteCount;
  const bytes = [
    "yBytes",
    "zBytes",
    "aBytes",
    "fBytes",
    "pBytes",
    "nBytes",
    "µBytes",
    "mBytes",
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  while (size < 1 && index > 0) {
    size *= 1024;
    index--;
  }

  while (size >= 1024 && index < bytes.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${bytes[index]}${withPerSecond ? "/s" : ""}`;
}

/**
 * Formats a timestamp into a localized string.
 * @param {number} timestampMs - The timestamp in milliseconds.
 * @param {string} [locale="en-US"] - The locale string.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Options for toLocaleString.
 * @returns {string} The localized date and time string.
 */
export const formatTime = (timestampMs, locale = "en-US", options = {}) => {
  const date = new Date(timestampMs);
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    ...options,
  });
};

/**
 * Formats an uptime in milliseconds into days, hours, minutes, and seconds.
 * @param {number} startTime - The start timestamp in milliseconds.
 * @returns {string} The formatted uptime.
 */
export const formatUptime = (startTime) => {
  const uptime = Date.now() - startTime;
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

/**
 * Converts milliseconds to a human-readable duration string.
 * @param {number} ms - The duration in milliseconds.
 * @returns {string} The formatted duration string.
 */
export function convertMsToDuration(ms) {
  if (!ms || ms <= 0) return "0 seconds";

  const duration = moment.duration(ms);
  const hasLargerUnits = duration.asSeconds() >= 1;

  const parts = [];

  if (duration.years() > 0) parts.push(`${duration.years()} years`);
  if (duration.months() > 0) parts.push(`${duration.months()} months`);
  if (duration.weeks() > 0) parts.push(`${duration.weeks()} weeks`);
  if (duration.days() > 0) parts.push(`${duration.days()} days`);
  if (duration.hours() > 0) parts.push(`${duration.hours()} hours`);
  if (duration.minutes() > 0) parts.push(`${duration.minutes()} minutes`);
  if (duration.seconds() > 0) parts.push(`${duration.seconds()} seconds`);

  if (!hasLargerUnits && duration.milliseconds() > 0)
    parts.push(`${duration.milliseconds()} milliseconds`);

  return parts.join(" ") || "0 detik";
}
