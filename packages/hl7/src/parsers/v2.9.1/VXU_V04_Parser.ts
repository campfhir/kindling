/**
 * Parser for VXU^V04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{NK1}] [{GSP}] [{GSR}] [{ARV}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] [{ARV}] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ PERSON_OBSERVATION: OBX [{PRT}] [{NTE}] }] [{ ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] RXA [{PRT}] [RXR] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VXU_V04_STRUCTURE } from "../../structures/v2.9.1/VXU_V04.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IN3 } from "../../segments/v2.9.1/IN3.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { RXA } from "../../segments/v2.9.1/RXA.ts";
import { RXR } from "../../segments/v2.9.1/RXR.ts";

/** The PATIENT VISIT group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The INSURANCE group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PERSON OBSERVATION group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedPersonObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXA segment. */
  administration: RXA;
  /** The PRT segments. */
  prt2?: PRT[];
  /** The RXR segment. */
  route?: RXR;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 VXU^V04 (HL7 v2.9.1) message. */
export interface ParsedVXU_V04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The ARV segments. */
  arv2?: ARV[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The PERSON OBSERVATION groups. */
  personObservations?: ParsedPersonObservation[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of VXU^V04 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
};

/** Parser for HL7 VXU^V04 (HL7 v2.9.1) messages. */
export class VXU_V04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXU_V04> {
    return parseStructure<ParsedVXU_V04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXU^V04 (HL7 v2.9.1) message string into a structured result. */
export function parseVXU_V04(messageString: string): Result<ParsedVXU_V04> {
  return new VXU_V04_Parser().parse(messageString);
}
