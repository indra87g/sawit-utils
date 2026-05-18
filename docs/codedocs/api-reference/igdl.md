---
title: "IGDL API"
description: "Reference for the Instagram downloader helper and its result contract."
---

Import path:

```ts
import { igdl } from "sawit-utils";
import type { IgdlResult } from "sawit-utils";
```

Runtime source file: `src/scraper/igdl.js`  
Type source file: `src/types/igdl.d.ts`

## `igdl(url: string): Promise<IgdlResult>`

Scrapes normalized Instagram reel, post, or TV metadata through a third-party site.

```ts
function igdl(url: string): Promise<IgdlResult>;
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | — | Instagram URL. The implementation recognizes `/reel/`, `/p/`, and `/tv/` path shapes. |

Returns: `Promise<IgdlResult>`

The resolved value is one of these shapes:

```ts
type IgdlResult =
  | {
      success: true;
      data: {
        username: string | null;
        thumbnail: string | null;
        videos: Array<{ url: string; quality: string }>;
        videoUrl: string | null;
        alternativeUrl: string | null;
      };
    }
  | {
      success: false;
      error: string;
    };
```

## Usage Example

```ts
import { igdl } from "sawit-utils";

const result = await igdl("https://www.instagram.com/reel/C8abc123xyz/");

if (!result.success) {
  console.error(result.error);
} else {
  console.log(result.data.videoUrl);
  console.log(result.data.alternativeUrl);
}
```

## Defensive Usage Pattern

Because the scraper depends on upstream HTML, keep error handling explicit.

```ts
import { igdl, isURL } from "sawit-utils";

async function fetchPrimaryVideo(url: string) {
  if (!isURL(url)) throw new Error("Invalid URL");

  const result = await igdl(url);
  if (!result.success) throw new Error(result.error);
  if (!result.data.videoUrl) throw new Error("Missing primary video URL");

  return result.data.videoUrl;
}
```

## Notes

- The function posts to `https://reelsvideo.io/reel/{code}/`.
- Download links are extracted from `https://ssscdn.io/reelsvideo/...` anchors in the returned HTML.
- Every parsed video is labeled with `"HD"` in the current implementation.
- The first two parsed URLs are promoted to `videoUrl` and `alternativeUrl`.

## Operational Considerations

The implementation in `src/scraper/igdl.js` is not a generic Instagram client. It depends on hard-coded form fields, browser-like headers, and regex matches over a third-party HTML response. That design keeps the API very easy to consume, but it also means operational reliability depends on infrastructure outside your control. In production code, treat `igdl()` as an adapter behind your own service boundary so you can log scraper failures, add retries cautiously, or swap implementations later without changing the rest of your app.

Related pages: [Instagram Scraper](/docs/instagram-scraper) and [Types](/docs/types).
