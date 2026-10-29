/**
 * Parser for ORU^R30 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] PID [PD1] [{PRT}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] ORC OBR [{NTE}] [{PRT}] [{ TIMING_QTY: TQ1 [{TQ2}] }] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORU_R30_STRUCTURE } from "../../structures/v2.7/ORU_R30.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";

/** The PATIENT OBSERVATION group of a parsed ORU^R30 (HL7 v2.7) message. */
export interface ParsedPatientObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The VISIT group of a parsed ORU^R30 (HL7 v2.7) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The TIMING QTY group of a parsed ORU^R30 (HL7 v2.7) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed ORU^R30 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORU^R30 (HL7 v2.7) message. */
export interface ParsedORU_R30 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The PATIENT OBSERVATION groups. */
  patientObservations?: ParsedPatientObservation[];
  /** The VISIT group. */
  visit?: ParsedVisit;
  /** The ORC segment. */
  commonOrder: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The TIMING QTY groups. */
  timingQtys?: ParsedTimingQty[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The segment parsers of ORU^R30 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
};

/** Parser for HL7 ORU^R30 (HL7 v2.7) messages. */
export class ORU_R30_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORU_R30";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORU_R30_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORU_R30> {
    return parseStructure<ParsedORU_R30>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORU^R30 (HL7 v2.7) message string into a structured result. */
export function parseORU_R30(messageString: string): Result<ParsedORU_R30> {
  return new ORU_R30_Parser().parse(messageString);
}
