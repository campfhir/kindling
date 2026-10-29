/**
 * Builder, parser and structure for ADT^A53 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2]
 * Shares the ADT^A52 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A52_Parser, type ParsedADT_A52, ADT_A52, type ADT_A52Options } from "./ADT_A52.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A52_STRUCTURE as ADT_A53_STRUCTURE } from "./ADT_A52.ts";

/** Structured result of parsing an HL7 ADT^A53 (HL7 v2.8) message. */
export type ParsedADT_A53 = ParsedADT_A52;

/** Parser for HL7 ADT^A53 (HL7 v2.8) messages. */
export class ADT_A53_Parser extends ADT_A52_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A53";
}

/** Parses an HL7 ADT^A53 (HL7 v2.8) message string into a structured result. */
export function parseADT_A53(messageString: string): Result<ParsedADT_A53> {
  return new ADT_A53_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A53 (HL7 v2.8) message. */
export type ADT_A53Options = ADT_A52Options;

/** Builder for HL7 ADT^A53 (HL7 v2.8) messages. */
export class ADT_A53<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A52<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A53";
}

/** Builds an HL7 ADT^A53 (HL7 v2.8) message. */
export function createADT_A53<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A53Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A53<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A53(header, event, patient, visit, options, encoding);
}
