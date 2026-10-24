import { Result } from "../../types/result.ts";
import {
  SIU_S12_Parser,
  ParsedSIU_S12,
  ParsedSIUPatient,
  ParsedSIUResources,
  ParsedSIUService,
  ParsedSIUGeneralResource,
  ParsedSIULocationResource,
  ParsedSIUPersonnelResource,
} from "./SIU_S12_Parser.ts";

export type { ParsedSIUPatient, ParsedSIUResources, ParsedSIUService, ParsedSIUGeneralResource, ParsedSIULocationResource, ParsedSIUPersonnelResource };
/** Structured result of parsing an HL7 SIU^S19 (v2.5.1) message. */
export type ParsedSIU_S19 = ParsedSIU_S12;

/** Parser for HL7 SIU^S19 (v2.5.1) messages. */
export class SIU_S19_Parser extends SIU_S12_Parser {
  protected override readonly messageName: string = "SIU_S19";
}

/** Parses an HL7 SIU^S19 (v2.5.1) message string into a structured result. */
export function parseSIU_S19(messageString: string): Result<ParsedSIU_S19> {
  return new SIU_S19_Parser().parse(messageString);
}
