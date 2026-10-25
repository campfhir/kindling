/**
 * Parser for RGV^O15 messages (HL7 v2.4).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] { GIVE: RXG {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RGV_O15_STRUCTURE } from "../../structures/v2.4/RGV_O15.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { AL1 } from "../../segments/v2.4/AL1.ts";
import { PV1 } from "../../segments/v2.4/PV1.ts";
import { PV2 } from "../../segments/v2.4/PV2.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { RXO } from "../../segments/v2.4/RXO.ts";
import { RXR } from "../../segments/v2.4/RXR.ts";
import { RXC } from "../../segments/v2.4/RXC.ts";
import { RXE } from "../../segments/v2.4/RXE.ts";
import { RXG } from "../../segments/v2.4/RXG.ts";
import { OBX } from "../../segments/v2.4/OBX.ts";

/** The ORDER group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The GIVE groups. */
  gives: ParsedGive[];
}

/** The ORDER DETAIL group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The NTE segments. */
  componentNotes?: NTE[];
}

/** The ENCODING group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedGive {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The OBSERVATION group of a parsed RGV^O15 (HL7 v2.4) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RGV^O15 (HL7 v2.4) message. */
export interface ParsedRGV_O15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of RGV^O15 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RGV^O15 (HL7 v2.4) messages. */
export class RGV_O15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RGV_O15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RGV_O15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRGV_O15> {
    return parseStructure<ParsedRGV_O15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RGV^O15 (HL7 v2.4) message string into a structured result. */
export function parseRGV_O15(messageString: string): Result<ParsedRGV_O15> {
  return new RGV_O15_Parser().parse(messageString);
}
