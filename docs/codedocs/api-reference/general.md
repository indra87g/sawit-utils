---
title: "General API"
description: "Reference for the general-purpose helpers defined directly in src/index.js."
---

Import path for every API on this page:

```ts
import {
  generateUID,
  getRandomElement,
  delay,
} from "sawit-utils";
```

Source file: `src/index.js`

## `generateUID(id: string): string | null`

Generates a stable identifier from an input string using a simple rolling hash plus one reversed-character code.

```ts
function generateUID(id: string): string | null;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | string | — | Base string to hash. Falsy input returns `null`. |

Returns: `string \| null`

```ts
console.log(generateUID("alpha"));
```

## `getRandomElement<T>(array: T[]): T | null`

Returns one random array element.

```ts
function getRandomElement<T>(array: T[]): T | null;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `array` | `T[]` | — | Source array. Empty or falsy arrays return `null`. |

Returns: `T \| null`

```ts
console.log(getRandomElement(["red", "green", "blue"]));
```

## `delay(ms: number): Promise<void> | null`

Returns a promise that resolves after the requested number of milliseconds.

```ts
function delay(ms: number): Promise<void> | null;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `ms` | number | — | Delay length in milliseconds. Falsy input returns `null`. |

Returns: `Promise<void> \| null`

```ts
await delay(100);
```

## Common Composition Pattern

These helpers work well for lightweight orchestration:

```ts
import {
  generateUID,
  getRandomElement,
  delay,
} from "sawit-utils";

const colors = ["red", "green", "blue"];
const requestId = generateUID("status");
const chosen = getRandomElement(colors);

await delay(25);
console.log({ requestId, chosen });
```

## Behavior Notes

- `generateUID()` is deterministic for the same non-empty input, so it can be used for lightweight request labels or cache keys where collisions are acceptable.
- `getRandomElement()` is intentionally tiny and uses `Math.random()`, which makes it suitable for user-facing variety but not for cryptographic or fairness-sensitive selection.
- `delay()` returns `null` for falsy input instead of an already resolved promise, so callers that accept `0` as a valid delay should normalize that case before awaiting.

These details come directly from the implementations in `src/index.js`, and they are worth keeping in mind when you wrap the helpers in higher-level flows.

Related pages: [Build a Bot Response Pipeline](/docs/guides/build-a-bot-response-pipeline) and [Architecture](/docs/architecture).
