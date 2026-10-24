// @generated wrapper — copied from the base version so it wraps this version's base module
import { Result } from "../../types/result.ts";
import {
  MDM_T01_Parser,
  ParsedMDM_T01,
} from "./MDM_T01_Parser.ts";

/** Structured result of parsing an HL7 MDM^T05 (v2.3) message. */
export type ParsedMDM_T05 = ParsedMDM_T01;

/** Parser for HL7 MDM^T05 (v2.3) messages. */
export class MDM_T05_Parser extends MDM_T01_Parser {
  protected override readonly messageName: string = "MDM_T05";
}

/** Parses an HL7 MDM^T05 (v2.3) message string into a structured result. */
export function parseMDM_T05(messageString: string): Result<ParsedMDM_T05> {
  return new MDM_T05_Parser().parse(messageString);
}
