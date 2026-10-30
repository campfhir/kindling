/**
 * Builder, parser and structure for ADT^A42 messages (HL7 v2.9).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A40 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A40_Parser, type ParsedADT_A40, ADT_A40, type ADT_A40Options, type PatientGroup } from "./ADT_A40.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";

export { ADT_A40_STRUCTURE as ADT_A42_STRUCTURE } from "./ADT_A40.ts";

export type { ParsedPatient } from "./ADT_A40.ts";
/** Structured result of parsing an HL7 ADT^A42 (HL7 v2.9) message. */
export type ParsedADT_A42 = ParsedADT_A40;

/** Parser for HL7 ADT^A42 (HL7 v2.9) messages. */
export class ADT_A42_Parser extends ADT_A40_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Parses an HL7 ADT^A42 (HL7 v2.9) message string into a structured result. */
export function parseADT_A42(messageString: string): Result<ParsedADT_A42> {
  return new ADT_A42_Parser().parse(messageString);
}

export type { PatientGroup };
/** The optional segments and groups of an ADT^A42 (HL7 v2.9) message. */
export type ADT_A42Options = ADT_A40Options;

/** Builder for HL7 ADT^A42 (HL7 v2.9) messages. */
export class ADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A40<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A42";
}

/** Builds an HL7 ADT^A42 (HL7 v2.9) message. */
export function createADT_A42<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A42Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A42<TMSH, TEVN> {
  return new ADT_A42(header, event, patients, options, encoding);
}
