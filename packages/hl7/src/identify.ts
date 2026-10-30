/**
 * What an HL7 v2 input says about itself, read without loading any version's parsers: whether it
 * is a batch file, and MSH-9 (message type) and MSH-12 (version) of one message. The root entry
 * exports these, so importing the root loads no version. Picking and running the parser is in
 * `./dispatch.ts`; `parse()` of `./parse.ts` adds the batch protocol on top of it.
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
import { Err } from "./utils/err.ts";
import { readMessageHeader, splitSegments } from "./utils/messageParsing.ts";
import { MSH } from "./v2.3/MSH.ts";
import { ParserUtils } from "./types/parser.ts";

/** The HL7 versions the root parser dispatches, oldest first. */
export const SUPPORTED_VERSIONS = ["2.1", "2.2", "2.3", "2.3.1", "2.4", "2.5", "2.5.1", "2.6", "2.7", "2.7.1", "2.8", "2.8.1", "2.8.2", "2.9", "2.9.1"] as const;

/** An HL7 version the root parser dispatches: its MSH-12 value (`"2.3"`). */
export type HL7Version = (typeof SUPPORTED_VERSIONS)[number];

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

/** EVN-1 Event Type Code of a message (`A01`), or "" when it has no EVN or the field is empty. */
export function eventTypeCode(messageString: string): string {
  const lines = splitSegments(messageString);
  const separator = lines[0]?.[3];
  const evn = separator ? lines.find((line) => line.startsWith(`EVN${separator}`)) : undefined;
  if (!evn || !separator) return "";
  const encoding = { fieldSeparator: separator, componentSeparator: lines[0][4] ?? "^", repetitionSeparator: lines[0][5] ?? "~", escapeCharacter: lines[0][6] ?? "\\", subComponentSeparator: lines[0][7] ?? "&" };
  return ParserUtils.getComponent(ParserUtils.parseField(evn.split(separator)[1] ?? "", encoding), 0).trim();
}
