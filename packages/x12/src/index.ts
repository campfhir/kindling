/**
 * `@campfhir/x12` — a zero-dependency TypeScript library for building and parsing X12 EDI
 * interchanges, runnable on Node.js, Bun, browsers, and Cloudflare Workers.
 *
 * This root entrypoint exposes the syntax and the envelopes: delimiters, the segment model, the
 * tokenizer, the envelope segments (ISA, GS, ST, SE, GE, IEA), `encodeInterchange()` and what an
 * input says about itself (`identifyInterchange()`, `isX12Input()`).
 *
 * The parser lives in `@campfhir/x12/parse`: `parse()` (asynchronous, like `@campfhir/hl7/parse`)
 * and `parseInterchange()`. Each implementation guide has its own subpath with its transaction sets
 * and segment classes: `@campfhir/x12/005010X279A1` (270, 271), `@campfhir/x12/005010X222A1` (837P),
 * `@campfhir/x12/005010X221A1` (835) and `@campfhir/x12/005010X231A1` (999 and `acknowledge()`).
 *
 * @module
 */

export { type Delimiters, DEFAULT_DELIMITERS } from "./types/delimiters.ts";
export { type Segment, type Element, type ElementValue, BaseSegment, GenericSegment, createElement, encodeElement } from "./types/segment.ts";
export type { Result, AsyncResult } from "./types/result.ts";
export { Err } from "./utils/err.ts";
export { readDelimiters, splitSegments, parseSegment, parseElement, tokenize } from "./tokenize.ts";

export { ISA, ISA_WIDTHS } from "./envelope/ISA.ts";
export { GS } from "./envelope/GS.ts";
export { ST } from "./envelope/ST.ts";
export { SE, GE, IEA } from "./envelope/trailers.ts";

export {
  encodeInterchange,
  transactionSetTrailer,
  functionalGroupTrailer,
  interchangeTrailer,
  type ParsedInterchange,
  type ParsedFunctionalGroup,
  type ParsedTransactionSet,
  type InterchangeInput,
  type FunctionalGroupInput,
  type TransactionSetInput,
  type EncodeInterchangeOptions,
} from "./interchange.ts";
export { identifyInterchange, isX12Input, type InterchangeType, type TransactionSetType } from "./identify.ts";

// Typed transaction sets: the structure engine, for the guides here and for defining others. Each
// guide's transaction sets and segment classes are in its own subpath (`@campfhir/x12/005010X279A1`).
export {
  segment,
  loop,
  unordered,
  flatten,
  type Qualifier,
  type SegmentItem,
  type LoopItem,
  type UnorderedItem,
  type StructureItem,
  type SegmentClass,
  type TransactionSetSchema,
  type ParsedOf,
  type InputOf,
  type ParsedTransactionOf,
  type TransactionInputOf,
} from "./types/schema.ts";
export { parseStructure, verifyStructure, encodeStructure, matches, type StructureResult, type StructureProblem, type StructureErrorMeta } from "./types/structure.ts";
export { defineTransactionSet, type TransactionSetDefinition, type TypedTransactionSet } from "./types/transaction.ts";
export { SUPPORTED_GUIDES, type TypedX12TransactionSet } from "./dispatch.ts";
