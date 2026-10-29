/**
 * Parser for OPU^R25 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [NTE] PV1 [PV2] [{OBX}] [{NTE}] {ROL} { ACCESSION_DETAIL: {NK1} [ PATIENT: PID [PD1] [{ PATIENT_OBSERVATION: OBX [{NTE}] }] ] { SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{NTE}] }] [{ CONTAINER: SAC [INV] }] { ORDER: OBR [ORC] [{NTE}] [{ROL}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { RESULT: OBX [{NTE}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OPU_R25_STRUCTURE } from "../../structures/v2.6/OPU_R25.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { NK1 } from "../../segments/v2.6/NK1.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { SPM } from "../../segments/v2.6/SPM.ts";
import { SAC } from "../../segments/v2.6/SAC.ts";
import { INV } from "../../segments/v2.6/INV.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";

/** The ACCESSION DETAIL group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedAccessionDetail {
  /** The NK1 segments. */
  nextOfKin: NK1[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
}

/** The PATIENT group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: ParsedPatientObservation[];
}

/** The PATIENT OBSERVATION group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The SPECIMEN group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The SPECIMEN OBSERVATION groups. */
  specimenObservations?: ParsedSpecimenObservation[];
  /** The CONTAINER groups. */
  containers?: ParsedContainer[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The SPECIMEN OBSERVATION group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedSpecimenObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The CONTAINER group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
}

/** The ORDER group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The RESULT groups. */
  results: ParsedResult[];
}

/** The TIMING QTY group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of a parsed OPU^R25 (HL7 v2.6) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OPU^R25 (HL7 v2.6) message. */
export interface ParsedOPU_R25 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segment. */
  note?: NTE;
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The OBX segments. */
  observations?: OBX[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles: ROL[];
  /** The ACCESSION DETAIL groups. */
  accessionDetails: ParsedAccessionDetail[];
}

/** The segment parsers of OPU^R25 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
};

/** Parser for HL7 OPU^R25 (HL7 v2.6) messages. */
export class OPU_R25_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OPU_R25";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OPU_R25_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOPU_R25> {
    return parseStructure<ParsedOPU_R25>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OPU^R25 (HL7 v2.6) message string into a structured result. */
export function parseOPU_R25(messageString: string): Result<ParsedOPU_R25> {
  return new OPU_R25_Parser().parse(messageString);
}
