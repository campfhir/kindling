/**
 * Parser for CRM^C03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01 } from "./CRM_C01_Parser.ts";

export type { ParsedPatient } from "./CRM_C01_Parser.ts";
/** Structured result of parsing an HL7 CRM^C03 (HL7 v2.5.1) message. */
export type ParsedCRM_C03 = ParsedCRM_C01;

/** Parser for HL7 CRM^C03 (HL7 v2.5.1) messages. */
export class CRM_C03_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C03";
}

/** Parses an HL7 CRM^C03 (HL7 v2.5.1) message string into a structured result. */
export function parseCRM_C03(messageString: string): Result<ParsedCRM_C03> {
  return new CRM_C03_Parser().parse(messageString);
}
