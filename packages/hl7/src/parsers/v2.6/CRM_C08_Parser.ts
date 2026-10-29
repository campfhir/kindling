/**
 * Parser for CRM^C08 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01 } from "./CRM_C01_Parser.ts";

export type { ParsedPatient } from "./CRM_C01_Parser.ts";
/** Structured result of parsing an HL7 CRM^C08 (HL7 v2.6) message. */
export type ParsedCRM_C08 = ParsedCRM_C01;

/** Parser for HL7 CRM^C08 (HL7 v2.6) messages. */
export class CRM_C08_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C08";
}

/** Parses an HL7 CRM^C08 (HL7 v2.6) message string into a structured result. */
export function parseCRM_C08(messageString: string): Result<ParsedCRM_C08> {
  return new CRM_C08_Parser().parse(messageString);
}
