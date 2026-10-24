import { Result } from "../../types/result.ts";
import {
  MDM_T02_Parser,
  ParsedMDM_T02,
} from "./MDM_T02_Parser.ts";

/** Structured result of parsing an HL7 MDM^T04 (v2.3) message. */
export type ParsedMDM_T04 = ParsedMDM_T02;

/** Parser for HL7 MDM^T04 (v2.3) messages. */
export class MDM_T04_Parser extends MDM_T02_Parser {
  protected override readonly messageName: string = "MDM_T04";
}

/** Parses an HL7 MDM^T04 (v2.3) message string into a structured result. */
export function parseMDM_T04(messageString: string): Result<ParsedMDM_T04> {
  return new MDM_T04_Parser().parse(messageString);
}
