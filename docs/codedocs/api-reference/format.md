---
title: "Format API"
description: "Reference for the formatting helpers exported from sawit-utils."
---

Import path for every API on this page:

```ts
import {
  greeting,
  medal,
  toTime,
  formatNumber,
  formatSize,
  formatTime,
  formatUptime,
  convertMsToDuration,
} from "sawit-utils";
```

Source file: `src/format.js`

## `greeting(now?: number): string`

Returns a greeting based on the hour in the provided timestamp.

```ts
function greeting(now?: number): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `now` | number | `Date.now()` | Timestamp in milliseconds used to determine the current hour. |

Returns: `string`

```ts
console.log(greeting(new Date("2023-01-01T08:00:00Z").getTime()));
```

## `medal(index: number): string`

Maps rank indexes to medal emoji.

```ts
function medal(index: number): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `index` | number | — | Zero-based ranking index. `0`, `1`, and `2` map to gold, silver, and bronze. |

Returns: `string`

```ts
console.log(medal(0));
```

## `toTime(ms: number): string`

Formats milliseconds as `HH:MM:SS`.

```ts
function toTime(ms: number): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ms` | number | — | Duration in milliseconds. |

Returns: `string`

```ts
console.log(toTime(3_661_000));
```

## `formatNumber(number: number | string): string`

Formats a numeric value with `en-US` locale separators.

```ts
function formatNumber(number: number | string): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `number` | number \| string | — | Value converted through `Number()` before locale formatting. |

Returns: `string`

```ts
console.log(formatNumber("1500000"));
```

## `formatSize(byteCount: number, withPerSecond?: boolean): string`

Formats bytes into a human-readable binary unit string.

```ts
function formatSize(byteCount: number, withPerSecond?: boolean): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `byteCount` | number | — | Raw byte count. Values above and below `Bytes` are scaled by powers of `1024`. |
| `withPerSecond` | boolean | `false` | When `true`, appends `/s` to the formatted unit. |

Returns: `string`

```ts
console.log(formatSize(100_000_000));
console.log(formatSize(100_000_000, true));
```

## `formatTime(timestampMs: number, locale?: string, options?: Intl.DateTimeFormatOptions): string`

Formats a timestamp with locale and `Intl` options.

```ts
function formatTime(
  timestampMs: number,
  locale?: string,
  options?: Intl.DateTimeFormatOptions,
): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `timestampMs` | number | — | Timestamp in milliseconds. |
| `locale` | string | `"en-US"` | Locale string passed to `toLocaleString`. |
| `options` | `Intl.DateTimeFormatOptions` | `{}` | Additional formatting options merged over the defaults in `src/format.js`. |

Returns: `string`

```ts
console.log(formatTime(Date.now(), "en-GB", { timeZone: "UTC" }));
```

## `formatUptime(startTime: number): string`

Computes elapsed time from a start timestamp to `Date.now()`.

```ts
function formatUptime(startTime: number): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `startTime` | number | — | Process or task start timestamp in milliseconds. |

Returns: `string`

```ts
const started = Date.now() - 10_000;
console.log(formatUptime(started));
```

## `convertMsToDuration(ms: number): string`

Converts milliseconds to a longer human-readable duration string.

```ts
function convertMsToDuration(ms: number): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ms` | number | — | Duration in milliseconds. Non-positive values return `"0 seconds"`. |

Returns: `string`

```ts
console.log(convertMsToDuration(90_500));
```

## Common Composition Pattern

These helpers are most useful when combined in one view model:

```ts
import {
  greeting,
  formatNumber,
  formatSize,
  formatTime,
} from "sawit-utils";

const message = [
  greeting(Date.now()),
  `Users: ${formatNumber(1200345)}`,
  `Traffic: ${formatSize(5242880, true)}`,
  `Generated: ${formatTime(Date.now())}`,
].join("
");
```

Related pages: [Formatting Utilities](/docs/formatting-utilities) and [General API](/docs/api-reference/general).
