/**
 * The message dispatcher behind the root parser: reads MSH-9 (message type) and MSH-12 (version)
 * of one HL7 v2 message, picks the generated parser of that message in that version and runs it.
 * `parse()` of `./parse.ts` adds the batch protocol on top of it.
 *
 * ```ts
 * const result = parseMessage(raw);
 * if (result.ok && result.val.structure === "ADT_A01") {
 *   result.val.parsed.patient; // PID, typed as ParsedADT_A01
 * }
 * ```
 *
 * In v2.3, MSH-9 is a CM_MSG of message type and trigger event (`ADT^A01`) and MSH-12 a plain ID
 * (`2.3`); the message structure component of MSH-9 and the VID form of MSH-12 arrive in v2.3.1
 * (hl7.eu `hl7v23segmMSH.htm`, Caristix v2.3 and v2.3.1 MSH). The dispatcher therefore keys on
 * `<type>_<event>` first (`ADT_A01`), then on the type alone (`ACK`, whose event names the message
 * it acknowledges), then on MSH-9.3 when a sender includes it.
 *
 * In v2.1, MSH-9 is the message type alone (an ID: hl7.eu `hl7v21segmMSH.htm`, Caristix v2.1 MSH) and the trigger
 * event travels in EVN-1 (Event Type Code). A message whose MSH-9 names no trigger event is therefore keyed on
 * `<type>_<EVN-1>` when its EVN names one, and otherwise on the only event of its type in the version, if it has one.
 *
 * Every HL7 v2 release from v2.1 to v2.9.1 is dispatched: 1.0 dispatched v2.3, 1.1 added v2.3.1, 1.2
 * v2.4, 2.1 v2.5, 2.2 v2.5.1, 2.8 v2.6 to v2.9.1, and 2.9 v2.1 and v2.2. A message of another version is an
 * error unless `options.version` names the version to parse it as.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { ParsedMessageBase } from "./types/structure.ts";
import { Err } from "./utils/err.ts";
import { readMessageHeader, splitSegments } from "./utils/messageParsing.ts";
import { MSH } from "./v2.3/MSH.ts";
import { ParserUtils } from "./types/parser.ts";
import { MESSAGES as V2_1 } from "./v2.1/registry.ts";
import { MESSAGES as V2_2 } from "./v2.2/registry.ts";
import { MESSAGES as V2_3 } from "./v2.3/registry.ts";
import { MESSAGES as V2_3_1 } from "./v2.3.1/registry.ts";
import { MESSAGES as V2_4 } from "./v2.4/registry.ts";
import { MESSAGES as V2_5 } from "./v2.5/registry.ts";
import { MESSAGES as V2_5_1 } from "./v2.5.1/registry.ts";
import { MESSAGES as V2_6 } from "./v2.6/registry.ts";
import { MESSAGES as V2_7 } from "./v2.7/registry.ts";
import { MESSAGES as V2_7_1 } from "./v2.7.1/registry.ts";
import { MESSAGES as V2_8 } from "./v2.8/registry.ts";
import { MESSAGES as V2_8_1 } from "./v2.8.1/registry.ts";
import { MESSAGES as V2_8_2 } from "./v2.8.2/registry.ts";
import { MESSAGES as V2_9 } from "./v2.9/registry.ts";
import { MESSAGES as V2_9_1 } from "./v2.9.1/registry.ts";

/** The message registries the root parser dispatches on, keyed by the MSH-12 value. */
const REGISTRIES = {
  "2.1": V2_1,
  "2.2": V2_2,
  "2.3": V2_3,
  "2.3.1": V2_3_1,
  "2.4": V2_4,
  "2.5": V2_5,
  "2.5.1": V2_5_1,
  "2.6": V2_6,
  "2.7": V2_7,
  "2.7.1": V2_7_1,
  "2.8": V2_8,
  "2.8.1": V2_8_1,
  "2.8.2": V2_8_2,
  "2.9": V2_9,
  "2.9.1": V2_9_1,
} as const;

type Registries = typeof REGISTRIES;

/** An HL7 version the root parser dispatches: its MSH-12 value (`"2.3"`). */
export type HL7Version = keyof Registries;

/** The HL7 versions the root parser dispatches, oldest first. */
export const SUPPORTED_VERSIONS: readonly HL7Version[] = Object.keys(REGISTRIES) as HL7Version[];

/** The message structure names of one version (`"ADT_A01" | "ACK" | ...`). */
export type MessageStructureOf<V extends HL7Version> = keyof Registries[V] & string;

