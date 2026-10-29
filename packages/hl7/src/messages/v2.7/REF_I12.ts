/**
 * Builder, parser and structure for REF^I12 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION_CONTACT: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { RF1 } from "../../segments/v2.7/RF1.ts";
import { AUT } from "../../segments/v2.7/AUT.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { PRD } from "../../segments/v2.7/PRD.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { GT1 } from "../../segments/v2.7/GT1.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { IN3 } from "../../segments/v2.7/IN3.ts";
import { ACC } from "../../segments/v2.7/ACC.ts";
import { DG1 } from "../../segments/v2.7/DG1.ts";
import { DRG } from "../../segments/v2.7/DRG.ts";
import { AL1 } from "../../segments/v2.7/AL1.ts";
import { PR1 } from "../../segments/v2.7/PR1.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of REF^I12 (HL7 v2.7), in order. */
export const REF_I12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "RF1", required: false, repeating: false },
  {
    name: "AUTHORIZATION_CONTACT",
    required: false,
    repeating: false,
    segments: [
      { name: "AUT", required: true, repeating: false },
      { name: "CTD", required: false, repeating: false },
    ],
  },
  {
    name: "PROVIDER_CONTACT",
    required: true,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  { name: "PID", required: true, repeating: false },
  { name: "NK1", required: false, repeating: true },
  { name: "GT1", required: false, repeating: true },
  {
    name: "INSURANCE",
    required: false,
    repeating: true,
    segments: [
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IN3", required: false, repeating: false },
    ],
  },
  { name: "ACC", required: false, repeating: false },
  { name: "DG1", required: false, repeating: true },
  { name: "DRG", required: false, repeating: true },
  { name: "AL1", required: false, repeating: true },
  {
    name: "PROCEDURE",
    required: false,
    repeating: true,
    segments: [
      { name: "PR1", required: true, repeating: false },
      {
        name: "AUTHORIZATION_CONTACT",
        required: false,
        repeating: false,
        segments: [
          { name: "AUT", required: true, repeating: false },
          { name: "CTD", required: false, repeating: false },
        ],
      },
    ],
  },
  {
    name: "OBSERVATION",
    required: false,
    repeating: true,
    segments: [
      { name: "OBR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "RESULTS_NOTES",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "PATIENT_VISIT",
    required: false,
    repeating: false,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  { name: "NTE", required: false, repeating: true },
];

/** The AUTHORIZATION CONTACT group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedAuthorizationContact1 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER CONTACT group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedProviderContact {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: ParsedAuthorizationContact2;
}

/** The AUTHORIZATION CONTACT group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedAuthorizationContact2 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS NOTES groups. */
  resultsNotes?: ParsedResultsNotes[];
}

/** The RESULTS NOTES group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedResultsNotes {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PATIENT VISIT group of a parsed REF^I12 (HL7 v2.7) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Structured result of parsing an HL7 REF^I12 (HL7 v2.7) message. */
export interface ParsedREF_I12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: ParsedAuthorizationContact1;
  /** The PROVIDER CONTACT groups. */
  providerContacts: ParsedProviderContact[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of REF^I12 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
};

/** Parser for HL7 REF^I12 (HL7 v2.7) messages. */
export class REF_I12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "REF_I12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = REF_I12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedREF_I12> {
    return parseStructure<ParsedREF_I12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 REF^I12 (HL7 v2.7) message string into a structured result. */
export function parseREF_I12(messageString: string): Result<ParsedREF_I12> {
  return new REF_I12_Parser().parse(messageString);
}

/** The AUTHORIZATION CONTACT group of an REF^I12 (HL7 v2.7) message being built. */
export interface AuthorizationContact1Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER CONTACT group of an REF^I12 (HL7 v2.7) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of an REF^I12 (HL7 v2.7) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of an REF^I12 (HL7 v2.7) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: AuthorizationContact2Group;
}

/** The AUTHORIZATION CONTACT group of an REF^I12 (HL7 v2.7) message being built. */
export interface AuthorizationContact2Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an REF^I12 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS NOTES groups. */
  resultsNotes?: ResultsNotesGroup[];
}

/** The RESULTS NOTES group of an REF^I12 (HL7 v2.7) message being built. */
export interface ResultsNotesGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PATIENT VISIT group of an REF^I12 (HL7 v2.7) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an REF^I12 (HL7 v2.7) message. */
export interface REF_I12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION CONTACT group. */
  authorizationContact?: AuthorizationContact1Group;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 REF^I12 (HL7 v2.7) messages. */
export class REF_I12<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "REF_I12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = REF_I12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providerContacts: ProviderContactGroup[],
    public patient: TPID,
    public options: REF_I12Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providerContacts: this.providerContacts, patient: this.patient };
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

/** Builds an HL7 REF^I12 (HL7 v2.7) message. */
export function createREF_I12<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: REF_I12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I12<TMSH, TPID> {
  return new REF_I12(header, providerContacts, patient, options, encoding);
}
