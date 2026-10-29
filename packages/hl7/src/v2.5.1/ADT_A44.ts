/**
 * Builder, parser and structure for ADT^A44 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] MRG }
 * Shares the ADT^A43 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A43_Parser, type ParsedADT_A43, ADT_A43, type ADT_A43Options, type MovePatient } from "./ADT_A43.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";

export { ADT_A43_STRUCTURE as ADT_A44_STRUCTURE } from "./ADT_A43.ts";

export type { ParsedMovePatient } from "./ADT_A43.ts";
/** Structured result of parsing an HL7 ADT^A44 (HL7 v2.5.1) message. */
export type ParsedADT_A44 = ParsedADT_A43;

/** Parser for HL7 ADT^A44 (HL7 v2.5.1) messages. */
export class ADT_A44_Parser extends ADT_A43_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A44";
}

/** Parses an HL7 ADT^A44 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A44(messageString: string): Result<ParsedADT_A44> {
  return new ADT_A44_Parser().parse(messageString);
}

export type { MovePatient };
/** The optional segments and groups of an ADT^A44 (HL7 v2.5.1) message. */
export type ADT_A44Options = ADT_A43Options;

/** Builder for HL7 ADT^A44 (HL7 v2.5.1) messages. */
export class ADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN> extends ADT_A43<TMSH, TEVN> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A44";
}

/** Builds an HL7 ADT^A44 (HL7 v2.5.1) message. */
export function createADT_A44<TMSH extends MSH = MSH, TEVN extends EVN = EVN>(
  header: TMSH,
  event: TEVN,
  patients: MovePatient[],
  options: ADT_A44Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A44<TMSH, TEVN> {
  return new ADT_A44(header, event, patients, options, encoding);
}
