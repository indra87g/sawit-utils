import { setTimeout as delay } from "node:timers/promises";

import { watch } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import { toArray } from "./array.js";

/**
 * Cache for file metadata (mtime and size).
 * @type {Map<string, {mtimeMs: number, size: number}>}
 */
export const FileCache = new Map();
/**
 * Cache for loaded modules.
 * @type {Map<string, any>}
 */
export const ModuleCache = new Map();
/**
 * Index mapping command names to their respective modules.
 * @type {Map<string, any>}
 */
export const CommandIndex = new Map();
/**
 * Set containing event handler modules (modules without a specific command).
 * @type {Set<any>}
 */
export const EventIndex = new Set();
const Processing = new Set();

const normalizeCommand = (string) => string.replace(/\s+/g, "").toLowerCase();

/**
 * Indexes a module by its commands or adds it to the event index.
 *
 * @param {any} module - The loaded module object.
 */
export const indexModule = (module) => {
  if (module.command) {
    for (const key of ["command", "hidden"])
      for (const value of toArray(module[key])) {
        if (typeof value !== "string") continue;
        CommandIndex.set(normalizeCommand(value), module);
      }
  } else EventIndex.add(module);
};

const unindexModule = (filePath) => {
  const cachedModule = ModuleCache.get(filePath);
  if (!cachedModule) return;

  if (cachedModule.command) {
    for (const key of ["command", "hidden"])
      for (const value of toArray(cachedModule[key]))
        CommandIndex.delete(normalizeCommand(value));
  } else EventIndex.delete(cachedModule);

  ModuleCache.delete(filePath);
};

const loadModule = async (filePath) => {
  try {
    const url = new URL(
      `file://${join(process.cwd(), filePath)}?update=${Date.now()}`,
    );
    const mod = await import(url.href);
    const module = mod.default ?? mod;

    ModuleCache.set(filePath, module);

    indexModule(module);

    return mod;
  } catch (error) {
    console.error("❌ Failed to load", ":", filePath);
    console.error(error);
  }
};

/**
 * Scans a directory recursively, loads .js files, and watches for changes.
 *
 * @param {string} directory - The path to the directory to scan.
 * @returns {Promise<void>}
 */
export const scanDirectory = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await scanDirectory(fullPath);
    } else if (entry.isFile() || fullPath.endsWith(".js")) {
      const stats = await stat(fullPath);

      FileCache.set(fullPath, {
        mtimeMs: stats.mtimeMs,
        size: stats.size,
      });

      await loadModule(fullPath);
    }
  }

  await watchDirectory(directory);
};

const watchDirectory = async (directory) => {
  watch(directory, (_event, fileName) => {
    if (!fileName) return;

    handleChange(join(directory, fileName));
  });

  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries)
    if (entry.isDirectory()) watchDirectory(join(directory, entry.name));
};

const handleChange = async (filePath) => {
  if (!filePath.endsWith(".js")) return;
  if (Processing.has(filePath)) return;

  Processing.add(filePath);

  try {
    await delay(500);

    const stats = await stat(filePath);

    if (!stats.isFile()) return;

    const cachedFile = FileCache.get(filePath);

    const changed =
      !cachedFile ||
      cachedFile.mtimeMs !== stats.mtimeMs ||
      cachedFile.size !== stats.size;

    if (!changed) return;

    unindexModule(filePath);
    FileCache.set(filePath, {
      mtimeMs: stats.mtimeMs,
      size: stats.size,
    });

    await loadModule(filePath);

    console.log(cachedFile ? "🔔 Updated" : "➕ Added", ":", filePath);
  } catch {
    FileCache.delete(filePath);
    unindexModule(filePath);
    console.log("🗑️ Deleted", ":", filePath);
  } finally {
    await delay(300);

    Processing.delete(filePath);
  }
};
