/**
 * Parser for ORF^R04 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [{ERR}] [QAK] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORF_R04_STRUCTURE } from "../../structures/v2.5.1/ORF_R04.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { QRF } from "../../segments/v2.5.1/QRF.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { OBR } from "../../segments/v2.5.1/OBR.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { CTD } from "../../segments/v2.5.1/CTD.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { CTI } from "../../segments/v2.5.1/CTI.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { QAK } from "../../segments/v2.5.1/QAK.ts";
import { DSC } from "../../segments/v2.5.1/DSC.ts";

/** The QUERY RESPONSE group of a parsed ORF^R04 (HL7 v2.5.1) message. */
export interface ParsedQueryResponse {
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: ParsedResponseOrder[];
}

/** The ORDER group of a parsed ORF^R04 (HL7 v2.5.1) message. */
export interface ParsedResponseOrder {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING QTY groups. */
  timings?: ParsedTimingQty[];
  /** The CTD segment. */
  contact?: CTD;
  /** The OBSERVATION groups. */
  observations: ParsedObservation[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** The TIMING QTY group of a parsed ORF^R04 (HL7 v2.5.1) message. */
export interface ParsedTimingQty {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The OBSERVATION group of a parsed ORF^R04 (HL7 v2.5.1) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  observation?: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORF^R04 (HL7 v2.5.1) message. */
export interface ParsedORF_R04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The QUERY RESPONSE groups. */
  queryResponses: ParsedQueryResponse[];
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of ORF^R04 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 ORF^R04 (HL7 v2.5.1) messages. */
export class ORF_R04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORF_R04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORF_R04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORF_R04> {
    return parseStructure<ParsedORF_R04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORF^R04 (HL7 v2.5.1) message string into a structured result. */
export function parseORF_R04(messageString: string): Result<ParsedORF_R04> {
  return new ORF_R04_Parser().parse(messageString);
}
