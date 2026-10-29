/**
 * Parser for RSP^Z86 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD { QUERY_RESPONSE: [ PATIENT: PID [PD1] [{NTE}] [{AL1}] ] { COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO {RXR} [{RXC}] ] [ ENCODED_ORDER: RXE [{ TIMING_ENCODED: TQ1 [{TQ2}] }] {RXR} [{RXC}] ] [ DISPENSE: RXD {RXR} [{RXC}] ] [ GIVE: RXG {RXR} [{RXC}] ] [ ADMINISTRATION: RXA {RXR} [{RXC}] ] { OBSERVATION: [OBX] [{NTE}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_Z86_STRUCTURE } from "../../structures/v2.6/RSP_Z86.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { AL1 } from "../../segments/v2.6/AL1.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { RXO } from "../../segments/v2.6/RXO.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";
import { RXC } from "../../segments/v2.6/RXC.ts";
import { RXE } from "../../segments/v2.6/RXE.ts";
import { RXD } from "../../segments/v2.6/RXD.ts";
import { RXG } from "../../segments/v2.6/RXG.ts";
import { RXA } from "../../segments/v2.6/RXA.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The QUERY RESPONSE group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedQueryResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The COMMON ORDER groups. */
  commonOrders: ParsedCommonOrder[];
}

/** The PATIENT group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
}

/** The COMMON ORDER group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
  /** The ENCODED ORDER group. */
  encodedOrder?: ParsedEncodedOrder;
  /** The DISPENSE group. */
  dispense?: ParsedDispense;
  /** The GIVE group. */
  give?: ParsedGive;
  /** The ADMINISTRATION group. */
  administration?: ParsedAdministration;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
}

/** The TIMING group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ENCODED ORDER group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedEncodedOrder {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds?: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DISPENSE group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedDispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The GIVE group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedGive {
  /** The RXG segment. */
  give: RXG;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ADMINISTRATION group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedAdministration {
  /** The RXA segment. */
  administration: RXA;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The OBSERVATION group of a parsed RSP^Z86 (HL7 v2.6) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RSP^Z86 (HL7 v2.6) message. */
export interface ParsedRSP_Z86 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^Z86 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^Z86 (HL7 v2.6) messages. */
export class RSP_Z86_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_Z86";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_Z86_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_Z86> {
    return parseStructure<ParsedRSP_Z86>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^Z86 (HL7 v2.6) message string into a structured result. */
export function parseRSP_Z86(messageString: string): Result<ParsedRSP_Z86> {
  return new RSP_Z86_Parser().parse(messageString);
}
