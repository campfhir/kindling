/**
 * Parser for PMU^B06 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}]
 * Shares the PMU^B04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PMU_B04_Parser, type ParsedPMU_B04 } from "./PMU_B04_Parser.ts";

/** Structured result of parsing an HL7 PMU^B06 (HL7 v2.9.1) message. */
export type ParsedPMU_B06 = ParsedPMU_B04;

/** Parser for HL7 PMU^B06 (HL7 v2.9.1) messages. */
export class PMU_B06_Parser extends PMU_B04_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B06";
}

/** Parses an HL7 PMU^B06 (HL7 v2.9.1) message string into a structured result. */
export function parsePMU_B06(messageString: string): Result<ParsedPMU_B06> {
  return new PMU_B06_Parser().parse(messageString);
}
