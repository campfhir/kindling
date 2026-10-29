/**
 * Parser for RAS^O17 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] ] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] { ADMINISTRATION: {RXA} RXR [{ OBSERVATION: OBX [{NTE}] }] } [{CTI}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RAS_O17_STRUCTURE } from "../../structures/v2.6/RAS_O17.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { AL1 } from "../../segments/v2.6/AL1.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { RXO } from "../../segments/v2.6/RXO.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";
import { RXC } from "../../segments/v2.6/RXC.ts";
import { RXE } from "../../segments/v2.6/RXE.ts";
import { RXA } from "../../segments/v2.6/RXA.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { CTI } from "../../segments/v2.6/CTI.ts";

/** The PATIENT group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The PATIENT VISIT group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The ADMINISTRATION groups. */
  administrations: ParsedAdministration[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The ORDER DETAIL SUPPLEMENT group. */
  orderDetailSupplement?: ParsedOrderDetailSupplement;
}

/** The ORDER DETAIL SUPPLEMENT group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedOrderDetailSupplement {
  /** The NTE segments. */
  notes: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENTS groups. */
  components?: ParsedComponents[];
}

/** The COMPONENTS group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedComponents {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ADMINISTRATION group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedAdministration {
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The OBSERVATION group of a parsed RAS^O17 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RAS^O17 (HL7 v2.6) message. */
export interface ParsedRAS_O17 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The segment parsers of RAS^O17 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
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
  RXA: (s, e) => RXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 RAS^O17 (HL7 v2.6) messages. */
export class RAS_O17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAS_O17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RAS_O17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRAS_O17> {
    return parseStructure<ParsedRAS_O17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RAS^O17 (HL7 v2.6) message string into a structured result. */
export function parseRAS_O17(messageString: string): Result<ParsedRAS_O17> {
  return new RAS_O17_Parser().parse(messageString);
}
