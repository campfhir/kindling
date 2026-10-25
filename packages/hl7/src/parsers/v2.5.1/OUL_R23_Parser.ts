/**
 * Parser for OUL^R23 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [NTE] [ PATIENT: PID [PD1] [{NTE}] ] [ VISIT: PV1 [PV2] ] { SPECIMEN: SPM [{OBX}] { CONTAINER: SAC [INV] { ORDER: OBR [ORC] [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [{ RESULT: OBX [TCD] [{SID}] [{NTE}] }] [{CTI}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OUL_R23_STRUCTURE } from "../../structures/v2.5.1/OUL_R23.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { SPM } from "../../segments/v2.5.1/SPM.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { SAC } from "../../segments/v2.5.1/SAC.ts";
import { INV } from "../../segments/v2.5.1/INV.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { TCD } from "../../segments/v2.5.1/TCD.ts";
import { SID } from "../../segments/v2.5.1/SID.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The PATIENT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The SPECIMEN group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
  /** The CONTAINER groups. */
  containers: ParsedContainer[];
}

/** The CONTAINER group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The INV segment. */
  inventoryDetail?: INV;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The RESULT groups. */
  results?: ParsedResult[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The RESULT group of a parsed OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedResult {
  /** The OBX segment. */
  observation: OBX;
  /** The TCD segment. */
  testCodeDetail?: TCD;
  /** The SID segments. */
  substanceIdentifiers?: SID[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OUL^R23 (HL7 v2.5.1) message. */
export interface ParsedOUL_R23 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segment. */
  note?: NTE;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The SPECIMEN groups. */
  specimens: ParsedSpecimen[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OUL^R23 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  INV: (s, e) => INV.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  TCD: (s, e) => TCD.parse(s, e),
  SID: (s, e) => SID.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OUL^R23 (HL7 v2.5.1) messages. */
export class OUL_R23_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OUL_R23";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OUL_R23_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOUL_R23> {
    return parseStructure<ParsedOUL_R23>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OUL^R23 (HL7 v2.5.1) message string into a structured result. */
export function parseOUL_R23(messageString: string): Result<ParsedOUL_R23> {
  return new OUL_R23_Parser().parse(messageString);
}
