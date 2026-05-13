---
title: "Validation API"
description: "Reference for the MIME, object, and URL validation helpers exported from sawit-utils."
---

Import path for every API on this page:

```ts
import {
  isMimeImage,
  isMimeVideo,
  isMimeGif,
  isMimeWebP,
  isMimeAudio,
  isEmptyObject,
  isURL,
  isWhatsAppURL,
} from "sawit-utils";
```

Source file: `src/validation.js`

## MIME Helpers

### `isMimeImage(mime: string): boolean`

```ts
function isMimeImage(mime: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mime` | string | — | MIME string checked with `startsWith("image")`. |

Returns: `boolean`

### `isMimeVideo(mime: string): boolean`

```ts
function isMimeVideo(mime: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mime` | string | — | MIME string checked with `startsWith("video")`. |

Returns: `boolean`

### `isMimeGif(mime: string): boolean`

```ts
function isMimeGif(mime: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mime` | string | — | MIME string checked with `endsWith("gif")`. |

Returns: `boolean`

### `isMimeWebP(mime: string): boolean`

```ts
function isMimeWebP(mime: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mime` | string | — | MIME string checked with `endsWith("webp")`. |

Returns: `boolean`

### `isMimeAudio(mime: string): boolean`

```ts
function isMimeAudio(mime: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `mime` | string | — | MIME string checked with `startsWith("audio")`. |

Returns: `boolean`

```ts
console.log(isMimeImage("image/png"));
console.log(isMimeAudio("audio/mpeg"));
```

## `isEmptyObject(object: object): boolean`

Returns `true` when a `for...in` loop finds no enumerable properties.

```ts
function isEmptyObject(object: object): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `object` | object | — | Object to inspect for enumerable properties. |

Returns: `boolean`

```ts
console.log(isEmptyObject({}));
console.log(isEmptyObject({ a: 1 }));
```

## `isURL(string: string): boolean`

Checks whether a string looks like a valid URL.

```ts
function isURL(string: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `string` | string | — | Candidate URL. Non-strings return `false`. |

Returns: `boolean`

```ts
console.log(isURL("https://google.com"));
```

## `isWhatsAppURL(string: string): boolean`

Checks whether a string matches common WhatsApp invite, channel, or short-link patterns.

```ts
function isWhatsAppURL(string: string): boolean;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `string` | string | — | Candidate URL. Non-strings return `false`. |

Returns: `boolean`

```ts
console.log(isWhatsAppURL("https://chat.whatsapp.com/invite"));
```

## Common Composition Pattern

These functions are usually combined at the boundary of your application:

```ts
import {
  isURL,
  isWhatsAppURL,
  isMimeVideo,
} from "sawit-utils";

function classifyAttachment(url: string, mime: string) {
  return {
    validUrl: isURL(url),
    fromWhatsApp: isWhatsAppURL(url),
    isVideo: isMimeVideo(mime),
  };
}
```

Related pages: [Validation Helpers](/docs/validation-helpers) and [Instagram Scraper](/docs/instagram-scraper).
