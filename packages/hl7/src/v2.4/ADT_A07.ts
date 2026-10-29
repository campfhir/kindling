/**
 * Builder, parser and structure for ADT^A07 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{ROL}] [MRG] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A06 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A06_Parser, type ParsedADT_A06, ADT_A06, type ADT_A06Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A06.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A06_STRUCTURE as ADT_A07_STRUCTURE } from "./ADT_A06.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A06.ts";
/** Structured result of parsing an HL7 ADT^A07 (HL7 v2.4) message. */
export type ParsedADT_A07 = ParsedADT_A06;

/** Parser for HL7 ADT^A07 (HL7 v2.4) messages. */
export class ADT_A07_Parser extends ADT_A06_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A07";
}

/** Parses an HL7 ADT^A07 (HL7 v2.4) message string into a structured result. */
export function parseADT_A07(messageString: string): Result<ParsedADT_A07> {
  return new ADT_A07_Parser().parse(messageString);
}

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A07 (HL7 v2.4) message. */
export type ADT_A07Options = ADT_A06Options;

/** Builder for HL7 ADT^A07 (HL7 v2.4) messages. */
export class ADT_A07<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A06<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A07";
}

/** Builds an HL7 ADT^A07 (HL7 v2.4) message. */
export function createADT_A07<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A07<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A07(header, event, patient, visit, options, encoding);
}
