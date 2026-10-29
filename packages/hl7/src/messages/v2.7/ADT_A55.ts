/**
 * Builder, parser and structure for ADT^A55 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [PV2] [{ROL}]
 * Shares the ADT^A54 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A54_Parser, type ParsedADT_A54, ADT_A54, type ADT_A54Options } from "./ADT_A54.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { EVN } from "../../segments/v2.7/EVN.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";

export { ADT_A54_STRUCTURE as ADT_A55_STRUCTURE } from "./ADT_A54.ts";

/** Structured result of parsing an HL7 ADT^A55 (HL7 v2.7) message. */
export type ParsedADT_A55 = ParsedADT_A54;

/** Parser for HL7 ADT^A55 (HL7 v2.7) messages. */
export class ADT_A55_Parser extends ADT_A54_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A55";
}

/** Parses an HL7 ADT^A55 (HL7 v2.7) message string into a structured result. */
export function parseADT_A55(messageString: string): Result<ParsedADT_A55> {
  return new ADT_A55_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A55 (HL7 v2.7) message. */
export type ADT_A55Options = ADT_A54Options;

/** Builder for HL7 ADT^A55 (HL7 v2.7) messages. */
export class ADT_A55<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A54<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A55";
}

/** Builds an HL7 ADT^A55 (HL7 v2.7) message. */
export function createADT_A55<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A55Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A55<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A55(header, event, patient, visit, options, encoding);
}
