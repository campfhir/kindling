/**
 * `@campfhir/hl7` — a zero-dependency TypeScript library for building and
 * parsing HL7v2 messages (v2.3 … v2.9.1), runnable on Node.js, Bun,
 * browsers, and Cloudflare Workers.
 *
 * This root entrypoint exposes the root parser (`parse()`, which reads MSH-9 and MSH-12 and
 * dispatches to the generated parser of the message), the batch protocol (`parseBatch()` and
 * `encodeBatch()` for FHS/BHS … BTS/FTS files) and the version-agnostic core: encoding,
 * segment and message primitives, schema types, the parser utilities, value extraction, date
 * formatting, custom segments, and the message editor.
 *
 * Versioned segments, parsers, and builders are imported from their own
 * subpaths, e.g. `@campfhir/hl7/v2.5.1` or
 * `@campfhir/hl7/v2.9.1/ADT_A01`.
 *
 * @module
 */

// Core types — version-agnostic
export { type EncodingCharacters, DEFAULT_ENCODING } from "./types/encoding.ts";
export { type Segment, type Field, type Component, BaseSegment } from "./types/segment.ts";
export { type Message, HL7Message } from "./types/message.ts";
export {
  type MessageSchema,
  type SegmentDefinition,
  type SegmentChoice,
  type SegmentGroup,
  type StructureItem,
  isSegmentChoice,
  isSegmentGroup,
  itemField,
} from "./types/schema.ts";
export {
  parseStructure,
  verifyStructure,
  encodeStructure,
  type ParsedMessageBase,
  type SegmentParsers,
  type StructureInput,
  type StructureValue,
} from "./types/structure.ts";
export { ParserUtils, type SegmentParser } from "./types/parser.ts";

// The root parser: any HL7 v2 input, one message dispatched on MSH-9 and MSH-12 to its generated
// parser, or a batch file.
export { parse, selectParser, type ParsedHL7, type ParsedHL7Batch, type SelectedParser, type SelectedBatchParser } from "./parse.ts";
export {
  parseMessage,
  selectMessageParser,
  identifyMessage,
  isBatchInput,
  SUPPORTED_VERSIONS,
  type HL7Version,
  type MessageType,
  type MessageStructureOf,
  type ParsedMessageOf,
  type ParseOptions,
  type ParsedHL7Message,
  type ParsedHL7MessageOf,
  type SelectedMessageParser,
  type SelectedMessageParserOf,
} from "./dispatch.ts";
export {
  parseBatch,
  encodeBatch,
  type ParsedBatch,
  type ParsedBatchFile,
  type BatchInput,
  type BatchFileInput,
  type BatchMessageInput,
  type EncodeBatchOptions,
} from "./batch.ts";

export * from "./utils/ValueExtractor.ts";
export { dateUtils, type LayoutName, type FormatOptions, Layout, ANSIC, UnixDate, RubyDate, RFC822, RFC822Z, RFC850, RFC1123, RFC1123Z, RFC3339, RFC3339Nano, Kitchen, Stamp, StampMilli, StampMicro, StampNano, DateTime, DateOnly, TimeOnly } from "./utils/dateUtils.ts";
export { CustomSegment } from "./utils/CustomSegment.ts";
export { MessageEditor, InsertionBuilder, PositionedInsertionBuilder } from "./utils/MessageEditor.ts";

// Versioned segments, structures, parsers, and builders must be imported directly:
//   import { OBX } from "@campfhir/hl7/v2.5.1"
//   import { parseORU_R01 } from "@campfhir/hl7/v2.5.1"
//   import { parseMFN_M02 } from "@campfhir/hl7/v2.3"
