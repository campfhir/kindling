import { Result } from "../../types/result.ts";
import {
  MDM_T02_Parser,
  ParsedMDM_T02,
  ParsedMDMOrder,
  ParsedMDMTiming,
  ParsedMDMObservation,
} from "./MDM_T02_Parser.ts";

export type { ParsedMDMOrder, ParsedMDMTiming, ParsedMDMObservation };
/** Structured result of parsing an HL7 MDM^T08 (v2.5.1) message. */
export type ParsedMDM_T08 = ParsedMDM_T02;

/** Parser for HL7 MDM^T08 (v2.5.1) messages. */
export class MDM_T08_Parser extends MDM_T02_Parser {
  protected override readonly messageName: string = "MDM_T08";
}

/** Parses an HL7 MDM^T08 (v2.5.1) message string into a structured result. */
export function parseMDM_T08(messageString: string): Result<ParsedMDM_T08> {
  return new MDM_T08_Parser().parse(messageString);
}
