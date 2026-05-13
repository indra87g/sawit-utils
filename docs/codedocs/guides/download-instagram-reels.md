---
title: "Download Instagram Reels"
description: "Build a practical reel download flow around igdl, including URL validation and failure handling."
---

This guide shows a minimal but usable integration for the package's scraper function, `igdl(url)`. The goal is to accept an Instagram URL, validate it, fetch normalized download metadata, and persist the first returned video URL.

<Steps>
<Step>
### Validate the incoming URL

Reject obviously bad input before you do network work.

```ts
import { isURL } from "sawit-utils";

function assertInstagramUrl(url: string) {
  if (!isURL(url)) {
    throw new Error("The provided value is not a valid URL");
  }
}
```

</Step>
<Step>
### Call igdl and branch on success

The function returns a discriminated union, so check `success` first.

```ts
import { igdl } from "sawit-utils";

async function fetchDownload(url: string) {
  const result = await igdl(url);
  if (!result.success) {
    throw new Error(result.error);
  }

  if (!result.data.videoUrl) {
    throw new Error("No downloadable video URL was found");
  }

  return result.data;
}
```

</Step>
<Step>
### Save the primary video to disk

This example uses the returned `videoUrl` with the platform `fetch` API and Node's `fs/promises`.

```ts
import { writeFile } from "node:fs/promises";
import { igdl, isURL } from "sawit-utils";

export async function downloadReel(instagramUrl: string, outputPath: string) {
  if (!isURL(instagramUrl)) {
    throw new Error("Invalid Instagram URL");
  }

  const result = await igdl(instagramUrl);
  if (!result.success) {
    throw new Error(result.error);
  }

  const videoUrl = result.data.videoUrl ?? result.data.alternativeUrl;
  if (!videoUrl) {
    throw new Error("No video URL available");
  }

  const response = await fetch(videoUrl);
  const buffer = Buffer.from(await response.arrayBuffer());

  await writeFile(outputPath, buffer);

  return {
    username: result.data.username,
    thumbnail: result.data.thumbnail,
    savedTo: outputPath,
  };
}
```

</Step>
<Step>
### Add a fallback strategy

Because the scraper depends on a third-party HTML structure, log failures and keep a fallback path in your application.

```ts
try {
  const saved = await downloadReel(
    "https://www.instagram.com/reel/C8abc123xyz/",
    "./downloads/reel.mp4",
  );
  console.log(saved);
} catch (error) {
  console.error("Reel download failed:", error);
}
```

</Step>
</Steps>

This workflow is intentionally thin. `igdl()` does the extraction work, while your application decides how to store files, how many retries to allow, and what to do when `reelsvideo.io` changes behavior. For the exact result shape, see [Types](/docs/types) and [IGDL API Reference](/docs/api-reference/igdl).
