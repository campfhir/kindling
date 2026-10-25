/**
 * Parser for RGV^O15 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] { GIVE: RXG { TIMING_GIVE: TQ1 [{TQ2}] } {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RGV_O15_STRUCTURE } from "../../structures/v2.5.1/RGV_O15.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { AL1 } from "../../segments/v2.5.1/AL1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { RXO } from "../../segments/v2.5.1/RXO.ts";
import { RXR } from "../../segments/v2.5.1/RXR.ts";
import { RXC } from "../../segments/v2.5.1/RXC.ts";
import { RXE } from "../../segments/v2.5.1/RXE.ts";
import { RXG } from "../../segments/v2.5.1/RXG.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";

/** The ORDER group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The GIVE groups. */
  gives: ParsedGive[];
}

/** The TIMING group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The COMPONENT groups. */
  components?: ParsedComponent[];
}

/** The COMPONENT group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  encodedTimings: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The GIVE group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedGive {
  /** The RXG segment. */
  give: RXG;
  /** The TIMING GIVE groups. */
  giveTimings: ParsedTimingGive[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The TIMING GIVE group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedTimingGive {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RGV^O15 (HL7 v2.5.1) message. */
export interface ParsedRGV_O15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
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

/** The segment parsers of RGV^O15 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 RGV^O15 (HL7 v2.5.1) messages. */
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

/** Parses an HL7 RGV^O15 (HL7 v2.5.1) message string into a structured result. */
export function parseRGV_O15(messageString: string): Result<ParsedRGV_O15> {
  return new RGV_O15_Parser().parse(messageString);
}
