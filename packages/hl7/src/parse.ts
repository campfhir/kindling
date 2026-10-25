/**
 * The root parser: any HL7 v2 input, one message or a batch file.
 *
 * `parse()` looks at the input first. One message (an MSH and its segments) is dispatched on
 * MSH-9 and MSH-12 to the generated parser of that message in that version (see `./dispatch.ts`);
 * a batch file (FHS or BHS first, or more than one MSH) goes through `parseBatch()` of
 * `./batch.ts`, which runs the same dispatch per message. The result says which it was:
 *
 * ```ts
 * const result = parse(raw);
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
 * (`kind: "batch"`).
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import {
  isBatchInput,
  parseMessage,
  selectMessageParser,
  type ParseOptions,
  type ParsedHL7Message,
  type SelectedMessageParser,
} from "./dispatch.ts";
import { parseBatch, type ParsedBatchFile } from "./batch.ts";

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
  parse: (input: string, options?: ParseOptions) => Result<ParsedBatchFile>;
}

/** The parser picked for an input: one message's parser, or the batch parser. */
export type SelectedParser = SelectedMessageParser | SelectedBatchParser;

/**
 * Picks the parser for an input: the batch parser for a batch file, otherwise the generated
 * parser of the message named by MSH-9 in the version named by MSH-12 (or `options.version`).
 */
export function selectParser(input: string, options: ParseOptions = {}): Result<SelectedParser> {
  if (isBatchInput(input)) return { ok: true, val: { kind: "batch", parse: parseBatch } };
  return selectMessageParser(input, options);
}

/**
 * Parses any HL7 v2 input. A batch file (FHS or BHS first, or more than one MSH) is parsed by
 * `parseBatch()` and returned with `kind: "batch"`; one message is dispatched on MSH-9 and MSH-12
 * to its generated parser and returned with `kind: "message"`, `version` and `structure`, the
 * last of which narrows `parsed` to the message's own shape.
 */
export function parse(input: string, options: ParseOptions = {}): Result<ParsedHL7> {
  if (!isBatchInput(input)) return parseMessage(input, options);
  const file = parseBatch(input, options);
  if (!file.ok || !file.val) return file as Result<never>;
  return { ok: true, val: { kind: "batch", ...file.val } };
}
