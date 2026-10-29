/**
 * Builder, parser and structure for ADT^A29 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A02_Parser, type ParsedADT_A02, ADT_A02, type ADT_A02Options } from "./ADT_A02.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A02_STRUCTURE as ADT_A29_STRUCTURE } from "./ADT_A02.ts";

/** Structured result of parsing an HL7 ADT^A29 (HL7 v2.3.1) message. */
export type ParsedADT_A29 = ParsedADT_A02;

/** Parser for HL7 ADT^A29 (HL7 v2.3.1) messages. */
export class ADT_A29_Parser extends ADT_A02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A29";
}

/** Parses an HL7 ADT^A29 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A29(messageString: string): Result<ParsedADT_A29> {
  return new ADT_A29_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A29 (HL7 v2.3.1) message. */
export type ADT_A29Options = ADT_A02Options;

/** Builder for HL7 ADT^A29 (HL7 v2.3.1) messages. */
export class ADT_A29<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A02<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A29";
}

/** Builds an HL7 ADT^A29 (HL7 v2.3.1) message. */
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
