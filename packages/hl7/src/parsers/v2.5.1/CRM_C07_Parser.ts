/**
 * Parser for CRM^C07 messages (HL7 v2.5.1).
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
/** Structured result of parsing an HL7 CRM^C07 (HL7 v2.5.1) message. */
export type ParsedCRM_C07 = ParsedCRM_C01;

/** Parser for HL7 CRM^C07 (HL7 v2.5.1) messages. */
export class CRM_C07_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C07";
}

/** Parses an HL7 CRM^C07 (HL7 v2.5.1) message string into a structured result. */
export function parseCRM_C07(messageString: string): Result<ParsedCRM_C07> {
  return new CRM_C07_Parser().parse(messageString);
}
