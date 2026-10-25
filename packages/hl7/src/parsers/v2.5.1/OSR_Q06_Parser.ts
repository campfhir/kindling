/**
 * Parser for OSR^Q06 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] QRD [QRF] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }]  ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}]  } ] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OSR_Q06_STRUCTURE } from "../../structures/v2.5.1/OSR_Q06.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { QRF } from "../../segments/v2.5.1/QRF.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { RQD } from "../../segments/v2.5.1/RQD.ts";
import { RQ1 } from "../../segments/v2.5.1/RQ1.ts";
import { RXO } from "../../segments/v2.5.1/RXO.ts";
import { ODS } from "../../segments/v2.5.1/ODS.ts";
import { ODT } from "../../segments/v2.5.1/ODT.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The ORDER group of a parsed OSR^Q06 (HL7 v2.5.1) message. */
export interface ParsedResponseOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  detail: ParsedResponseDetail;
}

/** The TIMING group of a parsed OSR^Q06 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed OSR^Q06 (HL7 v2.5.1) message. */
export interface ParsedResponseDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 OSR^Q06 (HL7 v2.5.1) message. */
export interface ParsedOSR_Q06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedResponseOrder[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of OSR^Q06 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 OSR^Q06 (HL7 v2.5.1) messages. */
export class OSR_Q06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSR_Q06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSR_Q06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSR_Q06> {
    return parseStructure<ParsedOSR_Q06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSR^Q06 (HL7 v2.5.1) message string into a structured result. */
export function parseOSR_Q06(messageString: string): Result<ParsedOSR_Q06> {
  return new OSR_Q06_Parser().parse(messageString);
}
