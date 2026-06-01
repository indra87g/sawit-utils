import {
  CommandIndex,
  EventIndex,
  FileCache,
  ModuleCache,
  indexModule,
  scanDirectory,
} from "../src/watcher.js";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

const clearState = () => {
  CommandIndex.clear();
  EventIndex.clear();
  FileCache.clear();
  ModuleCache.clear();
};

describe("watcher - indexModule", () => {
  beforeEach(clearState);

  test("indexes a module under each of its command names (normalized)", () => {
    const mod = { command: ["Ping", "P I N G"], run: () => {} };
    indexModule(mod);
    expect(CommandIndex.get("ping")).toBe(mod);
    expect(CommandIndex.get("ping")).toBe(mod); // "P I N G" normalizes to the same key
    expect(CommandIndex.size).toBe(1);
  });

  test("also indexes hidden aliases", () => {
    const mod = { command: "menu", hidden: ["m", "help"] };
    indexModule(mod);
    expect(CommandIndex.get("menu")).toBe(mod);
    expect(CommandIndex.get("m")).toBe(mod);
    expect(CommandIndex.get("help")).toBe(mod);
  });

  test("ignores non-string command entries", () => {
    const mod = { command: ["valid", 123, null] };
    indexModule(mod);
    expect(CommandIndex.get("valid")).toBe(mod);
    expect(CommandIndex.size).toBe(1);
  });

  test("modules without a command go to the event index", () => {
    const mod = { event: "message", run: () => {} };
    indexModule(mod);
    expect(EventIndex.has(mod)).toBe(true);
    expect(CommandIndex.size).toBe(0);
  });
});

describe("watcher - scanDirectory", () => {
  let dir;
  let relDir;

  beforeEach(async () => {
    clearState();
    // loadModule resolves paths against process.cwd(), so use a path that
    // join(cwd, path) keeps intact: make a temp dir and pass its relative form.
    dir = await mkdtemp(join(tmpdir(), "sawit-watch-"));
    relDir = relative(process.cwd(), dir);
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
    clearState();
  });

  test("loads .js modules into the caches and indexes", async () => {
    await writeFile(
      join(dir, "ping.js"),
      "export default { command: 'ping', run: () => 'pong' };",
    );
    await writeFile(
      join(dir, "onmsg.js"),
      "export default { event: 'message', run: () => {} };",
    );

    await scanDirectory(relDir);

    expect(CommandIndex.get("ping")).toBeTruthy();
    expect(EventIndex.size).toBe(1);
    expect(ModuleCache.size).toBe(2);
    // FileCache records mtime/size metadata for each scanned file.
    expect(FileCache.size).toBe(2);
    for (const meta of FileCache.values()) {
      expect(meta).toHaveProperty("mtimeMs");
      expect(meta).toHaveProperty("size");
    }
  });

  test("recurses into subdirectories", async () => {
    const sub = join(dir, "nested");
    await mkdir(sub, { recursive: true });
    await writeFile(join(sub, "a.js"), "export default { command: 'a' };");

    await scanDirectory(relDir);

    expect(CommandIndex.get("a")).toBeTruthy();
  });
});
