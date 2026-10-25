/**
 * Parser for RDS^O13 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{NTE}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{NTE}] }] [{FT1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RDS_O13_STRUCTURE } from "../../structures/v2.5/RDS_O13.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { AL1 } from "../../segments/v2.5/AL1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { RXO } from "../../segments/v2.5/RXO.ts";
import { RXR } from "../../segments/v2.5/RXR.ts";
import { RXC } from "../../segments/v2.5/RXC.ts";
import { RXE } from "../../segments/v2.5/RXE.ts";
import { RXD } from "../../segments/v2.5/RXD.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { FT1 } from "../../segments/v2.5/FT1.ts";

/** The ORDER group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXD segment. */
  dispense: RXD;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
  /** The FT1 segments. */
  transactions?: FT1[];
}

/** The TIMING group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RDS^O13 (HL7 v2.5) message. */
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

/** The COMPONENT group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  encodedTimings: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RDS^O13 (HL7 v2.5) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RDS^O13 (HL7 v2.5) message. */
export interface ParsedRDS_O13 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
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

/** The segment parsers of RDS^O13 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
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
  RXD: (s, e) => RXD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  FT1: (s, e) => FT1.parse(s, e),
};

/** Parser for HL7 RDS^O13 (HL7 v2.5) messages. */
export class RDS_O13_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDS_O13";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDS_O13_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDS_O13> {
    return parseStructure<ParsedRDS_O13>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDS^O13 (HL7 v2.5) message string into a structured result. */
export function parseRDS_O13(messageString: string): Result<ParsedRDS_O13> {
  return new RDS_O13_Parser().parse(messageString);
}
