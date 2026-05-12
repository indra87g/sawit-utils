// Format
export function greeting(now?: number): string;
export function medal(index: number): string;
export function toTime(ms: number): string;
export function formatNumber(number: number | string): string;
export function formatSize(byteCount: number, withPerSecond?: boolean): string;
export function formatTime(timestampMs: number, locale?: string, options?: Intl.DateTimeFormatOptions): string;
export function formatUptime(startTime: number): string;
export function convertMsToDuration(ms: number): string;

// String
export function levenshtein(value: string, other: string, maxDistance?: number): number;
export function findTopSuggestions(input: string, commands?: string[], limit?: number): string[];
export function escapeHTML(text: string): string;

// Validation
export function isMimeImage(mime: string): boolean;
export function isMimeVideo(mime: string): boolean;
export function isMimeGif(mime: string): boolean;
export function isMimeWebP(mime: string): boolean;
export function isMimeAudio(mime: string): boolean;
export function isEmptyObject(object: object): boolean;
export function isURL(string: string): boolean;
export function isWhatsAppURL(string: string): boolean;

// Index
export function generateUID(id: string): string | null;
export function getRandomElement<T>(array: T[]): T | null;
export function delay(ms: number): Promise<void> | null;

// Igdl
export type {
  IgdlVideo,
  IgdlData,
  IgdlSuccessResult,
  IgdlErrorResult,
  IgdlResult,
} from "./types/igdl.js";
export function igdl(url: string): Promise<import("./types/igdl.js").IgdlResult>;
