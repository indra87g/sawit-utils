export const greeting = (now = Date.now()) => {
  const hour = new Date(now).getHours();
  if (hour >= 4 && hour < 10) return "Good morning";
  if (hour >= 10 && hour < 15) return "Good afternoon";
  if (hour >= 15 && hour < 18) return "Good evening";
  return "Good night";
};

export const medal = (index) => {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return "🏅";
};

export const toTime = (ms) => {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hrs = Math.floor(ms / (1000 * 60 * 60));

  return [hrs, min, sec]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
};

export const formatNumber = (number) => Number(number).toLocaleString("en-US");

export const formatSize = (bytes) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = Number(bytes) || 0;
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
};

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

export const formatUptime = (startTime) => {
  const uptime = Date.now() - startTime;
  const seconds = Math.floor((uptime / 1000) % 60);
  const minutes = Math.floor((uptime / (1000 * 60)) % 60);
  const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
