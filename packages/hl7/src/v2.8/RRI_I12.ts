/**
 * Builder, parser and structure for RRI^I12 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] [MSA] [RF1] [ AUTHORIZATION_CONTACT2: AUT [CTD] ] { PROVIDER_CONTACT: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION_CONTACT2: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS_NOTES: OBX [{PRT}] [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { MSA } from "./MSA.ts";
import { RF1 } from "./RF1.ts";
import { AUT } from "./AUT.ts";
import { CTD } from "./CTD.ts";
import { PRD } from "./PRD.ts";
import { PID } from "./PID.ts";
import { ACC } from "./ACC.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { AL1 } from "./AL1.ts";
import { PR1 } from "./PR1.ts";
import { OBR } from "./OBR.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { PRT } from "./PRT.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of RRI^I12 (HL7 v2.8), in order. */
export const RRI_I12_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: false, repeating: false },
  { name: "RF1", required: false, repeating: false },
  {
    name: "AUTHORIZATION_CONTACT2",
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
        name: "AUTHORIZATION_CONTACT2",
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
          { name: "PRT", required: false, repeating: true },
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

/** The AUTHORIZATION CONTACT2 group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedAuthorizationContact21 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER CONTACT group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedProviderContact {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PROCEDURE group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION CONTACT2 group. */
  authorizationContact2?: ParsedAuthorizationContact22;
}

/** The AUTHORIZATION CONTACT2 group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedAuthorizationContact22 {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedObservation {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS NOTES groups. */
  resultsNotes?: ParsedResultsNotes[];
}

/** The RESULTS NOTES group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedResultsNotes {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PATIENT VISIT group of a parsed RRI^I12 (HL7 v2.8) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Structured result of parsing an HL7 RRI^I12 (HL7 v2.8) message. */
export interface ParsedRRI_I12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment?: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION CONTACT2 group. */
  authorizationContact2?: ParsedAuthorizationContact21;
  /** The PROVIDER CONTACT groups. */
  providerContacts: ParsedProviderContact[];
  /** The PID segment. */
  patient: PID;
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

/** The segment parsers of RRI^I12 (HL7 v2.8). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
};

/** Parser for HL7 RRI^I12 (HL7 v2.8) messages. */
export class RRI_I12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRI_I12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRI_I12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRI_I12> {
    return parseStructure<ParsedRRI_I12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRI^I12 (HL7 v2.8) message string into a structured result. */
export function parseRRI_I12(messageString: string): Result<ParsedRRI_I12> {
  return new RRI_I12_Parser().parse(messageString);
}

/** The AUTHORIZATION CONTACT2 group of an RRI^I12 (HL7 v2.8) message being built. */
export interface AuthorizationContact21Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER CONTACT group of an RRI^I12 (HL7 v2.8) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PROCEDURE group of an RRI^I12 (HL7 v2.8) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION CONTACT2 group. */
  authorizationContact2?: AuthorizationContact22Group;
}

/** The AUTHORIZATION CONTACT2 group of an RRI^I12 (HL7 v2.8) message being built. */
export interface AuthorizationContact22Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an RRI^I12 (HL7 v2.8) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS NOTES groups. */
  resultsNotes?: ResultsNotesGroup[];
}

/** The RESULTS NOTES group of an RRI^I12 (HL7 v2.8) message being built. */
export interface ResultsNotesGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PATIENT VISIT group of an RRI^I12 (HL7 v2.8) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an RRI^I12 (HL7 v2.8) message. */
export interface RRI_I12Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment?: MSA;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION CONTACT2 group. */
  authorizationContact2?: AuthorizationContact21Group;
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

/** Builder for HL7 RRI^I12 (HL7 v2.8) messages. */
export class RRI_I12<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRI_I12";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RRI_I12_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providerContacts: ProviderContactGroup[],
    public patient: TPID,
    public options: RRI_I12Options = {},
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

/** Builds an HL7 RRI^I12 (HL7 v2.8) message. */
export function createRRI_I12<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providerContacts: ProviderContactGroup[],
  patient: TPID,
  options: RRI_I12Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I12<TMSH, TPID> {
  return new RRI_I12(header, providerContacts, patient, options, encoding);
}
