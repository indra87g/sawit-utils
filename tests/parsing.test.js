import * as parsing from "../src/parsing.js";
import { describe, expect, test } from "vitest";

describe("parsing - extractMessageBody", () => {
  test("returns empty string for nullish input", () => {
    expect(parsing.extractMessageBody(null)).toBe("");
    expect(parsing.extractMessageBody(undefined)).toBe("");
    expect(parsing.extractMessageBody({})).toBe("");
  });

  test("returns the string when msg is a plain string", () => {
    expect(parsing.extractMessageBody("hello")).toBe("hello");
    expect(parsing.extractMessageBody({ msg: "hi" })).toBe("hi");
  });

  test("reads from the various direct text fields", () => {
    expect(parsing.extractMessageBody({ text: "t" })).toBe("t");
    expect(parsing.extractMessageBody({ caption: "c" })).toBe("c");
    expect(parsing.extractMessageBody({ body: { text: "bt" } })).toBe("bt");
    expect(
      parsing.extractMessageBody({
        singleSelectReply: { selectedRowId: "row" },
      }),
    ).toBe("row");
  });

  test("parses nativeFlowResponseMessage paramsJson", () => {
    const m = {
      nativeFlowResponseMessage: {
        paramsJson: JSON.stringify({ id: "flow-id" }),
      },
    };
    expect(parsing.extractMessageBody(m)).toBe("flow-id");
  });

  test("returns empty string on invalid paramsJson", () => {
    const m = { nativeFlowResponseMessage: { paramsJson: "{not json" } };
    expect(parsing.extractMessageBody(m)).toBe("");
  });
});

describe("parsing - extractNumber", () => {
  test("prefers quoted sender", () => {
    expect(parsing.extractNumber({ quoted: { sender: "123@s" } })).toBe(
      "123@s",
    );
  });

  test("falls back to first mentioned jid", () => {
    expect(parsing.extractNumber({ mentionedJid: ["a@s", "b@s"] })).toBe("a@s");
  });

  test("falls back to first arg + netSuffix", () => {
    expect(parsing.extractNumber({ args: ["628"] })).toBe("628@s.whatsapp.net");
    expect(parsing.extractNumber({ args: ["628"] }, { netSuffix: "@x" })).toBe(
      "628@x",
    );
  });

  test("returns undefined when nothing matches", () => {
    expect(parsing.extractNumber({})).toBeUndefined();
    expect(parsing.extractNumber(null)).toBeUndefined();
  });
});

describe("parsing - parseCommand", () => {
  const EMPTY = {
    prefix: "",
    command: "",
    text: "",
    args: [],
    isHasPrefix: false,
  };

  test("returns empty parsed for blank/whitespace input", () => {
    expect(parsing.parseCommand("")).toEqual(EMPTY);
    expect(parsing.parseCommand("   ")).toEqual(EMPTY);
    expect(parsing.parseCommand(null)).toEqual(EMPTY);
  });

  test("parses a prefixed command with args", () => {
    const r = parsing.parseCommand("!ping one two", { prefixes: ["!"] });
    expect(r).toEqual({
      prefix: "!",
      command: "ping",
      text: "one two",
      args: ["one", "two"],
      isHasPrefix: true,
    });
  });

  test("prefixed command without args", () => {
    const r = parsing.parseCommand("!ping", { prefixes: ["!"] });
    expect(r.prefix).toBe("!");
    expect(r.command).toBe("ping");
    expect(r.args).toEqual([]);
    expect(r.isHasPrefix).toBe(true);
  });

  test("noPrefix mode parses command without a prefix", () => {
    const r = parsing.parseCommand("help me now", { noPrefix: true });
    expect(r.prefix).toBe("");
    expect(r.command).toBe("help");
    expect(r.text).toBe("me now");
    expect(r.args).toEqual(["me", "now"]);
    expect(r.isHasPrefix).toBe(false);
  });

  test("noPrefix mode with a single token", () => {
    const r = parsing.parseCommand("menu", { noPrefix: true });
    expect(r.command).toBe("menu");
    expect(r.text).toBe("");
    expect(r.args).toEqual([]);
  });

  test("collapses repeated spaces between args", () => {
    const r = parsing.parseCommand("!cmd a   b", { prefixes: ["!"] });
    expect(r.args).toEqual(["a", "b"]);
  });

  test("prefix with no command after it returns empty parsed", () => {
    expect(parsing.parseCommand("!   ", { prefixes: ["!"] })).toEqual(EMPTY);
  });
});

describe("parsing - toTitleCase", () => {
  test("capitalises the first letter of each word", () => {
    expect(parsing.toTitleCase("hello world")).toBe("Hello World");
    expect(parsing.toTitleCase("the quick brown fox")).toBe(
      "The Quick Brown Fox",
    );
  });

  test("defaults to 'Hello' and coerces non-strings", () => {
    expect(parsing.toTitleCase()).toBe("Hello");
    expect(parsing.toTitleCase(123)).toBe("123");
  });
});

describe("parsing - parseMentions", () => {
  test("extracts mentions and appends the net suffix", () => {
    expect(parsing.parseMentions("hi @628123456 and @628987654")).toEqual([
      "628123456@s.whatsapp.net",
      "628987654@s.whatsapp.net",
    ]);
  });

  test("honours a custom net suffix", () => {
    expect(parsing.parseMentions("@628123456", { netSuffix: "@x" })).toEqual([
      "628123456@x",
    ]);
  });

  test("returns empty array when there is no mention", () => {
    expect(parsing.parseMentions("no mentions here")).toEqual([]);
    expect(parsing.parseMentions(123)).toEqual([]);
    expect(parsing.parseMentions(null)).toEqual([]);
  });
});
