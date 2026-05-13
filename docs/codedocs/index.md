---
title: "Getting Started"
description: "Use sawit-utils to format values, validate input, sanitize text, and scrape Instagram reel metadata from one ESM package."
---

`sawit-utils` is a small ESM utility package that bundles formatting helpers, string matching, validation helpers, and one Instagram reel downloader helper behind a single import path.

## The Problem

- Bot and automation code often ends up with duplicated helpers for time, sizes, IDs, and random selection.
- Command-driven apps need lightweight fuzzy matching and HTML escaping, but pulling in a large framework is usually overkill.
- Input validation is repetitive when you are checking MIME types, URLs, WhatsApp links, and empty objects across multiple handlers.
- Instagram reel downloading usually means stitching together unofficial scraping logic every time you need it.

## The Solution

`sawit-utils` centralizes those common jobs behind the package root export, `sawit-utils`. Internally, `src/index.js` re-exports focused helpers from `src/format.js`, `src/string.js`, `src/validation.js`, and `src/scraper/igdl.js`, so application code stays flat even though the implementation is split by concern.

```ts
import {
  formatSize,
  findTopSuggestions,
  isURL,
  igdl,
} from "sawit-utils";

console.log(formatSize(1048576));
console.log(findTopSuggestions("hep", ["help", "hello", "stats"]));
console.log(isURL("https://example.com"));

const reel = await igdl("https://www.instagram.com/reel/C8abc123xyz/");
if (reel.success) {
  console.log(reel.data.videoUrl);
}
```

## Installation

" "bun"]}>
<Tab value="npm">

```bash
npm install sawit-utils
```

</Tab>
<Tab value="pnpm">

```bash
pnpm add sawit-utils
```

</Tab>
<Tab value="yarn">

```bash
yarn add sawit-utils
```

</Tab>
<Tab value="bun">

```bash
bun add sawit-utils
```

</Tab>
</Tabs>

The repository also includes `jsr.json`, so the project is prepared for JSR publication as `@indra87g/sawit-utils`, but the published package entry in `package.json` is the npm package name `sawit-utils`.

## Quick Start

This example stays inside the deterministic part of the library so you can confirm your setup immediately.

```ts
import {
  greeting,
  toTime,
  formatNumber,
  generateUID,
} from "sawit-utils";

const eightAmUtc = new Date("2023-01-01T08:00:00Z").getTime();

console.log(greeting(eightAmUtc));
console.log(toTime(3661000));
console.log(formatNumber(1234567));
console.log(generateUID("alpha"));
```

Expected output:

```txt
Good morning
01:01:01
1,234,567
<stable hex-based id for "alpha">
```

## Key Features

- Single import path, `sawit-utils`, for all public functions and exported Instagram result types.
- Formatting helpers for greetings, rankings, byte sizes, timestamps, uptime, and human-readable durations.
- String helpers for Levenshtein distance, lightweight command suggestions, and HTML escaping.
- Validation helpers for MIME categories, URL checks, WhatsApp URL checks, and empty-object detection.
- A normalized `igdl()` scraper that extracts Instagram video download URLs into a predictable success or error union.
- TypeScript declarations in `src/index.d.ts` and `src/types/igdl.d.ts`.

Supported environments are modern JavaScript runtimes that can run ESM and provide standard web APIs used by the codebase, including `fetch`, `URLSearchParams`, `Intl.DateTimeFormat`, and `URL.canParse`. The package is authored as `"type": "module"` in `package.json`.

<Cards>
  <Card title="Architecture" href="/docs/architecture">See how the package is organized around one barrel file and four focused modules.</Card>
  <Card title="Core Concepts" href="/docs/formatting-utilities">Start with the core abstractions: formatting, string processing, validation, and scraping.</Card>
  <Card title="API Reference" href="/docs/api-reference/format">Jump to exact signatures, defaults, types, and source file locations.</Card>
</Cards>
