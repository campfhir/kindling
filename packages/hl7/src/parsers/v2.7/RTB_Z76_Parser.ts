/**
 * Parser for RTB^Z76 messages (HL7 v2.7).
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
/** Structured result of parsing an HL7 RTB^Z76 (HL7 v2.7) message. */
export type ParsedRTB_Z76 = ParsedRTB_K13;

/** Parser for HL7 RTB^Z76 (HL7 v2.7) messages. */
export class RTB_Z76_Parser extends RTB_K13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RTB_Z76";
}

/** Parses an HL7 RTB^Z76 (HL7 v2.7) message string into a structured result. */
export function parseRTB_Z76(messageString: string): Result<ParsedRTB_Z76> {
  return new RTB_Z76_Parser().parse(messageString);
}
