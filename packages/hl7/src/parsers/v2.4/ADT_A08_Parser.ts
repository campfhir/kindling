/**
 * Parser for ADT^A08 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [PDA]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01 } from "./ADT_A01_Parser.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A01_Parser.ts";
/** Structured result of parsing an HL7 ADT^A08 (HL7 v2.4) message. */
export type ParsedADT_A08 = ParsedADT_A01;

/** Parser for HL7 ADT^A08 (HL7 v2.4) messages. */
export class ADT_A08_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A08";
}

/** Parses an HL7 ADT^A08 (HL7 v2.4) message string into a structured result. */
export function parseADT_A08(messageString: string): Result<ParsedADT_A08> {
  return new ADT_A08_Parser().parse(messageString);
}
