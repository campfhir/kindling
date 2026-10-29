/**
 * Builder, parser and structure for ADT^A48 messages (HL7 v2.3.1).
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

export { ADT_A34_STRUCTURE as ADT_A48_STRUCTURE } from "./ADT_A34.ts";

/** Structured result of parsing an HL7 ADT^A48 (HL7 v2.3.1) message. */
export type ParsedADT_A48 = ParsedADT_A34;

/** Parser for HL7 ADT^A48 (HL7 v2.3.1) messages. */
export class ADT_A48_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A48";
}

/** Parses an HL7 ADT^A48 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A48(messageString: string): Result<ParsedADT_A48> {
  return new ADT_A48_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A48 (HL7 v2.3.1) message. */
export type ADT_A48Options = ADT_A34Options;

/** Builder for HL7 ADT^A48 (HL7 v2.3.1) messages. */
export class ADT_A48<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A48";
}

/** Builds an HL7 ADT^A48 (HL7 v2.3.1) message. */
export function createADT_A48<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A48Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A48<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A48(header, event, patient, merge, options, encoding);
}
