/**
 * Builder, parser and structure for CRM^C06 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] { PATIENT: PID [PV1] CSR [{CSP}] }
 * Shares the CRM^C01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { CRM_C01_Parser, type ParsedCRM_C01, CRM_C01, type CRM_C01Options, type PatientGroup } from "./CRM_C01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { CRM_C01_STRUCTURE as CRM_C06_STRUCTURE } from "./CRM_C01.ts";

export type { ParsedPatient } from "./CRM_C01.ts";
/** Structured result of parsing an HL7 CRM^C06 (HL7 v2.5) message. */
export type ParsedCRM_C06 = ParsedCRM_C01;

/** Parser for HL7 CRM^C06 (HL7 v2.5) messages. */
export class CRM_C06_Parser extends CRM_C01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C06";
}

/** Parses an HL7 CRM^C06 (HL7 v2.5) message string into a structured result. */
export function parseCRM_C06(messageString: string): Result<ParsedCRM_C06> {
  return new CRM_C06_Parser().parse(messageString);
}

export type { PatientGroup };
/** The optional segments and groups of an CRM^C06 (HL7 v2.5) message. */
export type CRM_C06Options = CRM_C01Options;

/** Builder for HL7 CRM^C06 (HL7 v2.5) messages. */
export class CRM_C06<TMSH extends MSH = MSH> extends CRM_C01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "CRM_C06";
}

/** Builds an HL7 CRM^C06 (HL7 v2.5) message. */
export function createCRM_C06<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C06<TMSH> {
  return new CRM_C06(header, patients, options, encoding);
}
