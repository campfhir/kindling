/**
 * Builder, parser and structure for ADT^A04 messages (HL7 v2.7.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01, ADT_A01, type ADT_A01Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A01_STRUCTURE as ADT_A04_STRUCTURE } from "./ADT_A01.ts";

export type { ParsedProcedure, ParsedInsurance } from "./ADT_A01.ts";
/** Structured result of parsing an HL7 ADT^A04 (HL7 v2.7.1) message. */
export type ParsedADT_A04 = ParsedADT_A01;

/** Parser for HL7 ADT^A04 (HL7 v2.7.1) messages. */
export class ADT_A04_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A04";
}

/** Parses an HL7 ADT^A04 (HL7 v2.7.1) message string into a structured result. */
export function parseADT_A04(messageString: string): Result<ParsedADT_A04> {
  return new ADT_A04_Parser().parse(messageString);
}

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A04 (HL7 v2.7.1) message. */
export type ADT_A04Options = ADT_A01Options;

/** Builder for HL7 ADT^A04 (HL7 v2.7.1) messages. */
export class ADT_A04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A01<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A04";
}

/** Builds an HL7 ADT^A04 (HL7 v2.7.1) message. */
export function createADT_A04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A04<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A04(header, event, patient, visit, options, encoding);
}