/** The parsed form of one message structure of one version. */
export type ParsedMessageOf<V extends HL7Version, S extends MessageStructureOf<V>> =
  Registries[V][S] extends (messageString: string) => Result<infer T> ? T : never;

/** What MSH-9 and MSH-12 say about a message, as sent. */
export interface MessageType {
  /** MSH-9.1 Message Type (`ADT`). */
  messageCode: string;
  /** MSH-9.2 Trigger Event (`A01`); empty when the sender left it out. */
  triggerEvent: string;
  /** MSH-9.3 Message Structure (`ADT_A01`), when the sender included it (defined from v2.3.1). */
  messageStructure?: string;
  /** MSH-12 Version ID (`2.3`); the first component when the field is a VID. */
  version: string;
}

/** Options of `parse()`, `parseMessage()` and the parser selectors. */
export interface ParseOptions {
  /**
   * Parse the message as this version whatever MSH-12 says, for feeds that label their messages
   * with a version this release does not dispatch yet, or leave MSH-12 empty.
   */
  version?: HL7Version;
}

/** The parser picked for a message: its version, structure name, and the function to run. */
export interface SelectedMessageParserOf<V extends HL7Version, S extends MessageStructureOf<V>> {
  /** Tells a message parser from a batch parser in `selectParser()`'s result. */
  kind: "message";
  /** The version the message is parsed as. */
  version: V;
  /** The message structure name the message resolved to (`ADT_A01`). */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The generated parser of that message (`parseADT_A01` of `@campfhir/hl7/v2.3`). */
  parse: (messageString: string) => Result<ParsedMessageOf<V, S>>;
}

/** The parser picked for a message, as a union over every version and structure. */
export type SelectedMessageParser = {
  [V in HL7Version]: { [S in MessageStructureOf<V>]: SelectedMessageParserOf<V, S> }[MessageStructureOf<V>];
}[HL7Version];

/** A message parsed by the root parser: the discriminants and the structured message. */
export interface ParsedHL7MessageOf<V extends HL7Version, S extends MessageStructureOf<V>> {
  /** Tells a message from a batch file in `parse()`'s result. */
  kind: "message";
  /** The version the message was parsed as. */
  version: V;
  /** The message structure name (`ADT_A01`): switch on it to narrow `parsed`. */
  structure: S;
  /** What MSH-9 and MSH-12 said. */
  messageType: MessageType;
  /** The structured message, the same object the message's own `parse<MSG>()` returns. */
  parsed: ParsedMessageOf<V, S>;
}

/** A message parsed by the root parser, as a union over every version and structure. */
export type ParsedHL7Message = {
  [V in HL7Version]: { [S in MessageStructureOf<V>]: ParsedHL7MessageOf<V, S> }[MessageStructureOf<V>];
}[HL7Version];

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });

/**
 * Whether an input is a batch file rather than one message: it starts with FHS or BHS, or it holds
 * more than one MSH (a bare run of messages is a batch without envelope segments).
 */
export function isBatchInput(input: string): boolean {
  const lines = splitSegments(input);
  const first = lines[0]?.substring(0, 3);
  if (first === "FHS" || first === "BHS") return true;
  return lines.filter((line) => line.startsWith("MSH")).length > 1;
}

/**
 * Reads MSH-9 and MSH-12 of a message without parsing the rest of it. Fails for an empty message,
 * one that does not start with MSH, an MSH whose encoding characters cannot be read, or a batch.
 */
export function identifyMessage(messageString: string): Result<MessageType> {
  if (isBatchInput(messageString)) return fail("Input is a batch file, not one message: use parse() or parseBatch()");
  const header = readMessageHeader(messageString, (s) => MSH.parse(s));
  if (!header.ok || !header.val) return header as Result<never>;
  const { messageCode, triggerEvent, messageStructure } = header.val.msh.getMessageType();
  return {
    ok: true,
    val: {
      messageCode: messageCode.trim(),
      triggerEvent: triggerEvent.trim(),
      ...(messageStructure?.trim() ? { messageStructure: messageStructure.trim() } : {}),
      version: header.val.msh.getVersionId(),
    },
  };
}

const has = (object: object, key: string) => Object.prototype.hasOwnProperty.call(object, key);
const isSupported = (version: string): version is HL7Version => has(REGISTRIES, version);

