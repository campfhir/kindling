/**
 * Parser for MFR^M06 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE CM0 [{CM1}] [{CM2}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M06_STRUCTURE } from "../../structures/v2.5/MFR_M06.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";
import { QRD } from "../../segments/v2.5/QRD.ts";
import { QRF } from "../../segments/v2.5/QRF.ts";
import { MFI } from "../../segments/v2.5/MFI.ts";
import { MFE } from "../../segments/v2.5/MFE.ts";
import { CM0 } from "../../segments/v2.5/CM0.ts";
import { CM1 } from "../../segments/v2.5/CM1.ts";
import { CM2 } from "../../segments/v2.5/CM2.ts";
import { DSC } from "../../segments/v2.5/DSC.ts";

/** The MF QUERY group of a parsed MFR^M06 (HL7 v2.5) message. */
export interface ParsedClinicalStudyEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CM0 segment. */
  clinicalStudy: CM0;
  /** The CM1 segments. */
  studyPhases?: CM1[];
  /** The CM2 segments. */
  studySchedules?: CM2[];
}

/** Structured result of parsing an HL7 MFR^M06 (HL7 v2.5) message. */
export interface ParsedMFR_M06 extends ParsedMessageBase {
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
  entries: ParsedClinicalStudyEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M06 (HL7 v2.5). */
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
  CM1: (s, e) => CM1.parse(s, e),
  CM2: (s, e) => CM2.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M06 (HL7 v2.5) messages. */
export class MFR_M06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M06> {
    return parseStructure<ParsedMFR_M06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M06 (HL7 v2.5) message string into a structured result. */
export function parseMFR_M06(messageString: string): Result<ParsedMFR_M06> {
  return new MFR_M06_Parser().parse(messageString);
}
