/**
 * Builder, parser and structure for CRM^C05 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT: PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01, CRM_C01, type CRM_C01Options, type PatientGroup, type PatientVisitGroup } from "./CRM_C01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { CRM_C01_STRUCTURE as CRM_C05_STRUCTURE } from "./CRM_C01.ts";

export type { ParsedPatient, ParsedPatientVisit } from "./CRM_C01.ts";
/** Structured result of parsing an HL7 CRM^C05 (HL7 v2.9.1) message. */
export type ParsedCRM_C05 = ParsedCRM_C01;

/** Parser for HL7 CRM^C05 (HL7 v2.9.1) messages. */
export class CRM_C05_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C05";
}

/** Parses an HL7 CRM^C05 (HL7 v2.9.1) message string into a structured result. */
export function parseCRM_C05(messageString: string): Result<ParsedCRM_C05> {
  return new CRM_C05_Parser().parse(messageString);
}

export type { PatientGroup, PatientVisitGroup };
/** The optional segments and groups of an CRM^C05 (HL7 v2.9.1) message. */
export type CRM_C05Options = CRM_C01Options;

/** Builder for HL7 CRM^C05 (HL7 v2.9.1) messages. */
export class CRM_C05<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C05";
}

/** Builds an HL7 CRM^C05 (HL7 v2.9.1) message. */
export function createCRM_C05<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C05<TMSH> {
  return new CRM_C05(header, patients, options, encoding);
}
