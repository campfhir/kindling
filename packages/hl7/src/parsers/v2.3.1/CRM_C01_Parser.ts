/**
 * Parser for CRM^C01 messages (HL7 v2.3.1).
 *
 * Structure: MSH { PATIENT: PID [PV1] CSR [{CSP}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { CRM_C01_STRUCTURE } from "../../structures/v2.3.1/CRM_C01.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";
import { CSR } from "../../segments/v2.3.1/CSR.ts";
import { CSP } from "../../segments/v2.3.1/CSP.ts";

/** The PATIENT group of a parsed CRM^C01 (HL7 v2.3.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** Structured result of parsing an HL7 CRM^C01 (HL7 v2.3.1) message. */
export interface ParsedCRM_C01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of CRM^C01 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  CSR: (s, e) => CSR.parse(s, e),
  CSP: (s, e) => CSP.parse(s, e),
};

/** Parser for HL7 CRM^C01 (HL7 v2.3.1) messages. */
export class CRM_C01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CRM_C01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CRM_C01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCRM_C01> {
    return parseStructure<ParsedCRM_C01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CRM^C01 (HL7 v2.3.1) message string into a structured result. */
export function parseCRM_C01(messageString: string): Result<ParsedCRM_C01> {
  return new CRM_C01_Parser().parse(messageString);
}
