/**
 * Parser for RSP^K31 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] QAK QPD RCP { RESPONSE: [ PATIENT: PID [PD1] [{NTE}] [{AL1}] [ PATIENT_VISIT: PV1 [PV2] ] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{NTE}] {RXR} [{ COMPONENTS: RXC [{NTE}] }] ] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] RXD {RXR} [{RXC}] { OBSERVATION: [OBX] [{NTE}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K31_STRUCTURE } from "../../structures/v2.5.1/RSP_K31.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { QPD } from "../../segments/v2.5.1/QPD.ts";
import { RCP } from "../../segments/v2.5.1/RCP.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
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
import { RXD } from "../../segments/v2.5.1/RXD.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The RESPONSE group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed RSP^K31 (HL7 v2.5.1) message. */
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

/** The PATIENT VISIT group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The ORDER group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
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

/** The TIMING group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENTS groups. */
  components?: ParsedComponents[];
}

/** The COMPONENTS group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedComponents {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ENCODING group of a parsed RSP^K31 (HL7 v2.5.1) message. */
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

/** The TIMING ENCODED group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 RSP^K31 (HL7 v2.5.1) message. */
export interface ParsedRSP_K31 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The RCP segment. */
  responseControl: RCP;
  /** The RESPONSE groups. */
  responses: ParsedResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K31 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  RCP: (s, e) => RCP.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
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
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K31 (HL7 v2.5.1) messages. */
export class RSP_K31_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K31";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K31_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K31> {
    return parseStructure<ParsedRSP_K31>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K31 (HL7 v2.5.1) message string into a structured result. */
export function parseRSP_K31(messageString: string): Result<ParsedRSP_K31> {
  return new RSP_K31_Parser().parse(messageString);
}
