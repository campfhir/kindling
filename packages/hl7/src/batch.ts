/**
 * The HL7 batch protocol: parsing and encoding files of batches of messages.
 *
 * The structure of an HL7 batch file (hl7.eu v2.3 chapter 2, §2.23.3.1, with the query-response
 * variant of §2.23.3.4):
 *
 * ```
 * [FHS]                  file header
 * {
 *   [BHS]                batch header
 *   [QRD] [QRF]          the query this batch answers (batch as a query response)
 *   { [MSH ...] }        zero or more messages, not necessarily of one type
 *   [BTS]                batch trailer: BTS-1 counts the messages of the batch
 * }
 * [FTS]                  file trailer: FTS-1 counts the batches of the file
 * ```
 *
 * Every envelope segment is optional, so a bare run of messages is a file of one batch, and a
 * single message is a batch of one. Each message is handed to the root {@link parse}, so a batch
 * may mix message types and versions; a message that fails to parse does not fail the batch, its
 * entry in `messages` carries the error (with the batch number, message number and line in its
 * metadata) and the other messages are still returned.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { Err } from "./utils/err.ts";
import { splitSegments } from "./utils/messageParsing.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "./types/encoding.ts";
import { ParserUtils } from "./types/parser.ts";
import { FHS } from "./segments/v2.3/FHS.ts";
import { FTS } from "./segments/v2.3/FTS.ts";
import { BHS } from "./segments/v2.3/BHS.ts";
import { BTS } from "./segments/v2.3/BTS.ts";
import { QRD } from "./segments/v2.3/QRD.ts";
import { QRF } from "./segments/v2.3/QRF.ts";
import { parse, type ParseOptions, type ParsedHL7Message } from "./parse.ts";

/** One batch of a parsed file. */
export interface ParsedBatch {
  /** The BHS segment, when the batch has one. */
  header?: BHS;
  /** The QRD segment of a batch sent as a query response. */
  query?: QRD;
  /** The QRF segment of a batch sent as a query response. */
  queryFilter?: QRF;
  /**
   * One entry per message of the batch, in order: the root `parse()` result of that message. A
   * failed entry's error carries `{ batch, message, line }` metadata (1-based; the line is that of
   * the message's MSH in the input).
   */
  messages: Result<ParsedHL7Message>[];
  /** The BTS segment, when the batch has one. */
  trailer?: BTS;
}

/** A parsed batch file. */
export interface ParsedBatchFile {
  /** The FHS segment, when the file has one. */
  fileHeader?: FHS;
  /** The batches of the file, in order (one, without a header, for a bare run of messages). */
  batches: ParsedBatch[];
  /** The FTS segment, when the file has one. */
  fileTrailer?: FTS;
  /** A BTS-1 or FTS-1 count that does not match what the file holds; empty when all agree. */
  warnings: string[];
}

/** The segments that delimit messages and batches: a message never contains one. */
const ENVELOPE = new Set(["FHS", "BHS", "BTS", "FTS"]);

const fail = (message: string): Result<never> => ({ ok: false, err: new Err(message) });
const nameOf = (line: string) => line.substring(0, 3);
const firstValue = (segment: { fields: { components: { subComponents: string[] }[] }[] }, index: number) =>
  segment.fields[index] ? ParserUtils.getComponent(segment.fields[index], 0).trim() : "";

/**
 * Parses an HL7 batch file (or a single batch, or a bare run of messages) into its file header,
 * batches and file trailer, each message parsed by the root {@link parse} with `options`.
 *
 * Fails for an empty input, an envelope segment that cannot be parsed, a segment outside any
 * message or after FTS, and a second FHS. A BTS-1 or FTS-1 that disagrees with the messages or
 * batches actually present is reported in `warnings`, not as a failure.
 */
export function parseBatch(batchString: string, options: ParseOptions = {}): Result<ParsedBatchFile> {
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
      const result = parse(lines.slice(i, end).join("\r"), options);
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

/** A message of a batch to encode: a wire string, or anything that encodes to one (an `HL7Message`, a builder). */
export type BatchMessageInput = string | { encode(): string };

/** One batch to encode. */
export interface BatchInput {
  /** The BHS segment. */
  header?: BHS;
  /** The QRD segment of a batch sent as a query response. */
  query?: QRD;
  /** The QRF segment of a batch sent as a query response. */
  queryFilter?: QRF;
  /** The messages of the batch, in order. */
  messages: BatchMessageInput[];
  /** The BTS segment. BTS-1 is not filled in: set `messageCount()` yourself. */
  trailer?: BTS;
}

/** A batch file to encode. */
export interface BatchFileInput {
  /** The FHS segment. */
  fileHeader?: FHS;
  /** The batches of the file, in order. */
  batches: BatchInput[];
  /** The FTS segment. FTS-1 is not filled in: set `fileBatchCount()` yourself. */
  fileTrailer?: FTS;
}

/** Options of {@link encodeBatch}. */
export interface EncodeBatchOptions {
  /** The segment terminator between segments and messages (`\r` by default). */
  terminator?: "\r" | "\n" | "\r\n";
}

/**
 * Writes a batch file out in structure order: `[FHS] { [BHS] [QRD] [QRF] { messages } [BTS] } [FTS]`.
 * Every segment is encoded with the characters of its own header (BHS for the batch's segments,
 * FHS for the file's, the default when there is none); messages are written as they encode.
 */
export function encodeBatch(file: BatchFileInput, options: EncodeBatchOptions = {}): string {
  const terminator = options.terminator ?? "\r";
  const fileEncoding = file.fileHeader?.encoding ?? DEFAULT_ENCODING;
  const out: string[] = [];
  if (file.fileHeader) out.push(file.fileHeader.encode());
  for (const batch of file.batches) {
    const encoding = batch.header?.encoding ?? fileEncoding;
    if (batch.header) out.push(batch.header.encode());
    if (batch.query) out.push(batch.query.encode(encoding));
    if (batch.queryFilter) out.push(batch.queryFilter.encode(encoding));
    for (const message of batch.messages) {
      const wire = typeof message === "string" ? message : message.encode();
      out.push(wire.replace(/[\r\n]+$/, "").split(/\r\n|\r|\n/).join(terminator));
    }
    if (batch.trailer) out.push(batch.trailer.encode(encoding));
  }
  if (file.fileTrailer) out.push(file.fileTrailer.encode(fileEncoding));
  return out.join(terminator);
}
