/**
 * Parser for RDY^Z98 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [{DSP}] [DSC]
 * Shares the RDY^K15 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RDY_K15_Parser, type ParsedRDY_K15 } from "./RDY_K15_Parser.ts";

/** Structured result of parsing an HL7 RDY^Z98 (HL7 v2.7) message. */
export type ParsedRDY_Z98 = ParsedRDY_K15;

/** Parser for HL7 RDY^Z98 (HL7 v2.7) messages. */
export class RDY_Z98_Parser extends RDY_K15_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RDY_Z98";
}

/** Parses an HL7 RDY^Z98 (HL7 v2.7) message string into a structured result. */
export function parseRDY_Z98(messageString: string): Result<ParsedRDY_Z98> {
  return new RDY_Z98_Parser().parse(messageString);
}
