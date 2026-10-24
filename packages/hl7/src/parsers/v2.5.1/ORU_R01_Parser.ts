/**
 * Parser for ORU^R01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{NTE}] [{NK1}] [ VISIT: PV1 [PV2] ] ] { ORDER_OBSERVATION: [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{OBX}] }] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORU_R01_STRUCTURE } from "../../structures/v2.5.1/ORU_R01.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { NK1 } from "../../segments/v2.5.1/NK1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { CTD } from "../../segments/v2.5.1/CTD.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { FT1 } from "../../segments/v2.5.1/FT1.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { SPM } from "../../segments/v2.5.1/SPM.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The PATIENT RESULT group of a parsed ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedPatientResult {
  /** The PID segment. */
  pid?: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The ORDER OBSERVATION groups. */
  orderObservations: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedOrderObservation {
  /** The ORC segment. */
  orc?: ORC;
  /** The OBR segment. */
  obr: OBR;
  /** The NTE segments. */
  obrNteList?: NTE[];
  /** The TIMING QTY groups. */
  timing?: ParsedTimingQty[];
  /** The CTD segment. */
  ctd?: CTD;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The FT1 segments. */
  ft1List?: FT1[];
  /** The CTI segments. */
  ctiList?: CTI[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The TIMING QTY group of a parsed ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The OBSERVATION group of a parsed ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** The SPECIMEN group of a parsed ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  spm: SPM;
  /** The OBX segments. */
  obxList?: OBX[];
}

/** Structured result of parsing an HL7 ORU^R01 (HL7 v2.5.1) message. */
export interface ParsedORU_R01 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PATIENT RESULT groups. */
  patientResults: ParsedPatientResult[];
  /** The DSC segment. */
  dsc?: DSC;
}

/** The segment parsers of ORU^R01 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORU^R01 (HL7 v2.5.1) messages. */
export class ORU_R01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_R01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_R01> {
    return parseStructure<ParsedORU_R01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^R01 (HL7 v2.5.1) message string into a structured result. */
export function parseORU_R01(messageString: string): Result<ParsedORU_R01> {
  return new ORU_R01_Parser().parse(messageString);
}
