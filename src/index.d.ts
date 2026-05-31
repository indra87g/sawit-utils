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
export function looksLikeCode(text: string): boolean;

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

// Request
export class ApiClient {
  request(url: string, options?: RequestInit): Promise<any>;
  getContentType(url: string): Promise<string | null>;
  deline(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  faa(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  nexray(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  zenzxz(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  lexcode(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  turu(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
  xemoz(path?: string, params?: Record<string, string>, options?: RequestInit): Promise<any>;
}

export const api: ApiClient;

// Array
export function toArray<T>(value: T | T[] | undefined | null): T[];
export function shuffleArray<T>(array: T[]): T[];
export function randomInteger(min: number, max: number): number;
export function randomValue<T>(array: T[]): T;

// Parsing
export function extractMessageBody(m: any): string;
export function extractNumber(msg: any, options?: { netSuffix?: string }): string | undefined;
export function parseCommand(body: string, setting?: { prefixes?: string[], noPrefix?: boolean }): { prefix: string, command: string, text: string, args: string[], isHasPrefix: boolean };
export function toTitleCase(str?: string): string;
export function parseMentions(text: string, options?: { netSuffix?: string }): string[];

// Watcher
export const FileCache: Map<string, any>;
export const ModuleCache: Map<string, any>;
export const CommandIndex: Map<string, any>;
export const EventIndex: Set<any>;
export function indexModule(module: any): void;
export function scanDirectory(directory: string): Promise<void>;
