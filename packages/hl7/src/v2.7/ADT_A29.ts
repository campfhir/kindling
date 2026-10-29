/**
 * Builder, parser and structure for ADT^A29 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A21 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A21_Parser, type ParsedADT_A21, ADT_A21, type ADT_A21Options } from "./ADT_A21.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A21_STRUCTURE as ADT_A29_STRUCTURE } from "./ADT_A21.ts";

/** Structured result of parsing an HL7 ADT^A29 (HL7 v2.7) message. */
export type ParsedADT_A29 = ParsedADT_A21;

/** Parser for HL7 ADT^A29 (HL7 v2.7) messages. */
export class ADT_A29_Parser extends ADT_A21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A29";
}

/** Parses an HL7 ADT^A29 (HL7 v2.7) message string into a structured result. */
export function parseADT_A29(messageString: string): Result<ParsedADT_A29> {
  return new ADT_A29_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A29 (HL7 v2.7) message. */
export type ADT_A29Options = ADT_A21Options;

/** Builder for HL7 ADT^A29 (HL7 v2.7) messages. */
export class ADT_A29<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A21<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A29";
}

/** Builds an HL7 ADT^A29 (HL7 v2.7) message. */
export function createADT_A29<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A29Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A29<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A29(header, event, patient, visit, options, encoding);
}
