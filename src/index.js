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

export function delay(ms) {
  if (!ms) return null;
  return new Promise((res) => setTimeout(res, ms));
}

export * from "./format.js";
export * from "./string.js";
export * from "./validation.js";
export { igdl } from "./scraper/igdl.js";