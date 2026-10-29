/**
 * Parser for RDS^O13 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [ ADDITIONAL_DEMOGRAPHICS: PD1 [{PRT}] ] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] [{PRT}] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [ ORDER_DETAIL_SUPPLEMENT: {NTE} {RXR} [{ COMPONENT: RXC [{NTE}] }] ] ] [{PRT}] [ ENCODING: RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD [{PRT}] [{NTE}] {RXR} [{RXC}] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RDS_O13_STRUCTURE } from "../../structures/v2.7/RDS_O13.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { PRT } from "../../segments/v2.7/PRT.ts";
import { AL1 } from "../../segments/v2.7/AL1.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { PV2 } from "../../segments/v2.7/PV2.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { RXO } from "../../segments/v2.7/RXO.ts";
import { RXR } from "../../segments/v2.7/RXR.ts";
import { RXC } from "../../segments/v2.7/RXC.ts";
import { RXE } from "../../segments/v2.7/RXE.ts";
import { RXD } from "../../segments/v2.7/RXD.ts";
import { OBX } from "../../segments/v2.7/OBX.ts";
import { FT1 } from "../../segments/v2.7/FT1.ts";

/** The PATIENT group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ADDITIONAL DEMOGRAPHICS group. */
  additionalDemographics?: ParsedAdditionalDemographics;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
}

/** The ADDITIONAL DEMOGRAPHICS group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedAdditionalDemographics {
  /** The PD1 segment. */
  patientDemographics: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PATIENT VISIT group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXD segment. */
  dispense: RXD;
  /** The PRT segments. */
  prt2?: PRT[];
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

/** The TIMING group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The ORDER DETAIL SUPPLEMENT group. */
  orderDetailSupplement?: ParsedOrderDetailSupplement;
}

/** The ORDER DETAIL SUPPLEMENT group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedOrderDetailSupplement {
  /** The NTE segments. */
  notes: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ParsedComponent[];
}

/** The COMPONENT group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  timingEncodeds: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RDS^O13 (HL7 v2.7) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RDS^O13 (HL7 v2.7) message. */
export interface ParsedRDS_O13 extends ParsedMessageBase {
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

/** The segment parsers of RDS^O13 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
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

/** Parser for HL7 RDS^O13 (HL7 v2.7) messages. */
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

/** Parses an HL7 RDS^O13 (HL7 v2.7) message string into a structured result. */
export function parseRDS_O13(messageString: string): Result<ParsedRDS_O13> {
  return new RDS_O13_Parser().parse(messageString);
}
