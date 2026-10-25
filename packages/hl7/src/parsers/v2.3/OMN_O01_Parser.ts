/**
 * Parser for OMN^O01 messages (HL7 v2.3).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [ PATIENT_VISIT: PV1 [PV2] ] [{ INSURANCE: IN1 [IN2] [IN3] }] [GT1] [{AL1}] ] { ORDER: ORC [ ORDER_DETAIL: RQD [RQ1] [{NTE}] [{ OBSERVATION: OBX [{NTE}] }] ] [BLG] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OMN_O01_STRUCTURE } from "../../structures/v2.3/OMN_O01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { AL1 } from "../../segments/v2.3/AL1.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { RQD } from "../../segments/v2.3/RQD.ts";
import { RQ1 } from "../../segments/v2.3/RQ1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { BLG } from "../../segments/v2.3/BLG.ts";

/** The INSURANCE group of a parsed OMN^O01 (HL7 v2.3) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The ORDER group of a parsed OMN^O01 (HL7 v2.3) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RQD segment. */
  requisition?: RQD;
  /** The RQ1 segment. */
  requisitionSupplier?: RQ1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The BLG segment. */
  billing?: BLG;
}

/** The OBSERVATION group of a parsed OMN^O01 (HL7 v2.3) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 OMN^O01 (HL7 v2.3) message. */
export interface ParsedOMN_O01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The GT1 segment. */
  guarantor?: GT1;
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of OMN^O01 (HL7 v2.3). */
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
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  BLG: (s, e) => BLG.parse(s, e),
};

/** Parser for HL7 OMN^O01 (HL7 v2.3) messages. */
export class OMN_O01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OMN_O01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OMN_O01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOMN_O01> {
    return parseStructure<ParsedOMN_O01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OMN^O01 (HL7 v2.3) message string into a structured result. */
export function parseOMN_O01(messageString: string): Result<ParsedOMN_O01> {
  return new OMN_O01_Parser().parse(messageString);
}
