/**
 * Builder, parser and structure for ADT^A32 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
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

export { ADT_A21_STRUCTURE as ADT_A32_STRUCTURE } from "./ADT_A21.ts";

/** Structured result of parsing an HL7 ADT^A32 (HL7 v2.4) message. */
export type ParsedADT_A32 = ParsedADT_A21;

/** Parser for HL7 ADT^A32 (HL7 v2.4) messages. */
export class ADT_A32_Parser extends ADT_A21_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A32";
}

/** Parses an HL7 ADT^A32 (HL7 v2.4) message string into a structured result. */
export function parseADT_A32(messageString: string): Result<ParsedADT_A32> {
  return new ADT_A32_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A32 (HL7 v2.4) message. */
export type ADT_A32Options = ADT_A21Options;

/** Builder for HL7 ADT^A32 (HL7 v2.4) messages. */
export class ADT_A32<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A21<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A32";
}

/** Builds an HL7 ADT^A32 (HL7 v2.4) message. */
export function createADT_A32<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A32Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A32<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A32(header, event, patient, visit, options, encoding);
}
