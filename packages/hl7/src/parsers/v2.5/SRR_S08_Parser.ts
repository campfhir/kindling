// @generated wrapper — copied from the base version so it wraps this version's base module
import { Result } from "../../types/result.ts";
import {
  SRR_S01_Parser,
  ParsedSRR_S01,
  ParsedSRRSchedule,
  ParsedSRRPatient,
  ParsedSRRResources,
  ParsedSRRService,
  ParsedSRRGeneralResource,
  ParsedSRRLocationResource,
  ParsedSRRPersonnelResource,
} from "./SRR_S01_Parser.ts";

export type { ParsedSRRSchedule, ParsedSRRPatient, ParsedSRRResources, ParsedSRRService, ParsedSRRGeneralResource, ParsedSRRLocationResource, ParsedSRRPersonnelResource };
/** Structured result of parsing an HL7 SRR^S08 (v2.3) message. */
export type ParsedSRR_S08 = ParsedSRR_S01;

/** Parser for HL7 SRR^S08 (v2.3) messages. */
export class SRR_S08_Parser extends SRR_S01_Parser {
  protected override readonly messageName: string = "SRR_S08";
}

/** Parses an HL7 SRR^S08 (v2.3) message string into a structured result. */
export function parseSRR_S08(messageString: string): Result<ParsedSRR_S08> {
  return new SRR_S08_Parser().parse(messageString);
}
