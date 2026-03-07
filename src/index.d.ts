export function convertMsToDuration(ms: number): string;

export function formatSize(
  byteCount: number,
  withPerSecond?: boolean
): string;

export function generateUID(id: string): string | null;

export function getRandomElement<T>(array: T[]): T | null;

export function isUrl(url: string): boolean;

export function delay(ms: number): Promise<void> | null;

export const formatUptime: (startTime: number) => string;

export const escapeHTML: (text: string) => string;

export type {
  IgdlVideo,
  IgdlData,
  IgdlSuccessResult,
  IgdlErrorResult,
  IgdlResult,
} from "./types/igdl.js";

export { igdl } from "./scraper/igdl.js";