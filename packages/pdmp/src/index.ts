/**
 * `@campfhir/pdmp` — a zero-dependency TypeScript library for building and parsing ASAP
 * prescription drug monitoring program (PDMP) reports, runnable on Node.js, Bun, browsers, and
 * Cloudflare Workers.
 *
 * This root entrypoint exposes the syntax and the envelope: delimiters, the segment model, the
 * tokenizer, the envelope segments (TH, IS, TP, TT), `encodeReport()` and what an input says about
 * itself (`identifyReport()`, `isAsapInput()`).
 *
 * The parser lives in `@campfhir/pdmp/parse`: `parse()` (asynchronous, like `@campfhir/hl7/parse`)
 * and `parseReport()`.
 *
 * @module
 */

export { type Delimiters, DEFAULT_DELIMITERS } from "./types/delimiters.ts";
export { type Segment, BaseSegment, GenericSegment } from "./types/segment.ts";
export type { Result, AsyncResult } from "./types/result.ts";
export { Err } from "./utils/err.ts";
export { readDelimiters, parseSegment, tokenize } from "./tokenize.ts";

export { TH } from "./envelope/TH.ts";
export { IS, TP, TT } from "./envelope/segments.ts";

export {
  encodeReport,
  pharmacyTrailer,
  reportTrailer,
  type ParsedReport,
  type ParsedPharmacy,
  type ParsedPatient,
  type ParsedDispensation,
  type ReportInput,
  type PharmacyInput,
  type PatientInput,
  type DispensationInput,
  type EncodeReportOptions,
} from "./report.ts";
export { identifyReport, isAsapInput, type ReportType } from "./identify.ts";
