/**
 * Builder, parser and structure for ADT^A40 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] MRG [PV1] }
 * Shares the ADT^A39 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A39_Parser, type ParsedADT_A39, ADT_A39, type ADT_A39Options, type MergePatient } from "./ADT_A39.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";

export { ADT_A39_STRUCTURE as ADT_A40_STRUCTURE } from "./ADT_A39.ts";

export type { ParsedMergePatient } from "./ADT_A39.ts";
/** Structured result of parsing an HL7 ADT^A40 (HL7 v2.5) message. */
export type ParsedADT_A40 = ParsedADT_A39;

/** Parser for HL7 ADT^A40 (HL7 v2.5) messages. */
export class ADT_A40_Parser extends ADT_A39_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A40";
}

/** Parses an HL7 ADT^A40 (HL7 v2.5) message string into a structured result. */
export function parseADT_A40(messageString: string): Result<ParsedADT_A40> {
  return new ADT_A40_Parser().parse(messageString);
}

export type { MergePatient };
/** The optional segments and groups of an ADT^A40 (HL7 v2.5) message. */
export type ADT_A40Options = ADT_A39Options;

/** Builder for HL7 ADT^A40 (HL7 v2.5) messages. */
export class ADT_A40<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A39<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A40";
}

/** Builds an HL7 ADT^A40 (HL7 v2.5) message. */
export function createADT_A40<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MergePatient[],
  options: ADT_A40Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A40<TMSH, TEVN> {
  return new ADT_A40(header, event, patients, options, encoding);
}
