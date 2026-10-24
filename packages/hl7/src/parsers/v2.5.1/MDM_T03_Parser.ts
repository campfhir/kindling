import { Result } from "../../types/result.ts";
import {
  MDM_T01_Parser,
  ParsedMDM_T01,
  ParsedMDMOrder,
  ParsedMDMTiming,
} from "./MDM_T01_Parser.ts";

export type { ParsedMDMOrder, ParsedMDMTiming };
/** Structured result of parsing an HL7 MDM^T03 (v2.5.1) message. */
export type ParsedMDM_T03 = ParsedMDM_T01;

/** Parser for HL7 MDM^T03 (v2.5.1) messages. */
export class MDM_T03_Parser extends MDM_T01_Parser {
  protected override readonly messageName: string = "MDM_T03";
}

/** Parses an HL7 MDM^T03 (v2.5.1) message string into a structured result. */
export function parseMDM_T03(messageString: string): Result<ParsedMDM_T03> {
  return new MDM_T03_Parser().parse(messageString);
}
