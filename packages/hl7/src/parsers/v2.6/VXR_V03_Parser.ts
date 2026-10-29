/**
 * Parser for VXR^V03 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{SFT}] [UAC] QRD [QRF] PID [PD1] [{NK1}] [ PATIENT_VISIT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VXR_V03_STRUCTURE } from "../../structures/v2.6/VXR_V03.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { NK1 } from "../../segments/v2.6/NK1.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { GT1 } from "../../segments/v2.6/GT1.ts";
import { IN1 } from "../../segments/v2.6/IN1.ts";
import { IN2 } from "../../segments/v2.6/IN2.ts";
import { IN3 } from "../../segments/v2.6/IN3.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { RXA } from "../../segments/v2.6/RXA.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";

/** The PATIENT VISIT group of a parsed VXR^V03 (HL7 v2.6) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of a parsed VXR^V03 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed VXR^V03 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segment. */
  route?: RXR;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING group of a parsed VXR^V03 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed VXR^V03 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 VXR^V03 (HL7 v2.6) message. */
export interface ParsedVXR_V03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of VXR^V03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 VXR^V03 (HL7 v2.6) messages. */
export class VXR_V03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXR_V03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXR_V03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXR_V03> {
    return parseStructure<ParsedVXR_V03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXR^V03 (HL7 v2.6) message string into a structured result. */
export function parseVXR_V03(messageString: string): Result<ParsedVXR_V03> {
  return new VXR_V03_Parser().parse(messageString);
}
