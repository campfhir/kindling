/**
 * Builder, parser and structure for ADT^A47 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] MRG
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A34_Parser, type ParsedADT_A34, ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { MRG } from "./MRG.ts";

export { ADT_A34_STRUCTURE as ADT_A47_STRUCTURE } from "./ADT_A34.ts";

/** Structured result of parsing an HL7 ADT^A47 (HL7 v2.4) message. */
export type ParsedADT_A47 = ParsedADT_A34;

/** Parser for HL7 ADT^A47 (HL7 v2.4) messages. */
export class ADT_A47_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Parses an HL7 ADT^A47 (HL7 v2.4) message string into a structured result. */
export function parseADT_A47(messageString: string): Result<ParsedADT_A47> {
  return new ADT_A47_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A47 (HL7 v2.4) message. */
export type ADT_A47Options = ADT_A34Options;

/** Builder for HL7 ADT^A47 (HL7 v2.4) messages. */
export class ADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A47";
}

/** Builds an HL7 ADT^A47 (HL7 v2.4) message. */
export function createADT_A47<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A47Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A47<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A47(header, event, patient, merge, options, encoding);
}
