/**
 * Parser for MFR^M07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CM0 [{CM2}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M07_STRUCTURE } from "../../structures/v2.6/MFR_M07.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { CM0 } from "../../segments/v2.6/CM0.ts";
import { CM2 } from "../../segments/v2.6/CM2.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The MF QUERY group of a parsed MFR^M07 (HL7 v2.6) message. */
export interface ParsedMfQuery {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFR^M07 (HL7 v2.6) message. */
export interface ParsedMFR_M07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  mfQuerys: ParsedMfQuery[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M07 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CM0: (s, e) => CM0.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M07 (HL7 v2.6) messages. */
export class MFR_M07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M07> {
    return parseStructure<ParsedMFR_M07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M07 (HL7 v2.6) message string into a structured result. */
export function parseMFR_M07(messageString: string): Result<ParsedMFR_M07> {
  return new MFR_M07_Parser().parse(messageString);
}
