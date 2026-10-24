// @generated wrapper — copied from the base version so it wraps this version's base module
import { Result } from "../../types/result.ts";
import {
  MDM_T02_Parser,
  ParsedMDM_T02,
} from "./MDM_T02_Parser.ts";

/** Structured result of parsing an HL7 MDM^T08 (v2.3) message. */
export type ParsedMDM_T08 = ParsedMDM_T02;

/** Parser for HL7 MDM^T08 (v2.3) messages. */
export class MDM_T08_Parser extends MDM_T02_Parser {
  protected override readonly messageName: string = "MDM_T08";
}

/** Parses an HL7 MDM^T08 (v2.3) message string into a structured result. */
export function parseMDM_T08(messageString: string): Result<ParsedMDM_T08> {
  return new MDM_T08_Parser().parse(messageString);
}
