/**
 * Builder, parser and structure for CRM^C01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] { PATIENT: PID [PV1] CSR [{CSP}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { CSR } from "./CSR.ts";
import { CSP } from "./CSP.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of CRM^C01 (HL7 v2.5), in order. */
export const CRM_C01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PV1", required: false, repeating: false },
      { name: "CSR", required: true, repeating: false },
      { name: "CSP", required: false, repeating: true },
    ],
  },
];

/** The PATIENT group of a parsed CRM^C01 (HL7 v2.5) message. */
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

/** Structured result of parsing an HL7 CRM^C01 (HL7 v2.5) message. */
export interface ParsedCRM_C01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of CRM^C01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  CSR: (s, e) => CSR.parse(s, e),
  CSP: (s, e) => CSP.parse(s, e),
};

/** Parser for HL7 CRM^C01 (HL7 v2.5) messages. */
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

/** Parses an HL7 CRM^C01 (HL7 v2.5) message string into a structured result. */
export function parseCRM_C01(messageString: string): Result<ParsedCRM_C01> {
  return new CRM_C01_Parser().parse(messageString);
}

/** The PATIENT group of an CRM^C01 (HL7 v2.5) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The CSP segments. */
  clinicalStudyPhases?: CSP[];
}

/** The optional segments and groups of an CRM^C01 (HL7 v2.5) message. */
export interface CRM_C01Options {
  /** The SFT segments. */
  software?: SFT[];
}

/** Builder for HL7 CRM^C01 (HL7 v2.5) messages. */
export class CRM_C01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CRM_C01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CRM_C01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patients: PatientGroup[],
    public options: CRM_C01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patients: this.patients };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 CRM^C01 (HL7 v2.5) message. */
export function createCRM_C01<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CRM_C01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CRM_C01<TMSH> {
  return new CRM_C01(header, patients, options, encoding);
}
