/**
 * Parser for PMU^B02 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{GSP}] [{GSR}] [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{ NEXT_OF_KIN: [{NK1}] [{GSP}] [{GSR}] }] [{PRT}] [{ROL}]
 * Shares the PMU^B01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PMU_B01_Parser, type ParsedPMU_B01 } from "./PMU_B01_Parser.ts";

export type { ParsedNextOfKin } from "./PMU_B01_Parser.ts";
/** Structured result of parsing an HL7 PMU^B02 (HL7 v2.9.1) message. */
export type ParsedPMU_B02 = ParsedPMU_B01;

/** Parser for HL7 PMU^B02 (HL7 v2.9.1) messages. */
export class PMU_B02_Parser extends PMU_B01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B02";
}

/** Parses an HL7 PMU^B02 (HL7 v2.9.1) message string into a structured result. */
export function parsePMU_B02(messageString: string): Result<ParsedPMU_B02> {
  return new PMU_B02_Parser().parse(messageString);
}
