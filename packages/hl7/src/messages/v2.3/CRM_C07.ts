/**
 * Builder, parser and structure for CRM^C07 messages (HL7 v2.3).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01, CRM_C01, type CRM_C01Options, type PatientGroup } from "./CRM_C01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";

export { CRM_C01_STRUCTURE as CRM_C07_STRUCTURE } from "./CRM_C01.ts";

export type { ParsedPatient } from "./CRM_C01.ts";
/** Structured result of parsing an HL7 CRM^C07 (HL7 v2.3) message. */
export type ParsedCRM_C07 = ParsedCRM_C01;

/** Parser for HL7 CRM^C07 (HL7 v2.3) messages. */
export class CRM_C07_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C07";
}

/** Parses an HL7 CRM^C07 (HL7 v2.3) message string into a structured result. */
export function parseCRM_C07(messageString: string): Result<ParsedCRM_C07> {
  return new CRM_C07_Parser().parse(messageString);
}

export type { PatientGroup };
/** The optional segments and groups of an CRM^C07 (HL7 v2.3) message. */
export type CRM_C07Options = CRM_C01Options;

/** Builder for HL7 CRM^C07 (HL7 v2.3) messages. */
export class CRM_C07<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C07";
}

/** Builds an HL7 CRM^C07 (HL7 v2.3) message. */
export function createCRM_C07<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C07Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C07<TMSH> {
  return new CRM_C07(header, patients, options, encoding);
}
