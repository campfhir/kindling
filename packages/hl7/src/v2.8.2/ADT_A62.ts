/**
 * Builder, parser and structure for ADT^A62 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ROL}] PV1 [{ROL}] [PV2]
 * Shares the ADT^A61 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A61_Parser, type ParsedADT_A61, ADT_A61, type ADT_A61Options } from "./ADT_A61.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A61_STRUCTURE as ADT_A62_STRUCTURE } from "./ADT_A61.ts";

/** Structured result of parsing an HL7 ADT^A62 (HL7 v2.8.2) message. */
export type ParsedADT_A62 = ParsedADT_A61;

/** Parser for HL7 ADT^A62 (HL7 v2.8.2) messages. */
export class ADT_A62_Parser extends ADT_A61_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A62";
}

/** Parses an HL7 ADT^A62 (HL7 v2.8.2) message string into a structured result. */
export function parseADT_A62(messageString: string): Result<ParsedADT_A62> {
  return new ADT_A62_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A62 (HL7 v2.8.2) message. */
export type ADT_A62Options = ADT_A61Options;

/** Builder for HL7 ADT^A62 (HL7 v2.8.2) messages. */
export class ADT_A62<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A61<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A62";
}

/** Builds an HL7 ADT^A62 (HL7 v2.8.2) message. */
export function createADT_A62<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A62Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A62<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A62(header, event, patient, visit, options, encoding);
}
