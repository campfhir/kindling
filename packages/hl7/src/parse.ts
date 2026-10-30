/**
 * The root parser: any HL7 v2 input, one message or a batch file, in its own entry point
 * `@campfhir/hl7/parse`.
 *
 * `parse()` looks at the input first. One message (an MSH and its segments) is dispatched on
 * MSH-9 and MSH-12 to the generated parser of that message in that version (see `./dispatch.ts`);
 * a batch file (FHS or BHS first, or more than one MSH) goes through `parseBatch()` below, which
 * runs the same dispatch per message. The version's parsers load the first time a message of
 * that version is parsed, so `parse()` is asynchronous:
 *
 * ```ts
 * import { parse } from "@campfhir/hl7/parse";
 *
 * const result = await parse(raw);
 * if (!result.ok) throw new Error(result.err.message);
 * if (result.val.kind === "batch") {
 *   result.val.batches[0].messages[0]; // Result<ParsedHL7Message>
 * } else if (result.val.structure === "ADT_A01") {
 *   result.val.parsed.patient; // PID, typed as ParsedADT_A01
 * }
 * ```
 *
 * `selectParser()` stops one step earlier and returns the parser `parse()` would run, a message
 * parser (`kind: "message"`, with its version and structure name) or the batch parser
 * (`kind: "batch"`). The message parser it returns is synchronous.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import { splitSegments } from "./utils/messageParsing.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "./types/encoding.ts";
import { ParserUtils } from "./types/parser.ts";
import { FHS } from "./v2.3/FHS.ts";
import { FTS } from "./v2.3/FTS.ts";
import { BHS } from "./v2.3/BHS.ts";
import { BTS } from "./v2.3/BTS.ts";
import { QRD } from "./v2.3/QRD.ts";
import { QRF } from "./v2.3/QRF.ts";
import { isBatchInput, type ParseOptions } from "./identify.ts";
import { selectMessageParser, parseMessage, type ParsedHL7Message, type SelectedMessageParser } from "./dispatch.ts";
import type { ParsedBatch, ParsedBatchFile } from "./batch.ts";

// The single-message halves of the parser, and their types, from the same entry point.
export {
  parseMessage,
  selectMessageParser,
  type MessageStructureOf,
  type ParsedMessageOf,
  type ParsedHL7Message,
  type ParsedHL7MessageOf,
  type SelectedMessageParser,
  type SelectedMessageParserOf,
} from "./dispatch.ts";
export { type HL7Version, type MessageType, type ParseOptions } from "./identify.ts";

/** A batch file parsed by the root parser: the parsed file with its discriminant. */
export interface ParsedHL7Batch extends ParsedBatchFile {
  /** Tells a batch file from a message in `parse()`'s result. */
  kind: "batch";
}

/** What the root parser returns: one message, or a batch file of messages. */
export type ParsedHL7 = ParsedHL7Message | ParsedHL7Batch;

/** The batch parser, as picked by `selectParser()` for a batch file. */
export interface SelectedBatchParser {
  /** Tells the batch parser from a message parser. */
  kind: "batch";
  /** `parseBatch`. */
  parse: (input: string, options?: ParseOptions) => Promise<Result<ParsedBatchFile>>;
}

/** The parser picked for an input: one message's parser, or the batch parser. */
export type SelectedParser = SelectedMessageParser | SelectedBatchParser;
/** The segments that delimit messages and batches: a message never contains one. */
const ENVELOPE = new Set(["FHS", "BHS", "BTS", "FTS"]);

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });
const nameOf = (line: string) => line.substring(0, 3);
const firstValue = (segment: { fields: { components: { subComponents: string[] }[] }[] }, index: number) =>
  segment.fields[index] ? ParserUtils.getComponent(segment.fields[index], 0).trim() : "";

/**
 * Parses an HL7 batch file (or a single batch, or a bare run of messages) into its file header,
 * batches and file trailer, each message parsed by {@link parseMessage} with `options`.
 *
 * Fails for an empty input, an envelope segment that cannot be parsed, a segment outside any
 * message or after FTS, and a second FHS. A BTS-1 or FTS-1 that disagrees with the messages or
 * batches actually present is reported in `warnings`, not as a failure.
 */
