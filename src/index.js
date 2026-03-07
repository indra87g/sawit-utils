import moment from "moment-timezone";

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

export function getRandomElement(array) {
  if (!array || !array.length || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
}

export function isUrl(url) {
  if (!url) return false;
  return /(https?:\/\/[^\s]+)/g.test(url);
}

export function delay(ms) {
  if (!ms) return null;
  return new Promise((res) => setTimeout(res, ms));
}

export const formatUptime = (startTime) => {
  const uptime = Date.now() - startTime;
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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

export { igdl } from "./scraper/igdl.js";