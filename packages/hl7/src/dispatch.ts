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
 * Versions are wired one per release: this release dispatches HL7 v2.3. A message of another
 * version is an error unless `options.version` names the version to parse it as.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import type { ParsedMessageBase } from "./types/structure.ts";
import { Err } from "./utils/err.ts";
import { readMessageHeader, splitSegments } from "./utils/messageParsing.ts";
import { MSH } from "./segments/v2.3/MSH.ts";
import { MESSAGES as V2_3 } from "./parsers/v2.3/messages.ts";

/** The message registries the root parser dispatches on, keyed by the MSH-12 value. */
const REGISTRIES = {
  "2.3": V2_3,
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
  /** The generated parser of that message (`parseADT_A01` of `@campfhir/hl7/parsers/v2.3`). */
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

/** `ADT^A01` → `ADT_A01`; `ACK^A01` → `ACK`; `ADT^^ADT_A01` → `ADT_A01`. */
function resolveStructure(registry: Record<string, unknown>, type: MessageType): string | undefined {
  const candidates = [
    type.triggerEvent ? `${type.messageCode}_${type.triggerEvent}` : undefined,
    type.messageCode,
    type.messageStructure,
  ];
  return candidates.find((name) => name && has(registry, name));
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
  const structure = resolveStructure(registry, messageType);
  if (!structure) {
    const shown = [messageType.messageCode, messageType.triggerEvent, messageType.messageStructure].filter(Boolean).join("^");
    return fail(`Unknown HL7 v${version} message type '${shown}' (MSH-9)`);
  }
  return {
    ok: true,
    val: { kind: "message", version, structure, messageType, parse: registry[structure] },
  } as Result<SelectedMessageParser>;
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
  const { version, structure, messageType } = selected.val;
  const result = selected.val.parse(messageString);
  if (!result.ok || !result.val) return result as Result<never>;
  return { ok: true, val: { kind: "message", version, structure, messageType, parsed: result.val } } as Result<ParsedHL7Message>;
}
