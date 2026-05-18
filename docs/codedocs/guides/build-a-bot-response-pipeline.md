---
title: "Build a Bot Response Pipeline"
description: "Combine validation, string matching, formatting, and general helpers into one practical command-handling flow."
---

This guide shows how the package fits together in the kind of project it was originally written for: a small bot or command-driven automation service. The goal is to accept a user command, recover from minor typos, and return a formatted response.

<Steps>
<Step>
### Define the command catalog

Keep the supported commands in a simple array. `findTopSuggestions()` works on plain strings, so there is no framework requirement.

```ts
const commands = ["help", "ping", "status", "download"];
```

</Step>
<Step>
### Match, validate, and format the response

This handler uses `findTopSuggestions()` for typo recovery, `generateUID()` for a stable request ID, and several formatting helpers for the final message.

```ts
import {
  findTopSuggestions,
  generateUID,
  greeting,
  formatTime,
  toTime,
  delay,
} from "sawit-utils";

const commands = ["help", "ping", "status", "download"];

export async function handleCommand(input: string) {
  const requestId = generateUID(input) ?? "unknown";
  const normalized = input.trim().toLowerCase();

  if (!commands.includes(normalized)) {
    const suggestions = findTopSuggestions(normalized, commands, 2);
    return {
      ok: false,
      message: `Unknown command. Try: ${suggestions.join(", ") || "help"}`,
      requestId,
    };
  }

  await delay(50);

  return {
    ok: true,
    message: [
      `${greeting(Date.now())}, command accepted.`,
      `Request ID: ${requestId}`,
      `Server time: ${formatTime(Date.now(), "en-US", { timeZone: "UTC" })}`,
      `Budgeted execution time: ${toTime(15_000)}`,
    ].join("
"),
  };
}
```

</Step>
<Step>
### Run it with real inputs

Use a plain script to exercise both the success and recovery paths.

```ts
const ok = await handleCommand("status");
console.log(ok.message);

const typo = await handleCommand("statsu");
console.log(typo.message);
```

</Step>
</Steps>

This pattern works because the package is organized around stateless functions. You can lift the same code into a CLI, a message consumer, or an HTTP handler without changing the API shape.

For deeper detail on the helpers used here, see [String Utilities](/docs/string-utilities), [Formatting Utilities](/docs/formatting-utilities), and [General API Reference](/docs/api-reference/general).
