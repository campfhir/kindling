/**
 * Builder, parser and structure for ADT^A47 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] [{ARV}] MRG }
 * Shares the ADT^A44 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A44_Parser, type ParsedADT_A44, ADT_A44, type ADT_A44Options, type PatientGroup } from "./ADT_A44.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";

export { ADT_A44_STRUCTURE as ADT_A47_STRUCTURE } from "./ADT_A44.ts";

export type { ParsedPatient } from "./ADT_A44.ts";
/** Structured result of parsing an HL7 ADT^A47 (HL7 v2.8.2) message. */
export type ParsedADT_A47 = ParsedADT_A44;

/** Parser for HL7 ADT^A47 (HL7 v2.8.2) messages. */
export class ADT_A47_Parser extends ADT_A44_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Parses an HL7 ADT^A47 (HL7 v2.8.2) message string into a structured result. */
export function parseADT_A47(messageString: string): Result<ParsedADT_A47> {
  return new ADT_A47_Parser().parse(messageString);
}

export type { PatientGroup };
/** The optional segments and groups of an ADT^A47 (HL7 v2.8.2) message. */
export type ADT_A47Options = ADT_A44Options;

/** Builder for HL7 ADT^A47 (HL7 v2.8.2) messages. */
export class ADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A44<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Builds an HL7 ADT^A47 (HL7 v2.8.2) message. */
export function createADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: PatientGroup[],
  options: ADT_A47Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A47<TMSH, TEVN> {
  return new ADT_A47(header, event, patients, options, encoding);
}
