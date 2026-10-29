/**
 * Parser for PMU^B05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}]
 * Shares the PMU^B04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PMU_B04_Parser, type ParsedPMU_B04 } from "./PMU_B04_Parser.ts";

/** Structured result of parsing an HL7 PMU^B05 (HL7 v2.6) message. */
export type ParsedPMU_B05 = ParsedPMU_B04;

/** Parser for HL7 PMU^B05 (HL7 v2.6) messages. */
export class PMU_B05_Parser extends PMU_B04_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B05";
}

/** Parses an HL7 PMU^B05 (HL7 v2.6) message string into a structured result. */
export function parsePMU_B05(messageString: string): Result<ParsedPMU_B05> {
  return new PMU_B05_Parser().parse(messageString);
}
