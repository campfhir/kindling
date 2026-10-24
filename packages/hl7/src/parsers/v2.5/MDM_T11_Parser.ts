// @generated wrapper — copied from the base version so it wraps this version's base module
import { Result } from "../../types/result.ts";
import {
  MDM_T01_Parser,
  ParsedMDM_T01,
} from "./MDM_T01_Parser.ts";

/** Structured result of parsing an HL7 MDM^T11 (v2.3) message. */
export type ParsedMDM_T11 = ParsedMDM_T01;

/** Parser for HL7 MDM^T11 (v2.3) messages. */
export class MDM_T11_Parser extends MDM_T01_Parser {
  protected override readonly messageName: string = "MDM_T11";
}

/** Parses an HL7 MDM^T11 (v2.3) message string into a structured result. */
export function parseMDM_T11(messageString: string): Result<ParsedMDM_T11> {
  return new MDM_T11_Parser().parse(messageString);
}
