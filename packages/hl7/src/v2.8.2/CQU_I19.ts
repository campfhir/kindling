/**
 * Builder, parser and structure for CQU^I19 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] RF1 [{ PROVIDER_CONTACT: PRD [{CTD}] }] [{ PATIENT: PID [PD1] }] [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ APPOINTMENT_HISTORY: SCH [{ RESOURCES: RGS [{ RESOURCE_DETAIL: <AIS|AIG|AIL|AIP> [{ RESOURCE_OBSERVATION: OBX [{PRT}] }] }] }] }] [{ CLINICAL_HISTORY: ORC [{ CLINICAL_HISTORY_DETAIL: <OBR|ODS|PR1|RF1|AL1|IAM|ACC|RMI|DB1|DG1|DRG|PDA> [{ CLINICAL_HISTORY_OBSERVATION: OBX [{PRT}] }] }] [{ ROLE_CLINICAL_HISTORY: <ROL|PRD> [{VAR}] }] [{CTI}] }] { PATIENT_VISITS: PV1 [PV2] } [{ MEDICATION_HISTORY: ORC [ MEDICATION_ORDER_DETAIL: RXO {RXR} [{RXC}] [{ MEDICATION_ORDER_OBSERVATION: OBX [{PRT}] }] ] [ MEDICATION_ENCODING_DETAIL: RXE {RXR} [{RXC}] [{ MEDICATION_ENCODING_OBSERVATION: OBX [{PRT}] }] ] [{ MEDICATION_ADMINISTRATION_DETAIL: {RXA} RXR [{ MEDICATION_ADMINISTRATION_OBSERVATION: OBX [{PRT}] }] }] [{CTI}] }] [{ PROBLEM: PRB [{VAR}] [{ ROLE_PROBLEM: <ROL|PRD> [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{PRT}] }] }] [{ GOAL: GOL [{VAR}] [{ ROLE_GOAL: <ROL|PRD> [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{PRT}] }] }] [{ PATHWAY: PTH [{VAR}] [{ ROL_GROUP: <ROL|PRD> [{VAR}] }] [{ PATHWAY_OBSERVATION: OBX [{PRT}] }] }] [{REL}]
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
import { ERR } from "./ERR.ts";
import { RF1 } from "./RF1.ts";
import { PRD } from "./PRD.ts";
import { CTD } from "./CTD.ts";
import { PID } from "./PID.ts";
import { PD1 } from "./PD1.ts";
import { NK1 } from "./NK1.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IN3 } from "./IN3.ts";
import { SCH } from "./SCH.ts";
import { RGS } from "./RGS.ts";
import { AIS } from "./AIS.ts";
import { AIG } from "./AIG.ts";
import { AIL } from "./AIL.ts";
import { AIP } from "./AIP.ts";
import { OBX } from "./OBX.ts";
import { PRT } from "./PRT.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { ODS } from "./ODS.ts";
import { PR1 } from "./PR1.ts";
import { AL1 } from "./AL1.ts";
import { IAM } from "./IAM.ts";
import { ACC } from "./ACC.ts";
import { RMI } from "./RMI.ts";
import { DB1 } from "./DB1.ts";
import { DG1 } from "./DG1.ts";
import { DRG } from "./DRG.ts";
import { PDA } from "./PDA.ts";
import { ROL } from "./ROL.ts";
import { VAR } from "./VAR.ts";
import { CTI } from "./CTI.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { RXO } from "./RXO.ts";
import { RXR } from "./RXR.ts";
import { RXC } from "./RXC.ts";
import { RXE } from "./RXE.ts";
import { RXA } from "./RXA.ts";
import { PRB } from "./PRB.ts";
import { GOL } from "./GOL.ts";
import { PTH } from "./PTH.ts";
import { REL } from "./REL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of CQU^I19 (HL7 v2.8.2), in order. */
export const CQU_I19_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "RF1", required: true, repeating: false },
  {
    name: "PROVIDER_CONTACT",
    required: false,
    repeating: true,
    segments: [
      { name: "PRD", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
    ],
  },
  {
    name: "PATIENT",
    required: false,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      { name: "PD1", required: false, repeating: false },
    ],
  },
  { name: "NK1", required: false, repeating: true },
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
  {
    name: "APPOINTMENT_HISTORY",
    required: false,
    repeating: true,
    segments: [
      { name: "SCH", required: true, repeating: false },
      {
        name: "RESOURCES",
        required: false,
        repeating: true,
        segments: [
          { name: "RGS", required: true, repeating: false },
          {
            name: "RESOURCE_DETAIL",
            required: false,
            repeating: true,
            segments: [
              { oneOf: ["AIS", "AIG", "AIL", "AIP"], required: true },
              {
                name: "RESOURCE_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "PRT", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "CLINICAL_HISTORY",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "CLINICAL_HISTORY_DETAIL",
        required: false,
        repeating: true,
        segments: [
          { oneOf: ["OBR", "ODS", "PR1", "RF1", "AL1", "IAM", "ACC", "RMI", "DB1", "DG1", "DRG", "PDA"], required: true },
          {
            name: "CLINICAL_HISTORY_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "ROLE_CLINICAL_HISTORY",
        required: false,
        repeating: true,
        segments: [
          { oneOf: ["ROL", "PRD"], required: true },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      { name: "CTI", required: false, repeating: true },
    ],
  },
  {
    name: "PATIENT_VISITS",
    required: true,
    repeating: true,
    segments: [
      { name: "PV1", required: true, repeating: false },
      { name: "PV2", required: false, repeating: false },
    ],
  },
  {
    name: "MEDICATION_HISTORY",
    required: false,
    repeating: true,
    segments: [
      { name: "ORC", required: true, repeating: false },
      {
        name: "MEDICATION_ORDER_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "RXO", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
          {
            name: "MEDICATION_ORDER_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "MEDICATION_ENCODING_DETAIL",
        required: false,
        repeating: false,
        segments: [
          { name: "RXE", required: true, repeating: false },
          { name: "RXR", required: true, repeating: true },
          { name: "RXC", required: false, repeating: true },
          {
            name: "MEDICATION_ENCODING_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
        ],
      },
      {
        name: "MEDICATION_ADMINISTRATION_DETAIL",
        required: false,
        repeating: true,
        segments: [
          { name: "RXA", required: true, repeating: true },
          { name: "RXR", required: true, repeating: false },
          {
            name: "MEDICATION_ADMINISTRATION_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "PRT", required: false, repeating: true },
            ],
          },
        ],
      },
      { name: "CTI", required: false, repeating: true },
    ],
  },
  {
    name: "PROBLEM",
    required: false,
    repeating: true,
    segments: [
      { name: "PRB", required: true, repeating: false },
      { name: "VAR", required: false, repeating: true },
      {
        name: "ROLE_PROBLEM",
        required: false,
        repeating: true,
        segments: [
          { oneOf: ["ROL", "PRD"], required: true },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      {
        name: "PROBLEM_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "GOAL",
    required: false,
    repeating: true,
    segments: [
      { name: "GOL", required: true, repeating: false },
      { name: "VAR", required: false, repeating: true },
      {
        name: "ROLE_GOAL",
        required: false,
        repeating: true,
        segments: [
          { oneOf: ["ROL", "PRD"], required: true },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      {
        name: "GOAL_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
    ],
  },
  {
    name: "PATHWAY",
    required: false,
    repeating: true,
    segments: [
      { name: "PTH", required: true, repeating: false },
      { name: "VAR", required: false, repeating: true },
      {
        name: "ROL_GROUP",
        required: false,
        repeating: true,
        segments: [
          { oneOf: ["ROL", "PRD"], required: true },
          { name: "VAR", required: false, repeating: true },
        ],
      },
      {
        name: "PATHWAY_OBSERVATION",
        required: false,
        repeating: true,
        segments: [
          { name: "OBX", required: true, repeating: false },
          { name: "PRT", required: false, repeating: true },
        ],
      },
    ],
  },
  { name: "REL", required: false, repeating: true },
];

/** The PROVIDER CONTACT group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedProviderContact {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PATIENT group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The INSURANCE group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The APPOINTMENT HISTORY group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedAppointmentHistory {
  /** The SCH segment. */
  appointment: SCH;
  /** The RESOURCES groups. */
  resources?: ParsedResources[];
}

/** The RESOURCES group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedResources {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The RESOURCE DETAIL groups. */
  resourceDetails?: ParsedResourceDetail[];
}

/** The RESOURCE DETAIL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedResourceDetail {
  /** One of AIS, AIG, AIL, AIP. */
  segment: AIS | AIG | AIL | AIP;
  /** The RESOURCE OBSERVATION groups. */
  resourceObservations?: ParsedResourceObservation[];
}

/** The RESOURCE OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedResourceObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CLINICAL HISTORY group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedClinicalHistory {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The CLINICAL HISTORY DETAIL groups. */
  clinicalHistoryDetails?: ParsedClinicalHistoryDetail[];
  /** The ROLE CLINICAL HISTORY groups. */
  roleClinicalHistorys?: ParsedRoleClinicalHistory[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CLINICAL HISTORY DETAIL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedClinicalHistoryDetail {
  /** One of OBR, ODS, PR1, RF1, AL1, IAM, ACC, RMI, DB1, DG1, DRG, PDA. */
  segment: OBR | ODS | PR1 | RF1 | AL1 | IAM | ACC | RMI | DB1 | DG1 | DRG | PDA;
  /** The CLINICAL HISTORY OBSERVATION groups. */
  clinicalHistoryObservations?: ParsedClinicalHistoryObservation[];
}

/** The CLINICAL HISTORY OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedClinicalHistoryObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ROLE CLINICAL HISTORY group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedRoleClinicalHistory {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATIENT VISITS group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedPatientVisits {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The MEDICATION HISTORY group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationHistory {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The MEDICATION ORDER DETAIL group. */
  medicationOrderDetail?: ParsedMedicationOrderDetail;
  /** The MEDICATION ENCODING DETAIL group. */
  medicationEncodingDetail?: ParsedMedicationEncodingDetail;
  /** The MEDICATION ADMINISTRATION DETAIL groups. */
  medicationAdministrationDetails?: ParsedMedicationAdministrationDetail[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The MEDICATION ORDER DETAIL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The MEDICATION ORDER OBSERVATION groups. */
  medicationOrderObservations?: ParsedMedicationOrderObservation[];
}

/** The MEDICATION ORDER OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The MEDICATION ENCODING DETAIL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationEncodingDetail {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The MEDICATION ENCODING OBSERVATION groups. */
  medicationEncodingObservations?: ParsedMedicationEncodingObservation[];
}

/** The MEDICATION ENCODING OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationEncodingObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The MEDICATION ADMINISTRATION DETAIL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationAdministrationDetail {
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
  /** The MEDICATION ADMINISTRATION OBSERVATION groups. */
  medicationAdministrationObservations?: ParsedMedicationAdministrationObservation[];
}

/** The MEDICATION ADMINISTRATION OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedMedicationAdministrationObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PROBLEM group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROLE PROBLEM groups. */
  roleProblems?: ParsedRoleProblem[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ParsedProblemObservation[];
}

/** The ROLE PROBLEM group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedRoleProblem {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GOAL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROLE GOAL groups. */
  roleGoals?: ParsedRoleGoal[];
  /** The GOAL OBSERVATION groups. */
  goalObservations?: ParsedGoalObservation[];
}

/** The ROLE GOAL group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedRoleGoal {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATHWAY group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROL GROUP groups. */
  rolGroups?: ParsedRolGroup[];
  /** The PATHWAY OBSERVATION groups. */
  pathwayObservations?: ParsedPathwayObservation[];
}

/** The ROL GROUP group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedRolGroup {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATHWAY OBSERVATION group of a parsed CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedPathwayObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 CQU^I19 (HL7 v2.8.2) message. */
export interface ParsedCQU_I19 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The RF1 segment. */
  referral: RF1;
  /** The PROVIDER CONTACT groups. */
  providerContacts?: ParsedProviderContact[];
  /** The PATIENT groups. */
  patients?: ParsedPatient[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The APPOINTMENT HISTORY groups. */
  appointmentHistorys?: ParsedAppointmentHistory[];
  /** The CLINICAL HISTORY groups. */
  clinicalHistorys?: ParsedClinicalHistory[];
  /** The PATIENT VISITS groups. */
  patientVisits: ParsedPatientVisits[];
  /** The MEDICATION HISTORY groups. */
  medicationHistorys?: ParsedMedicationHistory[];
  /** The PROBLEM groups. */
  problems?: ParsedProblem[];
  /** The GOAL groups. */
  goals?: ParsedGoal[];
  /** The PATHWAY groups. */
  pathways?: ParsedPathway[];
  /** The REL segments. */
  relList?: REL[];
}

/** The segment parsers of CQU^I19 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  RF1: (s, e) => RF1.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  SCH: (s, e) => SCH.parse(s, e),
  RGS: (s, e) => RGS.parse(s, e),
  AIS: (s, e) => AIS.parse(s, e),
  AIG: (s, e) => AIG.parse(s, e),
  AIL: (s, e) => AIL.parse(s, e),
  AIP: (s, e) => AIP.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  IAM: (s, e) => IAM.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  RMI: (s, e) => RMI.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PDA: (s, e) => PDA.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  REL: (s, e) => REL.parse(s, e),
};

/** Parser for HL7 CQU^I19 (HL7 v2.8.2) messages. */
export class CQU_I19_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CQU_I19";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CQU_I19_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCQU_I19> {
    return parseStructure<ParsedCQU_I19>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CQU^I19 (HL7 v2.8.2) message string into a structured result. */
export function parseCQU_I19(messageString: string): Result<ParsedCQU_I19> {
  return new CQU_I19_Parser().parse(messageString);
}

/** The PROVIDER CONTACT group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ProviderContactGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The PATIENT group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
}

/** The INSURANCE group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The APPOINTMENT HISTORY group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface AppointmentHistoryGroup {
  /** The SCH segment. */
  appointment: SCH;
  /** The RESOURCES groups. */
  resources?: ResourcesGroup[];
}

/** The RESOURCES group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ResourcesGroup {
  /** The RGS segment. */
  resourceGroup: RGS;
  /** The RESOURCE DETAIL groups. */
  resourceDetails?: ResourceDetailGroup[];
}

/** The RESOURCE DETAIL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ResourceDetailGroup {
  /** One of AIS, AIG, AIL, AIP. */
  segment: AIS | AIG | AIL | AIP;
  /** The RESOURCE OBSERVATION groups. */
  resourceObservations?: ResourceObservationGroup[];
}

/** The RESOURCE OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ResourceObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The CLINICAL HISTORY group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ClinicalHistoryGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The CLINICAL HISTORY DETAIL groups. */
  clinicalHistoryDetails?: ClinicalHistoryDetailGroup[];
  /** The ROLE CLINICAL HISTORY groups. */
  roleClinicalHistorys?: RoleClinicalHistoryGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The CLINICAL HISTORY DETAIL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ClinicalHistoryDetailGroup {
  /** One of OBR, ODS, PR1, RF1, AL1, IAM, ACC, RMI, DB1, DG1, DRG, PDA. */
  segment: OBR | ODS | PR1 | RF1 | AL1 | IAM | ACC | RMI | DB1 | DG1 | DRG | PDA;
  /** The CLINICAL HISTORY OBSERVATION groups. */
  clinicalHistoryObservations?: ClinicalHistoryObservationGroup[];
}

/** The CLINICAL HISTORY OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ClinicalHistoryObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ROLE CLINICAL HISTORY group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface RoleClinicalHistoryGroup {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATIENT VISITS group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface PatientVisitsGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The MEDICATION HISTORY group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationHistoryGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The MEDICATION ORDER DETAIL group. */
  medicationOrderDetail?: MedicationOrderDetailGroup;
  /** The MEDICATION ENCODING DETAIL group. */
  medicationEncodingDetail?: MedicationEncodingDetailGroup;
  /** The MEDICATION ADMINISTRATION DETAIL groups. */
  medicationAdministrationDetails?: MedicationAdministrationDetailGroup[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The MEDICATION ORDER DETAIL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationOrderDetailGroup {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The MEDICATION ORDER OBSERVATION groups. */
  medicationOrderObservations?: MedicationOrderObservationGroup[];
}

/** The MEDICATION ORDER OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationOrderObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The MEDICATION ENCODING DETAIL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationEncodingDetailGroup {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The MEDICATION ENCODING OBSERVATION groups. */
  medicationEncodingObservations?: MedicationEncodingObservationGroup[];
}

/** The MEDICATION ENCODING OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationEncodingObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The MEDICATION ADMINISTRATION DETAIL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationAdministrationDetailGroup {
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
  /** The MEDICATION ADMINISTRATION OBSERVATION groups. */
  medicationAdministrationObservations?: MedicationAdministrationObservationGroup[];
}

/** The MEDICATION ADMINISTRATION OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface MedicationAdministrationObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PROBLEM group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ProblemGroup {
  /** The PRB segment. */
  problem: PRB;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROLE PROBLEM groups. */
  roleProblems?: RoleProblemGroup[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ProblemObservationGroup[];
}

/** The ROLE PROBLEM group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface RoleProblemGroup {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface ProblemObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GOAL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface GoalGroup {
  /** The GOL segment. */
  goal: GOL;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROLE GOAL groups. */
  roleGoals?: RoleGoalGroup[];
  /** The GOAL OBSERVATION groups. */
  goalObservations?: GoalObservationGroup[];
}

/** The ROLE GOAL group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface RoleGoalGroup {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface GoalObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATHWAY group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface PathwayGroup {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
  /** The ROL GROUP groups. */
  rolGroups?: RolGroup[];
  /** The PATHWAY OBSERVATION groups. */
  pathwayObservations?: PathwayObservationGroup[];
}

/** The ROL GROUP group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface RolGroup {
  /** One of ROL, PRD. */
  segment: ROL | PRD;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATHWAY OBSERVATION group of an CQU^I19 (HL7 v2.8.2) message being built. */
export interface PathwayObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an CQU^I19 (HL7 v2.8.2) message. */
export interface CQU_I19Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The PROVIDER CONTACT groups. */
  providerContacts?: ProviderContactGroup[];
  /** The PATIENT groups. */
  patients?: PatientGroup[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The APPOINTMENT HISTORY groups. */
  appointmentHistorys?: AppointmentHistoryGroup[];
  /** The CLINICAL HISTORY groups. */
  clinicalHistorys?: ClinicalHistoryGroup[];
  /** The MEDICATION HISTORY groups. */
  medicationHistorys?: MedicationHistoryGroup[];
  /** The PROBLEM groups. */
  problems?: ProblemGroup[];
  /** The GOAL groups. */
  goals?: GoalGroup[];
  /** The PATHWAY groups. */
  pathways?: PathwayGroup[];
  /** The REL segments. */
  relList?: REL[];
}

/** Builder for HL7 CQU^I19 (HL7 v2.8.2) messages. */
export class CQU_I19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRF1 extends RF1 = RF1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CQU_I19";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = CQU_I19_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public referral: TRF1,
    public patientVisits: PatientVisitsGroup[],
    public options: CQU_I19Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, referral: this.referral, patientVisits: this.patientVisits };
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

/** Builds an HL7 CQU^I19 (HL7 v2.8.2) message. */
export function createCQU_I19<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TRF1 extends RF1 = RF1>(
  header: TMSH,
  acknowledgment: TMSA,
  referral: TRF1,
  patientVisits: PatientVisitsGroup[],
  options: CQU_I19Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): CQU_I19<TMSH, TMSA, TRF1> {
  return new CQU_I19(header, acknowledgment, referral, patientVisits, options, encoding);
}
