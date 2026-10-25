/**
 * Parser for CRM^C04 messages (HL7 v2.3.1).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01 } from "./CRM_C01_Parser.ts";

export type { ParsedPatient } from "./CRM_C01_Parser.ts";
/** Structured result of parsing an HL7 CRM^C04 (HL7 v2.3.1) message. */
export type ParsedCRM_C04 = ParsedCRM_C01;

/** Parser for HL7 CRM^C04 (HL7 v2.3.1) messages. */
export class CRM_C04_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C04";
}

/** Parses an HL7 CRM^C04 (HL7 v2.3.1) message string into a structured result. */
export function parseCRM_C04(messageString: string): Result<ParsedCRM_C04> {
  return new CRM_C04_Parser().parse(messageString);
}
