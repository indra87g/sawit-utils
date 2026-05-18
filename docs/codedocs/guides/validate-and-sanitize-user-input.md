---
title: "Validate and Sanitize User Input"
description: "Build a defensive input pipeline for URLs, MIME types, and user-supplied text."
---

This guide focuses on a common ingestion problem: user input arrives as text plus metadata, and you need to validate the shape, classify the attachment, and safely render text back to the user.

<Steps>
<Step>
### Validate URLs and attachment metadata

Start with the fast guard functions from `src/validation.js`.

```ts
import {
  isURL,
  isMimeImage,
  isMimeAudio,
  isEmptyObject,
} from "sawit-utils";

function assertPayload(payload: {
  url: string;
  mime: string;
  metadata: Record<string, unknown>;
}) {
  if (!isURL(payload.url)) throw new Error("Invalid URL");
  if (isEmptyObject(payload.metadata)) throw new Error("Metadata is required");
  if (!isMimeImage(payload.mime) && !isMimeAudio(payload.mime)) {
    throw new Error("Unsupported MIME type");
  }
}
```

</Step>
<Step>
### Escape user-controlled text before rendering

Use `escapeHTML()` when you are rendering plain text into an HTML surface.

```ts
import { escapeHTML } from "sawit-utils";

function renderCaption(rawCaption: string) {
  return `<p>${escapeHTML(rawCaption)}</p>`;
}
```

</Step>
<Step>
### Offer recovery suggestions for bad commands

If the payload includes a text command, add typo recovery instead of rejecting immediately.

```ts
import { findTopSuggestions } from "sawit-utils";

function recoverCommand(input: string) {
  const commands = ["upload", "download", "preview"];
  return findTopSuggestions(input, commands, 2);
}
```

</Step>
<Step>
### Put the pipeline together

This full example validates the payload, sanitizes a caption, and returns suggestions if the command is unsupported.

```ts
import {
  isURL,
  isMimeImage,
  isMimeAudio,
  isEmptyObject,
  escapeHTML,
  findTopSuggestions,
} from "sawit-utils";

type InputPayload = {
  command: string;
  url: string;
  mime: string;
  metadata: Record<string, unknown>;
  caption: string;
};

export function processInput(payload: InputPayload) {
  if (!isURL(payload.url)) return { ok: false, error: "Invalid URL" };
  if (isEmptyObject(payload.metadata)) return { ok: false, error: "Missing metadata" };
  if (!isMimeImage(payload.mime) && !isMimeAudio(payload.mime)) {
    return { ok: false, error: "Unsupported MIME type" };
  }

  const supported = ["upload", "download", "preview"];
  if (!supported.includes(payload.command)) {
    return {
      ok: false,
      error: "Unknown command",
      suggestions: findTopSuggestions(payload.command, supported, 2),
    };
  }

  return {
    ok: true,
    safeCaption: escapeHTML(payload.caption),
  };
}
```

</Step>
</Steps>

The important design point is that these helpers are deliberately lightweight. They reduce boilerplate, but they do not replace domain-specific validation. If you need strict MIME allowlists or canonical URL policies, layer those rules after the helpers shown here.
