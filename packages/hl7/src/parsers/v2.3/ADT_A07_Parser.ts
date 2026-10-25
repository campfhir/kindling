/**
 * Parser for ADT^A07 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] [MRG] [{NK1}] PV1 [PV2] [{DB1}] [DRG] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A06 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A06_Parser, type ParsedADT_A06 } from "./ADT_A06_Parser.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A06_Parser.ts";
/** Structured result of parsing an HL7 ADT^A07 (HL7 v2.3) message. */
export type ParsedADT_A07 = ParsedADT_A06;

/** Parser for HL7 ADT^A07 (HL7 v2.3) messages. */
export class ADT_A07_Parser extends ADT_A06_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A07";
}

/** Parses an HL7 ADT^A07 (HL7 v2.3) message string into a structured result. */
export function parseADT_A07(messageString: string): Result<ParsedADT_A07> {
  return new ADT_A07_Parser().parse(messageString);
}
