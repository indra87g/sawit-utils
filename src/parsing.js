export const extractMessageBody = (m) => {
  const msg = m?.msg || m;
  if (!msg) return "";
  if (typeof msg === "string") return msg;

  const directText =
    msg.text ||
    msg.caption ||
    msg.name ||
    msg.selectedId ||
    msg.selectedButtonId ||
    msg.contentText ||
    msg.body?.text ||
    msg.singleSelectReply?.selectedRowId;

  const paramsJson = msg.nativeFlowResponseMessage?.paramsJson;
  if (paramsJson) {
    try {
      const parsed = JSON.parse(paramsJson);
      return parsed.id || "";
    } catch {
      return "";
    }
  }

  return directText || "";
};

export const extractNumber = (
  msg,
  options = { netSuffix: "@s.whatsapp.net" },
) => {
  if (msg?.quoted?.sender) return msg.quoted.sender;
  if (msg?.mentionedJid?.length > 0) return msg.mentionedJid[0];
  if (msg?.args?.length > 0) return msg.args[0] + options.netSuffix;
  return undefined;
};

export const parseCommand = (body, setting = { prefixes: [], noPrefix: false }) => {
  const EMPTY_PARSED = {
    prefix: "",
    command: "",
    text: "",
    args: [],
    isHasPrefix: false,
  };

  if (!body) return EMPTY_PARSED;

  body = body.trim();
  if (!body) return EMPTY_PARSED;

  let first = body[Symbol.iterator]().next().value;
  if (!first) return EMPTY_PARSED;

  if (first === "\u200D" || first === "\uFE0F" || first.trim() === "")
    return EMPTY_PARSED;

  const isHasPrefix = (setting.prefixes || []).includes(first);
  if (!isHasPrefix && setting.noPrefix) {
    const spaceIndex = body.indexOf(" ");

    if (spaceIndex === -1)
      return {
        prefix: "",
        command: body.toLowerCase(),
        text: "",
        args: [],
        isHasPrefix,
      };

    const command = body.slice(0, spaceIndex).toLowerCase();
    const text = body.slice(spaceIndex + 1);

    return {
      prefix: "",
      command,
      text,
      args: text.split(" "),
      isHasPrefix,
    };
  }

  const rest = body.slice(first.length).trim();
  if (!rest) return EMPTY_PARSED;

  const spaceIndex = rest.indexOf(" ");

  if (spaceIndex === -1)
    return {
      prefix: first,
      command: rest.toLowerCase(),
      text: "",
      args: [],
      isHasPrefix,
    };

  const command = rest.slice(0, spaceIndex).toLowerCase();
  const text = rest.slice(spaceIndex + 1);

  const args = [];
  let start = 0;
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text[i] === " ") {
      if (i > start) args.push(text.slice(start, i));
      start = i + 1;
    }
  }

  return {
    prefix: first,
    command,
    text,
    args,
    isHasPrefix,
  };
};

export const toTitleCase = (str = "hello") =>
  String(str).replace(/\b\w/g, (c) => c.toUpperCase());

export const parseMentions = (text, options = { netSuffix: "@s.whatsapp.net" }) => {
  const result = [];
  if (typeof text !== "string" || !text.includes("@")) return result;

  const regex = /@([0-9]{5,16}|0)/g;
  let match;
  while ((match = regex.exec(text)) !== null) result.push(match[1] + options.netSuffix);

  return result;
};
