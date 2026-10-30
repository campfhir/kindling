/**
 * The HL7 batch protocol's types and encoder. Parsing a batch file is `parseBatch()` of `./parse.ts`,
 * the `@campfhir/hl7/parse` entry, since each message in it is dispatched to its version's parser.
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
 * single message is a batch of one.
 *
 * @module
 */
import type { Result } from "./types/result.ts";
import { DEFAULT_ENCODING } from "./types/encoding.ts";
import type { FHS } from "./v2.3/FHS.ts";
import type { FTS } from "./v2.3/FTS.ts";
import type { BHS } from "./v2.3/BHS.ts";
import type { BTS } from "./v2.3/BTS.ts";
import type { QRD } from "./v2.3/QRD.ts";
import type { QRF } from "./v2.3/QRF.ts";
import type { ParsedHL7Message } from "./dispatch.ts";

/** One batch of a parsed file. */
export interface ParsedBatch {
  /** The BHS segment, when the batch has one. */
  header?: BHS;
  /** The QRD segment of a batch sent as a query response. */
  query?: QRD;
  /** The QRF segment of a batch sent as a query response. */
  queryFilter?: QRF;
  /**
   * One entry per message of the batch, in order: the `parseMessage()` result of that message. A
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
