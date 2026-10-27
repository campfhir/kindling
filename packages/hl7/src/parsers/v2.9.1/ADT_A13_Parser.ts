/**
 * Parser for ADT^A13 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01 } from "./ADT_A01_Parser.ts";

export type { ParsedNextOfKin, ParsedObservation, ParsedProcedure, ParsedGuarantor, ParsedInsurance, ParsedAuthorization, ParsedReferral } from "./ADT_A01_Parser.ts";
/** Structured result of parsing an HL7 ADT^A13 (HL7 v2.9.1) message. */
export type ParsedADT_A13 = ParsedADT_A01;

/** Parser for HL7 ADT^A13 (HL7 v2.9.1) messages. */
export class ADT_A13_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A13";
}

/** Parses an HL7 ADT^A13 (HL7 v2.9.1) message string into a structured result. */
export function parseADT_A13(messageString: string): Result<ParsedADT_A13> {
  return new ADT_A13_Parser().parse(messageString);
}
