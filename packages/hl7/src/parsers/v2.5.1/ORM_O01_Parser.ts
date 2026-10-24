/**
 * Parser for ORM^O01 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [GT1] [{AL1}] ] { ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [CTD] [{DG1}] [{ OBSERVATION: OBX [{NTE}] }] ] [{FT1}] [{CTI}] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORM_O01_STRUCTURE } from "../../structures/v2.5.1/ORM_O01.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { IN1 } from "../../segments/v2.5.1/IN1.ts";
import { IN2 } from "../../segments/v2.5.1/IN2.ts";
import { IN3 } from "../../segments/v2.5.1/IN3.ts";
import { GT1 } from "../../segments/v2.5.1/GT1.ts";
import { AL1 } from "../../segments/v2.5.1/AL1.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { RQD } from "../../segments/v2.5.1/RQD.ts";
import { RQ1 } from "../../segments/v2.5.1/RQ1.ts";
import { RXO } from "../../segments/v2.5.1/RXO.ts";
import { ODS } from "../../segments/v2.5.1/ODS.ts";
import { ODT } from "../../segments/v2.5.1/ODT.ts";
import { CTD } from "../../segments/v2.5.1/CTD.ts";
import { DG1 } from "../../segments/v2.5.1/DG1.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { FT1 } from "../../segments/v2.5.1/FT1.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { BLG } from "../../segments/v2.5.1/BLG.ts";

/** The PATIENT group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedOrderPatient {
  /** The PID segment. */
  pid: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PATIENT VISIT group. */
  visit?: ParsedVisit;
  /** The INSURANCE groups. */
  insurance?: ParsedInsurance[];
  /** The GT1 segment. */
  gt1?: GT1;
  /** The AL1 segments. */
  al1List?: AL1[];
}

/** The PATIENT VISIT group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  pv1: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
}

/** The INSURANCE group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segments. */
  in3List?: IN3[];
}

/** The ORDER group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  orc: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The FT1 segments. */
  ft1List?: FT1[];
  /** The CTI segments. */
  ctiList?: CTI[];
  /** The BLG segment. */
  blg?: BLG;
}

/** The ORDER DETAIL group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The CTD segment. */
  ctd?: CTD;
  /** The DG1 segments. */
  dg1List?: DG1[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The OBSERVATION group of a parsed ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** Structured result of parsing an HL7 ORM^O01 (HL7 v2.5.1) message. */
export interface ParsedORM_O01 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The NTE segments. */
  nteList?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedOrderPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of ORM^O01 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
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
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 ORM^O01 (HL7 v2.5.1) messages. */
export class ORM_O01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORM_O01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORM_O01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORM_O01> {
    return parseStructure<ParsedORM_O01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORM^O01 (HL7 v2.5.1) message string into a structured result. */
export function parseORM_O01(messageString: string): Result<ParsedORM_O01> {
  return new ORM_O01_Parser().parse(messageString);
}
