/**
 * Builder, parser and structure for ADT^A11 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A09 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A09_Parser, type ParsedADT_A09, ADT_A09, type ADT_A09Options } from "./ADT_A09.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A09_STRUCTURE as ADT_A11_STRUCTURE } from "./ADT_A09.ts";

/** Structured result of parsing an HL7 ADT^A11 (HL7 v2.8) message. */
export type ParsedADT_A11 = ParsedADT_A09;

/** Parser for HL7 ADT^A11 (HL7 v2.8) messages. */
export class ADT_A11_Parser extends ADT_A09_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A11";
}

/** Parses an HL7 ADT^A11 (HL7 v2.8) message string into a structured result. */
export function parseADT_A11(messageString: string): Result<ParsedADT_A11> {
  return new ADT_A11_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A11 (HL7 v2.8) message. */
export type ADT_A11Options = ADT_A09Options;

/** Builder for HL7 ADT^A11 (HL7 v2.8) messages. */
export class ADT_A11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A09<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A11";
}

/** Builds an HL7 ADT^A11 (HL7 v2.8) message. */
export function createADT_A11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A11<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A11(header, event, patient, visit, options, encoding);
}
