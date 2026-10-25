/**
 * Parser for BAR^P05 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC] [UB1] [UB2] }
 * Shares the BAR^P01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { BAR_P01_Parser, type ParsedBAR_P01 } from "./BAR_P01_Parser.ts";

export type { ParsedBARVisit, ParsedBARProcedure, ParsedBARInsurance } from "./BAR_P01_Parser.ts";
/** Structured result of parsing an HL7 BAR^P05 (HL7 v2.3.1) message. */
export type ParsedBAR_P05 = ParsedBAR_P01;

/** Parser for HL7 BAR^P05 (HL7 v2.3.1) messages. */
export class BAR_P05_Parser extends BAR_P01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "BAR_P05";
}

/** Parses an HL7 BAR^P05 (HL7 v2.3.1) message string into a structured result. */
export function parseBAR_P05(messageString: string): Result<ParsedBAR_P05> {
  return new BAR_P05_Parser().parse(messageString);
}
