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
/** Structured result of parsing an HL7 SIU^S23 (v2.3) message. */
export type ParsedSIU_S23 = ParsedSIU_S12;

/** Parser for HL7 SIU^S23 (v2.3) messages. */
export class SIU_S23_Parser extends SIU_S12_Parser {
  protected override readonly messageName: string = "SIU_S23";
}

/** Parses an HL7 SIU^S23 (v2.3) message string into a structured result. */
export function parseSIU_S23(messageString: string): Result<ParsedSIU_S23> {
  return new SIU_S23_Parser().parse(messageString);
}