export async function parseBatch(batchString: string, options: ParseOptions = {}): Promise<Result<ParsedBatchFile>> {
  const lines = splitSegments(batchString);
  if (lines.length === 0) return fail("Empty batch");

  const file: ParsedBatchFile = { batches: [], warnings: [] };
  let fileEncoding: EncodingCharacters = DEFAULT_ENCODING;
  let batch: ParsedBatch | undefined;
  let batchEncoding: EncodingCharacters = fileEncoding;
  let i = 0;

  const at = (line: number) => `at line ${line + 1}`;
  const openBatch = (): ParsedBatch => {
    batch = { messages: [] };
    batchEncoding = fileEncoding;
    file.batches.push(batch);
    return batch;
  };
  // A new batch starts at a BHS, or at the first MSH or BTS after the previous batch's BTS.
  const currentBatch = (): ParsedBatch => (batch && !batch.trailer ? batch : openBatch());

  if (nameOf(lines[0]) === "FHS") {
    const fhs = FHS.parse(lines[0]);
    if (!fhs.ok || !fhs.val) return fail(`Failed to parse FHS segment ${at(0)}: ${fhs.err?.message}`);
    file.fileHeader = fhs.val;
    fileEncoding = fhs.val.encoding;
    batchEncoding = fileEncoding;
    i = 1;
  }

  while (i < lines.length) {
    const name = nameOf(lines[i]);
    if (name === "FHS") return fail(`FHS segment ${at(i)} must be the first segment of the file`);

    if (name === "BHS") {
      const bhs = BHS.parse(lines[i]);
      if (!bhs.ok || !bhs.val) return fail(`Failed to parse BHS segment ${at(i)}: ${bhs.err?.message}`);
      const opened = openBatch();
      opened.header = bhs.val;
      batchEncoding = bhs.val.encoding;
      i++;
      // A batch sent as a query response names its query right after BHS (§2.23.3.4).
      for (const [segmentName, key, parser] of [
        ["QRD", "query", QRD] as const,
        ["QRF", "queryFilter", QRF] as const,
      ]) {
        if (i < lines.length && nameOf(lines[i]) === segmentName) {
          const r = parser.parse(lines[i], batchEncoding);
          if (!r.ok || !r.val) return fail(`Failed to parse ${segmentName} segment ${at(i)}: ${r.err?.message}`);
          (opened as Record<typeof key, QRD | QRF>)[key] = r.val;
          i++;
        }
      }
      continue;
    }

    if (name === "MSH") {
      const target = currentBatch();
      let end = i + 1;
      while (end < lines.length && nameOf(lines[end]) !== "MSH" && !ENVELOPE.has(nameOf(lines[end]))) end++;
      const result = await parseMessage(lines.slice(i, end).join("\r"), options);
      if (!result.ok) {
        result.err.withMetadata({ batch: file.batches.length, message: target.messages.length + 1, line: i + 1 });
      }
      target.messages.push(result);
      i = end;
      continue;
    }

    if (name === "BTS") {
      const target = currentBatch();
      const bts = BTS.parse(lines[i], batchEncoding);
      if (!bts.ok || !bts.val) return fail(`Failed to parse BTS segment ${at(i)}: ${bts.err?.message}`);
      target.trailer = bts.val;
      const count = firstValue(bts.val, 0);
      if (count !== "" && Number(count) !== target.messages.length) {
        file.warnings.push(
          `BTS-1 of batch ${file.batches.length} (line ${i + 1}) counts ${count} messages, the batch holds ${target.messages.length}`,
        );
      }
      i++;
      continue;
    }

    if (name === "FTS") {
      const fts = FTS.parse(lines[i], fileEncoding);
      if (!fts.ok || !fts.val) return fail(`Failed to parse FTS segment ${at(i)}: ${fts.err?.message}`);
      file.fileTrailer = fts.val;
      if (i + 1 < lines.length) return fail(`${nameOf(lines[i + 1])} segment ${at(i + 1)} follows the FTS segment`);
      const count = firstValue(fts.val, 0);
      if (count !== "" && Number(count) !== file.batches.length) {
        file.warnings.push(`FTS-1 (line ${i + 1}) counts ${count} batches, the file holds ${file.batches.length}`);
      }
      i++;
      continue;
    }

    return fail(`${name} segment ${at(i)} is outside of any message (expected MSH, BHS, BTS or FTS)`);
  }

  return { ok: true, val: file };
}

/**
 * Picks the parser for an input: the batch parser for a batch file, otherwise the generated
 * parser of the message named by MSH-9 in the version named by MSH-12 (or `options.version`).
 */
export async function selectParser(input: string, options: ParseOptions = {}): Promise<Result<SelectedParser>> {
  if (isBatchInput(input)) return { ok: true, val: { kind: "batch", parse: parseBatch } };
  return selectMessageParser(input, options);
}

/**
 * Parses any HL7 v2 input. A batch file (FHS or BHS first, or more than one MSH) is parsed by
 * `parseBatch()` and returned with `kind: "batch"`; one message is dispatched on MSH-9 and MSH-12
 * to its generated parser and returned with `kind: "message"`, `version` and `structure`, the
 * last of which narrows `parsed` to the message's own shape.
 */
export async function parse(input: string, options: ParseOptions = {}): Promise<Result<ParsedHL7>> {
  if (!isBatchInput(input)) return parseMessage(input, options);
  const file = await parseBatch(input, options);
  if (!file.ok || !file.val) return file as Result<never>;
  return { ok: true, val: { kind: "batch", ...file.val } };
}
