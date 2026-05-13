---
title: "String API"
description: "Reference for the string processing helpers exported from sawit-utils."
---

Import path for every API on this page:

```ts
import {
  levenshtein,
  findTopSuggestions,
  escapeHTML,
} from "sawit-utils";
```

Source file: `src/string.js`

## `levenshtein(value: string, other: string, maxDistance?: number): number`

Computes edit distance between two strings.

```ts
function levenshtein(
  value: string,
  other: string,
  maxDistance?: number,
): number;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | string | — | First string. |
| `other` | string | — | Second string. |
| `maxDistance` | number | `Infinity` | Optional early-exit threshold. If the minimum row distance exceeds this value, the function returns `maxDistance + 1`. |

Returns: `number`

```ts
console.log(levenshtein("kitten", "sitting"));
```

## `findTopSuggestions(input: string, commands?: string[], limit?: number): string[]`

Ranks candidate commands using Levenshtein distance and returns the best matches.

```ts
function findTopSuggestions(
  input: string,
  commands?: string[],
  limit?: number,
): string[];
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | — | User input to rank against the command list. |
| `commands` | string[] | `[]` | Candidate command labels. |
| `limit` | number | `3` | Maximum number of suggestions to return. |

Returns: `string[]`

```ts
console.log(findTopSuggestions("hep", ["help", "hello", "world"], 2));
```

## `escapeHTML(text: string): string`

Escapes common HTML metacharacters in plain text.

```ts
function escapeHTML(text: string): string;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | string | — | Plain text to escape. Falsy values return an empty string. |

Returns: `string`

```ts
console.log(escapeHTML(`<script>alert("x")</script>`));
```

## Common Composition Pattern

A common pattern is to recover from typos and then safely echo the rejected input:

```ts
import { findTopSuggestions, escapeHTML } from "sawit-utils";

const input = "<helo>";
const suggestions = findTopSuggestions("helo", ["help", "hello", "stats"]);
const safeEcho = escapeHTML(input);

console.log({ suggestions, safeEcho });
```

Related pages: [String Utilities](/docs/string-utilities) and [Validation API](/docs/api-reference/validation).
