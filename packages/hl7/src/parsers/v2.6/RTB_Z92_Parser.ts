/**
 * Parser for RTB^Z92 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ ROW_DEFINITION: RDF [{RDT}] ] [DSC]
 * Shares the RTB^K13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RTB_K13_Parser, type ParsedRTB_K13 } from "./RTB_K13_Parser.ts";

export type { ParsedRowDefinition } from "./RTB_K13_Parser.ts";
/** Structured result of parsing an HL7 RTB^Z92 (HL7 v2.6) message. */
export type ParsedRTB_Z92 = ParsedRTB_K13;

/** Parser for HL7 RTB^Z92 (HL7 v2.6) messages. */
export class RTB_Z92_Parser extends RTB_K13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RTB_Z92";
}

/** Parses an HL7 RTB^Z92 (HL7 v2.6) message string into a structured result. */
export function parseRTB_Z92(messageString: string): Result<ParsedRTB_Z92> {
  return new RTB_Z92_Parser().parse(messageString);
}
