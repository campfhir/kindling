/**
 * Parser for MFR^M04 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE CDM [{PRC}] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M04_STRUCTURE } from "../../structures/v2.3.1/MFR_M04.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { MFI } from "../../segments/v2.3.1/MFI.ts";
import { MFE } from "../../segments/v2.3.1/MFE.ts";
import { CDM } from "../../segments/v2.3.1/CDM.ts";
import { PRC } from "../../segments/v2.3.1/PRC.ts";
import { DSC } from "../../segments/v2.3.1/DSC.ts";

/** The MF QUERY group of a parsed MFR^M04 (HL7 v2.3.1) message. */
export interface ParsedChargeDescriptionEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The CDM segment. */
  chargeDescription: CDM;
  /** The PRC segments. */
  prices?: PRC[];
}

/** Structured result of parsing an HL7 MFR^M04 (HL7 v2.3.1) message. */
export interface ParsedMFR_M04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF QUERY groups. */
  entries: ParsedChargeDescriptionEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M04 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  CDM: (s, e) => CDM.parse(s, e),
  PRC: (s, e) => PRC.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M04 (HL7 v2.3.1) messages. */
export class MFR_M04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M04> {
    return parseStructure<ParsedMFR_M04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M04 (HL7 v2.3.1) message string into a structured result. */
export function parseMFR_M04(messageString: string): Result<ParsedMFR_M04> {
  return new MFR_M04_Parser().parse(messageString);
}
