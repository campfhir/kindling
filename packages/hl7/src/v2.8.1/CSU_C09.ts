/**
 * Builder, parser and structure for CSU^C09 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [UAC] { PATIENT: PID [PD1] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] CSR { STUDY_PHASE: [CSP] { STUDY_SCHEDULE: [CSS] { STUDY_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] ] OBR [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] OBX [{PRT}] } { STUDY_PHARM: [ COMMON_ORDER: ORC [{PRT}] ] { RX_ADMIN: RXA RXR [{PRT}] } } } } }
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
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { PRT } from "./PRT.ts";
import { ARV } from "./ARV.ts";
import { NTE } from "./NTE.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { CSR } from "./CSR.ts";
import { CSP } from "./CSP.ts";
import { CSS } from "./CSS.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { TQ1 } from "./TQ1.ts";
import { TQ2 } from "./TQ2.ts";
import { OBX } from "./OBX.ts";
import { RXA } from "./RXA.ts";
import { RXR } from "./RXR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of CSU^C09 (HL7 v2.8.1), in order. */
export const CSU_C09_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
      { name: "PRT", required: false, repeating: true },
      { name: "ARV", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
      { name: "CSR", required: true, repeating: false },
      {
        name: "STUDY_PHASE",
        required: true,
        repeating: true,
        segments: [
          { name: "CSP", required: false, repeating: false },
          {
            name: "STUDY_SCHEDULE",
            required: true,
            repeating: true,
            segments: [
              { name: "CSS", required: false, repeating: false },
              {
                name: "STUDY_OBSERVATION",
                required: true,
                repeating: true,
                segments: [
                  {
                    name: "COMMON_ORDER",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "ORC", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  { name: "OBR", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                  {
                    name: "TIMING_QTY",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "TQ1", required: true, repeating: false },
                      { name: "TQ2", required: false, repeating: true },
                    ],
                  },
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true, as: "prt2" },
                ],
              },
              {
                name: "STUDY_PHARM",
                required: true,
                repeating: true,
                segments: [
                  {
                    name: "COMMON_ORDER",
                    required: false,
                    repeating: false,
                    segments: [
                      { name: "ORC", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "RX_ADMIN",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "RXA", required: true, repeating: false },
                      { name: "RXR", required: true, repeating: false },
                      { name: "PRT", required: false, repeating: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The STUDY PHASE groups. */
  studyPhases: ParsedStudyPhase[];
}

/** The VISIT group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY PHASE group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedStudyPhase {
  /** The CSP segment. */
  clinicalStudyPhase?: CSP;
  /** The STUDY SCHEDULE groups. */
  studySchedules: ParsedStudySchedule[];
}

/** The STUDY SCHEDULE group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedStudySchedule {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: ParsedStudyObservation[];
  /** The STUDY PHARM groups. */
  studyPharms: ParsedStudyPharm[];
}

/** The STUDY OBSERVATION group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedStudyObservation {
  /** The COMMON ORDER group. */
  commonOrder?: ParsedCommonOrder1;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prt2?: PRT[];
}

/** The COMMON ORDER group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedCommonOrder1 {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The STUDY PHARM group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedStudyPharm {
  /** The COMMON ORDER group. */
  commonOrder?: ParsedCommonOrder2;
  /** The RX ADMIN groups. */
  rxAdmins: ParsedRxAdmin[];
}

/** The COMMON ORDER group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedCommonOrder2 {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RX ADMIN group of a parsed CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedRxAdmin {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 CSU^C09 (HL7 v2.8.1) message. */
export interface ParsedCSU_C09 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of CSU^C09 (HL7 v2.8.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  CSR: (s, e) => CSR.parse(s, e),
  CSP: (s, e) => CSP.parse(s, e),
  CSS: (s, e) => CSS.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
};

/** Parser for HL7 CSU^C09 (HL7 v2.8.1) messages. */
export class CSU_C09_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CSU_C09";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CSU_C09_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCSU_C09> {
    return parseStructure<ParsedCSU_C09>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CSU^C09 (HL7 v2.8.1) message string into a structured result. */
export function parseCSU_C09(messageString: string): Result<ParsedCSU_C09> {
  return new CSU_C09_Parser().parse(messageString);
}

/** The PATIENT group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The CSR segment. */
  studyRegistration: CSR;
  /** The STUDY PHASE groups. */
  studyPhases: StudyPhaseGroup[];
}

/** The VISIT group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The STUDY PHASE group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface StudyPhaseGroup {
  /** The CSP segment. */
  clinicalStudyPhase?: CSP;
  /** The STUDY SCHEDULE groups. */
  studySchedules: StudyScheduleGroup[];
}

/** The STUDY SCHEDULE group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface StudyScheduleGroup {
  /** The CSS segment. */
  clinicalStudySchedule?: CSS;
  /** The STUDY OBSERVATION groups. */
  studyObservations: StudyObservationGroup[];
  /** The STUDY PHARM groups. */
  studyPharms: StudyPharmGroup[];
}

/** The STUDY OBSERVATION group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface StudyObservationGroup {
  /** The COMMON ORDER group. */
  commonOrder?: CommonOrder1Group;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: TimingQtyGroup[];
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prt2?: PRT[];
}

/** The COMMON ORDER group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface CommonOrder1Group {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface TimingQtyGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The STUDY PHARM group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface StudyPharmGroup {
  /** The COMMON ORDER group. */
  commonOrder?: CommonOrder2Group;
  /** The RX ADMIN groups. */
  rxAdmins: RxAdminGroup[];
}

/** The COMMON ORDER group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface CommonOrder2Group {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The RX ADMIN group of an CSU^C09 (HL7 v2.8.1) message being built. */
export interface RxAdminGroup {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route: RXR;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an CSU^C09 (HL7 v2.8.1) message. */
export interface CSU_C09Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
}

/** Builder for HL7 CSU^C09 (HL7 v2.8.1) messages. */
export class CSU_C09<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CSU_C09";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CSU_C09_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patients: PatientGroup[],
    public options: CSU_C09Options = {},
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

/** Builds an HL7 CSU^C09 (HL7 v2.8.1) message. */
export function createCSU_C09<TMSH extends MSH = MSH>(
  header: TMSH,
  patients: PatientGroup[],
  options: CSU_C09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CSU_C09<TMSH> {
  return new CSU_C09(header, patients, options, encoding);
}
