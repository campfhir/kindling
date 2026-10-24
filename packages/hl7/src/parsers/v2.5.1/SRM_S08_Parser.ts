import { Result } from "../../types/result.ts";
import {
  SRM_S01_Parser,
  ParsedSRM_S01,
  ParsedSRMPatient,
  ParsedSRMResources,
  ParsedSRMService,
  ParsedSRMGeneralResource,
  ParsedSRMLocationResource,
  ParsedSRMPersonnelResource,
} from "./SRM_S01_Parser.ts";

export type { ParsedSRMPatient, ParsedSRMResources, ParsedSRMService, ParsedSRMGeneralResource, ParsedSRMLocationResource, ParsedSRMPersonnelResource };
/** Structured result of parsing an HL7 SRM^S08 (v2.5.1) message. */
export type ParsedSRM_S08 = ParsedSRM_S01;

/** Parser for HL7 SRM^S08 (v2.5.1) messages. */
export class SRM_S08_Parser extends SRM_S01_Parser {
  protected override readonly messageName: string = "SRM_S08";
}

/** Parses an HL7 SRM^S08 (v2.5.1) message string into a structured result. */
export function parseSRM_S08(messageString: string): Result<ParsedSRM_S08> {
  return new SRM_S08_Parser().parse(messageString);
}
