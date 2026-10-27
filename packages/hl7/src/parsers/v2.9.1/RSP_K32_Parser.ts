/**
 * Parser for RSP^K32 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] MSA [ERR] QAK QPD [{ QUERY_RESPONSE: PID [PD1] [{NK1}] [{GSP}] [{GSR}] PV1 [PV2] [QRI] }] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RSP_K32_STRUCTURE } from "../../structures/v2.9.1/RSP_K32.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { QAK } from "../../segments/v2.9.1/QAK.ts";
import { QPD } from "../../segments/v2.9.1/QPD.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { PV1 } from "../../segments/v2.9.1/PV1.ts";
import { PV2 } from "../../segments/v2.9.1/PV2.ts";
import { QRI } from "../../segments/v2.9.1/QRI.ts";
import { DSC } from "../../segments/v2.9.1/DSC.ts";

/** The QUERY RESPONSE group of a parsed RSP^K32 (HL7 v2.9.1) message. */
export interface ParsedQueryResponse {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The QRI segment. */
  queryResponseInstance?: QRI;
}

/** Structured result of parsing an HL7 RSP^K32 (HL7 v2.9.1) message. */
export interface ParsedRSP_K32 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment: QAK;
  /** The QPD segment. */
  queryParameters: QPD;
  /** The QUERY RESPONSE groups. */
  queryResponses?: ParsedQueryResponse[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RSP^K32 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  QRI: (s, e) => QRI.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RSP^K32 (HL7 v2.9.1) messages. */
export class RSP_K32_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RSP_K32";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RSP_K32_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRSP_K32> {
    return parseStructure<ParsedRSP_K32>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RSP^K32 (HL7 v2.9.1) message string into a structured result. */
export function parseRSP_K32(messageString: string): Result<ParsedRSP_K32> {
  return new RSP_K32_Parser().parse(messageString);
}
