/**
 * Parser for RSP^K24 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [ QUERY_RESPONSE: PID ] [DSC]
 * Shares the RSP^K23 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RSP_K23_Parser, type ParsedRSP_K23 } from "./RSP_K23_Parser.ts";

export type { ParsedQueryResponse } from "./RSP_K23_Parser.ts";
/** Structured result of parsing an HL7 RSP^K24 (HL7 v2.9.1) message. */
export type ParsedRSP_K24 = ParsedRSP_K23;

/** Parser for HL7 RSP^K24 (HL7 v2.9.1) messages. */
export class RSP_K24_Parser extends RSP_K23_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RSP_K24";
}

/** Parses an HL7 RSP^K24 (HL7 v2.9.1) message string into a structured result. */
export function parseRSP_K24(messageString: string): Result<ParsedRSP_K24> {
  return new RSP_K24_Parser().parse(messageString);
}
