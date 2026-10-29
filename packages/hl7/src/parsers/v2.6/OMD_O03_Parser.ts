/**
 * Parser for OMD^O03 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER_DIET: ORC [{ TIMING_DIET: TQ1 [{TQ2}] }] [ DIET: {ODS} [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] ] } [{ ORDER_TRAY: ORC [{ TIMING_TRAY: TQ1 [{TQ2}] }] {ODT} [{NTE}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OMD_O03_STRUCTURE } from "../../structures/v2.6/OMD_O03.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { IN1 } from "../../segments/v2.6/IN1.ts";
import { IN2 } from "../../segments/v2.6/IN2.ts";
import { IN3 } from "../../segments/v2.6/IN3.ts";
import { GT1 } from "../../segments/v2.6/GT1.ts";
import { AL1 } from "../../segments/v2.6/AL1.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { ODS } from "../../segments/v2.6/ODS.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { ODT } from "../../segments/v2.6/ODT.ts";

/** The PATIENT group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The PATIENT VISIT group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The INSURANCE group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER DIET group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedOrderDiet {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING DIET groups. */
  timingDiets?: ParsedTimingDiet[];
  /** The DIET group. */
  diet?: ParsedDiet;
}

/** The TIMING DIET group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedTimingDiet {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DIET group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedDiet {
  /** The ODS segments. */
  diets: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The OBSERVATION group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedOrderTray {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING TRAY groups. */
  timingTrays?: ParsedTimingTray[];
  /** The ODT segments. */
  dietTrays: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING TRAY group of a parsed OMD^O03 (HL7 v2.6) message. */
export interface ParsedTimingTray {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 OMD^O03 (HL7 v2.6) message. */
export interface ParsedOMD_O03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER DIET groups. */
  orderDiets: ParsedOrderDiet[];
  /** The ORDER TRAY groups. */
  orderTrays?: ParsedOrderTray[];
}

/** The segment parsers of OMD^O03 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 OMD^O03 (HL7 v2.6) messages. */
export class OMD_O03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMD_O03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMD_O03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMD_O03> {
    return parseStructure<ParsedOMD_O03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMD^O03 (HL7 v2.6) message string into a structured result. */
export function parseOMD_O03(messageString: string): Result<ParsedOMD_O03> {
  return new OMD_O03_Parser().parse(messageString);
}
