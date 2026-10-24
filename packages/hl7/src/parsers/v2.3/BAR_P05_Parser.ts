import { Result } from "../../types/result.ts";
import {
  BAR_P01_Parser,
  ParsedBAR_P01,
  ParsedBARVisit,
  ParsedBARProcedure,
  ParsedBARInsurance,
} from "./BAR_P01_Parser.ts";

export type { ParsedBARVisit, ParsedBARProcedure, ParsedBARInsurance };
/** Structured result of parsing an HL7 BAR^P05 (v2.3) message. */
export type ParsedBAR_P05 = ParsedBAR_P01;

/** Parser for HL7 BAR^P05 (v2.3) messages. */
export class BAR_P05_Parser extends BAR_P01_Parser {
  protected override readonly messageName: string = "BAR_P05";
}

/** Parses an HL7 BAR^P05 (v2.3) message string into a structured result. */
export function parseBAR_P05(messageString: string): Result<ParsedBAR_P05> {
  return new BAR_P05_Parser().parse(messageString);
}
