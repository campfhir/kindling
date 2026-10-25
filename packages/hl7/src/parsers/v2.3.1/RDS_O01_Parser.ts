/**
 * Parser for RDS^O01 messages (HL7 v2.3.1).
 *
 * Structure: MSH [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [ COMPONENT: {RXC} [{NTE}] ] ] ] [ ENCODING: RXE {RXR} [{RXC}] ] RXD {RXR} [{RXC}] { OBSERVATION: OBX [{NTE}] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RDS_O01_STRUCTURE } from "../../structures/v2.3.1/RDS_O01.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { PD1 } from "../../segments/v2.3.1/PD1.ts";
import { AL1 } from "../../segments/v2.3.1/AL1.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";
import { PV2 } from "../../segments/v2.3.1/PV2.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { RXO } from "../../segments/v2.3.1/RXO.ts";
import { RXR } from "../../segments/v2.3.1/RXR.ts";
import { RXC } from "../../segments/v2.3.1/RXC.ts";
import { RXE } from "../../segments/v2.3.1/RXE.ts";
import { RXD } from "../../segments/v2.3.1/RXD.ts";
import { OBX } from "../../segments/v2.3.1/OBX.ts";

/** The ORDER group of a parsed RDS^O01 (HL7 v2.3.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The ORDER DETAIL group of a parsed RDS^O01 (HL7 v2.3.1) message. */
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

/** The ENCODING group of a parsed RDS^O01 (HL7 v2.3.1) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The OBSERVATION group of a parsed RDS^O01 (HL7 v2.3.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RDS^O01 (HL7 v2.3.1) message. */
export interface ParsedRDS_O01 extends ParsedMessageBase {
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
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of RDS^O01 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RDS^O01 (HL7 v2.3.1) messages. */
export class RDS_O01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDS_O01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDS_O01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDS_O01> {
    return parseStructure<ParsedRDS_O01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDS^O01 (HL7 v2.3.1) message string into a structured result. */
export function parseRDS_O01(messageString: string): Result<ParsedRDS_O01> {
  return new RDS_O01_Parser().parse(messageString);
}
