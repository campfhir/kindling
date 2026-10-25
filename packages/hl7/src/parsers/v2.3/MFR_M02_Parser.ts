/**
 * Parser for MFR^M02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE STF [PRA] } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFR_M02_STRUCTURE } from "../../structures/v2.3/MFR_M02.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { QRD } from "../../segments/v2.3/QRD.ts";
import { QRF } from "../../segments/v2.3/QRF.ts";
import { MFI } from "../../segments/v2.3/MFI.ts";
import { MFE } from "../../segments/v2.3/MFE.ts";
import { STF } from "../../segments/v2.3/STF.ts";
import { PRA } from "../../segments/v2.3/PRA.ts";
import { DSC } from "../../segments/v2.3/DSC.ts";

/** The MF QUERY group of a parsed MFR^M02 (HL7 v2.3) message. */
export interface ParsedStaffEntry {
  /** The MFE segment. */
  entry: MFE;
  /** The STF segment. */
  staff: STF;
  /** The PRA segment. */
  practitioner?: PRA;
}

/** Structured result of parsing an HL7 MFR^M02 (HL7 v2.3) message. */
export interface ParsedMFR_M02 extends ParsedMessageBase {
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
  entries: ParsedStaffEntry[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of MFR^M02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 MFR^M02 (HL7 v2.3) messages. */
export class MFR_M02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFR_M02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFR_M02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFR_M02> {
    return parseStructure<ParsedMFR_M02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFR^M02 (HL7 v2.3) message string into a structured result. */
export function parseMFR_M02(messageString: string): Result<ParsedMFR_M02> {
  return new MFR_M02_Parser().parse(messageString);
}
