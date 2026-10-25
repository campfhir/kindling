/**
 * Parser for ADT^A31 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [{NK1}] PV1 [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01 } from "./ADT_A01_Parser.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A01_Parser.ts";
/** Structured result of parsing an HL7 ADT^A31 (HL7 v2.3.1) message. */
export type ParsedADT_A31 = ParsedADT_A01;

/** Parser for HL7 ADT^A31 (HL7 v2.3.1) messages. */
export class ADT_A31_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A31";
}

/** Parses an HL7 ADT^A31 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A31(messageString: string): Result<ParsedADT_A31> {
  return new ADT_A31_Parser().parse(messageString);
}
