/**
 * Builder, parser and structure for ADT^A49 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { ADT_A43_Parser, type ParsedADT_A43, ADT_A43, type ADT_A43Options, type PatientGroup } from "./ADT_A43.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";

export { ADT_A43_STRUCTURE as ADT_A49_STRUCTURE } from "./ADT_A43.ts";

export type { ParsedPatient } from "./ADT_A43.ts";
/** Structured result of parsing an HL7 ADT^A49 (HL7 v2.7.1) message. */
export type ParsedADT_A49 = ParsedADT_A43;

/**
 * An HL7 ADT^A49 (HL7 v2.7.1) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedADT_A49>(message, "2.7.1", "ADT_A49")` of `@campfhir/hl7/parse`.
 */
export type DispatchedADT_A49 = ParsedHL7MessageOf<"2.7.1", "ADT_A49", ParsedADT_A49>;

/** Parser for HL7 ADT^A49 (HL7 v2.7.1) messages. */
export class ADT_A49_Parser extends ADT_A43_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Parses an HL7 ADT^A49 (HL7 v2.7.1) message string into a structured result. */
export function parseADT_A49(messageString: string): Result<ParsedADT_A49> {
  return new ADT_A49_Parser().parse(messageString);
}

export type { PatientGroup };
/** The optional segments and groups of an ADT^A49 (HL7 v2.7.1) message. */
export type ADT_A49Options = ADT_A43Options;

/** Builder for HL7 ADT^A49 (HL7 v2.7.1) messages. */
export class ADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A43<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Builds an HL7 ADT^A49 (HL7 v2.7.1) message. */
export function createADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A49Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A49<TMSH, TEVN> {
  return new ADT_A49(header, event, patients, options, encoding);
}
