/**
 * Builder, parser and structure for ADT^A41 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A39_Parser, type ParsedADT_A39, ADT_A39, type ADT_A39Options, type MergePatient } from "./ADT_A39.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";

export { ADT_A39_STRUCTURE as ADT_A41_STRUCTURE } from "./ADT_A39.ts";

export type { ParsedMergePatient } from "./ADT_A39.ts";
/** Structured result of parsing an HL7 ADT^A41 (HL7 v2.3.1) message. */
export type ParsedADT_A41 = ParsedADT_A39;

/** Parser for HL7 ADT^A41 (HL7 v2.3.1) messages. */
export class ADT_A41_Parser extends ADT_A39_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A41";
}

/** Parses an HL7 ADT^A41 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A41(messageString: string): Result<ParsedADT_A41> {
  return new ADT_A41_Parser().parse(messageString);
}

export type { MergePatient };
/** The optional segments and groups of an ADT^A41 (HL7 v2.3.1) message. */
export type ADT_A41Options = ADT_A39Options;

/** Builder for HL7 ADT^A41 (HL7 v2.3.1) messages. */
export class ADT_A41<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A39<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A41";
}

/** Builds an HL7 ADT^A41 (HL7 v2.3.1) message. */
export function createADT_A41<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A41Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A41<TMSH, TEVN> {
  return new ADT_A41(header, event, patients, options, encoding);
}
