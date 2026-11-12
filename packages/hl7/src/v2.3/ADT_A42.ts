/**
 * Builder, parser and structure for ADT^A42 messages (HL7 v2.3).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { ADT_A39_Parser, type ParsedADT_A39, ADT_A39, type ADT_A39Options, type MergePatient } from "./ADT_A39.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";

export { ADT_A39_STRUCTURE as ADT_A42_STRUCTURE } from "./ADT_A39.ts";

export type { ParsedMergePatient } from "./ADT_A39.ts";
/** Structured result of parsing an HL7 ADT^A42 (HL7 v2.3) message. */
export type ParsedADT_A42 = ParsedADT_A39;

/**
 * An HL7 ADT^A42 (HL7 v2.3) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedADT_A42>(message, "2.3", "ADT_A42")` of `@campfhir/hl7/parse`.
 */
export type DispatchedADT_A42 = ParsedHL7MessageOf<"2.3", "ADT_A42", ParsedADT_A42>;

/** Parser for HL7 ADT^A42 (HL7 v2.3) messages. */
export class ADT_A42_Parser extends ADT_A39_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Parses an HL7 ADT^A42 (HL7 v2.3) message string into a structured result. */
export function parseADT_A42(messageString: string): Result<ParsedADT_A42> {
  return new ADT_A42_Parser().parse(messageString);
}

export type { MergePatient };
/** The optional segments and groups of an ADT^A42 (HL7 v2.3) message. */
export type ADT_A42Options = ADT_A39Options;

/** Builder for HL7 ADT^A42 (HL7 v2.3) messages. */
export class ADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A39<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Builds an HL7 ADT^A42 (HL7 v2.3) message. */
export function createADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A42Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A42<TMSH, TEVN> {
  return new ADT_A42(header, event, patients, options, encoding);
}
