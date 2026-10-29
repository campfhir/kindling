/**
 * Parser for CRM^C06 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01 } from "./CRM_C01_Parser.ts";

export type { ParsedPatient, ParsedPatientVisit } from "./CRM_C01_Parser.ts";
/** Structured result of parsing an HL7 CRM^C06 (HL7 v2.7) message. */
export type ParsedCRM_C06 = ParsedCRM_C01;

/** Parser for HL7 CRM^C06 (HL7 v2.7) messages. */
export class CRM_C06_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C06";
}

/** Parses an HL7 CRM^C06 (HL7 v2.7) message string into a structured result. */
export function parseCRM_C06(messageString: string): Result<ParsedCRM_C06> {
  return new CRM_C06_Parser().parse(messageString);
}