/** EVN-1 Event Type Code of a message (`A01`), or "" when it has no EVN or the field is empty. */
function eventTypeCode(messageString: string): string {
  const lines = splitSegments(messageString);
  const separator = lines[0]?.[3];
  const evn = separator ? lines.find((line) => line.startsWith(`EVN${separator}`)) : undefined;
  if (!evn || !separator) return "";
  const encoding = { fieldSeparator: separator, componentSeparator: lines[0][4] ?? "^", repetitionSeparator: lines[0][5] ?? "~", escapeCharacter: lines[0][6] ?? "\\", subComponentSeparator: lines[0][7] ?? "&" };
  return ParserUtils.getComponent(ParserUtils.parseField(evn.split(separator)[1] ?? "", encoding), 0).trim();
}

/**
 * `ADT^A01` → `ADT_A01`; `ACK^A01` → `ACK`; `ADT^^ADT_A01` → `ADT_A01`. With no trigger event in MSH-9 (v2.1):
 * `ADT` and EVN-1 `A01` → `ADT_A01`, and `ORM` → `ORM_O01`, the only ORM event of the version.
 */
function resolveStructure(registry: Record<string, unknown>, type: MessageType, messageString: string): string | undefined {
  const candidates = [
    type.triggerEvent ? `${type.messageCode}_${type.triggerEvent}` : undefined,
    type.messageCode,
    type.messageStructure,
  ];
  const found = candidates.find((name) => name && has(registry, name));
  if (found || type.triggerEvent || type.messageStructure) return found;
  const event = eventTypeCode(messageString);
  if (event && has(registry, `${type.messageCode}_${event}`)) return `${type.messageCode}_${event}`;
  const ofType = Object.keys(registry).filter((name) => name.startsWith(`${type.messageCode}_`));
  return ofType.length === 1 ? ofType[0] : undefined;
}

/**
 * Picks the parser for one message from its MSH-9 and MSH-12 (or `options.version`). Fails when
 * the MSH cannot be read, the version is not dispatched by this release, the message type is not
 * one of that version's, or the input is a batch.
 */
export function selectMessageParser(messageString: string, options: ParseOptions = {}): Result<SelectedMessageParser> {
  const identity = identifyMessage(messageString);
  if (!identity.ok || !identity.val) return identity as Result<never>;
  const messageType = identity.val;

  const version = options.version ?? messageType.version;
  if (!version) {
    return fail(`MSH-12 Version ID is empty; pass { version: "${SUPPORTED_VERSIONS.at(-1)}" } to choose the version to parse as`);
  }
  if (!isSupported(version)) {
    return fail(
      `HL7 version '${version}' (MSH-12) is not supported by this release, which parses ${SUPPORTED_VERSIONS.join(", ")}; ` +
        `pass { version: "${SUPPORTED_VERSIONS.at(-1)}" } to parse the message as that version`,
    );
  }

  const registry: Record<string, (messageString: string) => Result<ParsedMessageBase>> = REGISTRIES[version];
  const structure = resolveStructure(registry, messageType, messageString);
  if (!structure) {
    const shown = [messageType.messageCode, messageType.triggerEvent, messageType.messageStructure].filter(Boolean).join("^");
    return fail(`Unknown HL7 v${version} message type '${shown}' (MSH-9)`);
  }
  return {
    ok: true,
    val: { kind: "message", version, structure, messageType, parse: registry[structure] },
  } as unknown as Result<SelectedMessageParser>;
}

/**
 * Parses one HL7 v2 message: reads MSH-9 and MSH-12, picks the generated parser of that message
 * in that version and runs it. The result carries `version` and `structure` to narrow `parsed`,
 * which is exactly what the message's own `parse<MSG>()` returns. A batch is an error here; the
 * root `parse()` handles both.
 */
export function parseMessage(messageString: string, options: ParseOptions = {}): Result<ParsedHL7Message> {
  const selected = selectMessageParser(messageString, options);
  if (!selected.ok || !selected.val) return selected as Result<never>;
  // One plain shape for the call: the union over every version and structure is too large to call through.
  const { version, structure, messageType, parse } = selected.val as unknown as {
    version: HL7Version;
    structure: string;
    messageType: MessageType;
    parse: (messageString: string) => Result<ParsedMessageBase>;
  };
  const result = parse(messageString);
  if (!result.ok || !result.val) return result as Result<never>;
  return { ok: true, val: { kind: "message", version, structure, messageType, parsed: result.val } } as unknown as Result<ParsedHL7Message>;
}
