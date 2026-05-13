---
title: "Types"
description: "Reference for the TypeScript types exported by sawit-utils."
---

The package exports TypeScript declarations from `src/index.d.ts`, including the Instagram downloader types defined in `src/types/igdl.d.ts`. These types are the authoritative contract for the only structured object API in the library.

Import path:

```ts
import type {
  IgdlVideo,
  IgdlData,
  IgdlSuccessResult,
  IgdlErrorResult,
  IgdlResult,
} from "sawit-utils";
```

## Source Definitions

The actual exported definitions are:

```ts
export interface IgdlVideo {
  url: string;
  quality: string;
}

export interface IgdlData {
  username: string | null;
  thumbnail: string | null;
  videos: IgdlVideo[];
  videoUrl: string | null;
  alternativeUrl: string | null;
}

export interface IgdlSuccessResult {
  success: true;
  data: IgdlData;
}

export interface IgdlErrorResult {
  success: false;
  error: string;
}

export type IgdlResult = IgdlSuccessResult | IgdlErrorResult;
```

## Type Meanings

### `IgdlVideo`

Represents one parsed download candidate from the scraper output.

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Direct download URL parsed from the upstream HTML. |
| `quality` | string | Quality label. The current implementation always returns `"HD"`. |

### `IgdlData`

Normalized success payload returned by `igdl()` when scraping succeeds.

| Field | Type | Description |
|-------|------|-------------|
| `username` | string \| null | Parsed Instagram username, or `null` if not found. |
| `thumbnail` | string \| null | Parsed thumbnail URL, or `null` if not found. |
| `videos` | `IgdlVideo[]` | All unique video candidates extracted from the HTML. |
| `videoUrl` | string \| null | First video URL, promoted for convenience. |
| `alternativeUrl` | string \| null | Second video URL, if present. |

### `IgdlSuccessResult`

Discriminated success shape:

```ts
type IgdlSuccessResult = {
  success: true;
  data: IgdlData;
};
```

### `IgdlErrorResult`

Discriminated error shape:

```ts
type IgdlErrorResult = {
  success: false;
  error: string;
};
```

### `IgdlResult`

Union of the two result shapes. Branch on `success` to narrow safely:

```ts
function handle(result: IgdlResult) {
  if (!result.success) {
    console.error(result.error);
    return;
  }

  console.log(result.data.videoUrl);
}
```

## When to Use These Types

Use the exported types whenever you wrap `igdl()` in your own service layer, return its output from an API route, or persist normalized scraper metadata in your application. The rest of `sawit-utils` exports primitive-returning functions, so these are the only library types most consumers need to import directly.

Related pages: [IGDL API](/docs/api-reference/igdl) and [Instagram Scraper](/docs/instagram-scraper).
