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
/** Structured result of parsing an HL7 SRR^S05 (v2.5.1) message. */
export type ParsedSRR_S05 = ParsedSRR_S01;

/** Parser for HL7 SRR^S05 (v2.5.1) messages. */
export class SRR_S05_Parser extends SRR_S01_Parser {
  protected override readonly messageName: string = "SRR_S05";
}

/** Parses an HL7 SRR^S05 (v2.5.1) message string into a structured result. */
export function parseSRR_S05(messageString: string): Result<ParsedSRR_S05> {
  return new SRR_S05_Parser().parse(messageString);
}
