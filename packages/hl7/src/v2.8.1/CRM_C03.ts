/**
 * Builder, parser and structure for CRM^C03 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [{PRT}] [{ARV}] [ PATIENT_VISIT: PV1 [{PRT}] ] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { CRM_C01_Parser, type ParsedCRM_C01, CRM_C01, type CRM_C01Options, type PatientGroup, type PatientVisitGroup } from "./CRM_C01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { CRM_C01_STRUCTURE as CRM_C03_STRUCTURE } from "./CRM_C01.ts";

export type { ParsedPatient, ParsedPatientVisit } from "./CRM_C01.ts";
/** Structured result of parsing an HL7 CRM^C03 (HL7 v2.8.1) message. */
export type ParsedCRM_C03 = ParsedCRM_C01;

/**
 * An HL7 CRM^C03 (HL7 v2.8.1) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedCRM_C03>(message, "2.8.1", "CRM_C03")` of `@campfhir/hl7/parse`.
 */
export type DispatchedCRM_C03 = ParsedHL7MessageOf<"2.8.1", "CRM_C03", ParsedCRM_C03>;

/** Parser for HL7 CRM^C03 (HL7 v2.8.1) messages. */
export class CRM_C03_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C03";
}

/** Parses an HL7 CRM^C03 (HL7 v2.8.1) message string into a structured result. */
export function parseCRM_C03(messageString: string): Result<ParsedCRM_C03> {
  return new CRM_C03_Parser().parse(messageString);
}

export type { PatientGroup, PatientVisitGroup };
/** The optional segments and groups of an CRM^C03 (HL7 v2.8.1) message. */
export type CRM_C03Options = CRM_C01Options;

/** Builder for HL7 CRM^C03 (HL7 v2.8.1) messages. */
export class CRM_C03<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C03";
}

/** Builds an HL7 CRM^C03 (HL7 v2.8.1) message. */
export function createCRM_C03<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C03<TMSH> {
  return new CRM_C03(header, patients, options, encoding);
}
