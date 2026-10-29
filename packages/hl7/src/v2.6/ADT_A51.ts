/**
 * Builder, parser and structure for ADT^A51 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] MRG PV1
 * Shares the ADT^A50 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A50_Parser, type ParsedADT_A50, ADT_A50, type ADT_A50Options } from "./ADT_A50.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { MRG } from "./MRG.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A50_STRUCTURE as ADT_A51_STRUCTURE } from "./ADT_A50.ts";

/** Structured result of parsing an HL7 ADT^A51 (HL7 v2.6) message. */
export type ParsedADT_A51 = ParsedADT_A50;

/** Parser for HL7 ADT^A51 (HL7 v2.6) messages. */
export class ADT_A51_Parser extends ADT_A50_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A51";
}

/** Parses an HL7 ADT^A51 (HL7 v2.6) message string into a structured result. */
export function parseADT_A51(messageString: string): Result<ParsedADT_A51> {
  return new ADT_A51_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A51 (HL7 v2.6) message. */
export type ADT_A51Options = ADT_A50Options;

/** Builder for HL7 ADT^A51 (HL7 v2.6) messages. */
export class ADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1> extends ADT_A50<TMSH, TEVN, TPID, TMRG, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A51";
}

/** Builds an HL7 ADT^A51 (HL7 v2.6) message. */
export function createADT_A51<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  visit: TPV1,
  options: ADT_A51Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A51<TMSH, TEVN, TPID, TMRG, TPV1> {
  return new ADT_A51(header, event, patient, merge, visit, options, encoding);
}
