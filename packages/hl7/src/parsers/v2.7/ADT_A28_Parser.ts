/**
 * Parser for ADT^A28 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] [{ROL}] [{NK1}] PV1 [PV2] [{ARV}] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A05_Parser, type ParsedADT_A05 } from "./ADT_A05_Parser.ts";

export type { ParsedProcedure, ParsedInsurance } from "./ADT_A05_Parser.ts";
/** Structured result of parsing an HL7 ADT^A28 (HL7 v2.7) message. */
export type ParsedADT_A28 = ParsedADT_A05;

/** Parser for HL7 ADT^A28 (HL7 v2.7) messages. */
export class ADT_A28_Parser extends ADT_A05_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A28";
}

/** Parses an HL7 ADT^A28 (HL7 v2.7) message string into a structured result. */
export function parseADT_A28(messageString: string): Result<ParsedADT_A28> {
  return new ADT_A28_Parser().parse(messageString);
}
