/**
 * Builder, parser and structure for ADT^A04 messages (HL7 v2.9).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01, ADT_A01, type ADT_A01Options, type NextOfKinGroup, type ObservationGroup, type ProcedureGroup, type InsuranceGroup, type AuthorizationGroup, type ReferralGroup } from "./ADT_A01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";

export { ADT_A01_STRUCTURE as ADT_A04_STRUCTURE } from "./ADT_A01.ts";

export type { ParsedNextOfKin, ParsedObservation, ParsedProcedure, ParsedInsurance, ParsedAuthorization, ParsedReferral } from "./ADT_A01.ts";
/** Structured result of parsing an HL7 ADT^A04 (HL7 v2.9) message. */
export type ParsedADT_A04 = ParsedADT_A01;

/** Parser for HL7 ADT^A04 (HL7 v2.9) messages. */
export class ADT_A04_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A04";
}

/** Parses an HL7 ADT^A04 (HL7 v2.9) message string into a structured result. */
export function parseADT_A04(messageString: string): Result<ParsedADT_A04> {
  return new ADT_A04_Parser().parse(messageString);
}

export type { NextOfKinGroup, ObservationGroup, ProcedureGroup, InsuranceGroup, AuthorizationGroup, ReferralGroup };
/** The optional segments and groups of an ADT^A04 (HL7 v2.9) message. */
export type ADT_A04Options = ADT_A01Options;

/** Builder for HL7 ADT^A04 (HL7 v2.9) messages. */
export class ADT_A04<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A01<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A04";
}

/** Builds an HL7 ADT^A04 (HL7 v2.9) message. */
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
