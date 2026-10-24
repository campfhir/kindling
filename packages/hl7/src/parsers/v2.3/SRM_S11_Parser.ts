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
/** Structured result of parsing an HL7 SRM^S11 (v2.3) message. */
export type ParsedSRM_S11 = ParsedSRM_S01;

/** Parser for HL7 SRM^S11 (v2.3) messages. */
export class SRM_S11_Parser extends SRM_S01_Parser {
  protected override readonly messageName: string = "SRM_S11";
}

/** Parses an HL7 SRM^S11 (v2.3) message string into a structured result. */
export function parseSRM_S11(messageString: string): Result<ParsedSRM_S11> {
  return new SRM_S11_Parser().parse(messageString);
}
