/**
 * Parser for RDY^Z80 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [ERR] QAK QPD [{DSP}] [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RDY_Z80_STRUCTURE } from "../../structures/v2.6/RDY_Z80.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QPD } from "../../segments/v2.6/QPD.ts";
import { DSP } from "../../segments/v2.6/DSP.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** Structured result of parsing an HL7 RDY^Z80 (HL7 v2.6) message. */
export interface ParsedRDY_Z80 extends ParsedMessageBase {
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
  /** The DSP segments. */
  displayLines?: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RDY^Z80 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QPD: (s, e) => QPD.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RDY^Z80 (HL7 v2.6) messages. */
export class RDY_Z80_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDY_Z80";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDY_Z80_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDY_Z80> {
    return parseStructure<ParsedRDY_Z80>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDY^Z80 (HL7 v2.6) message string into a structured result. */
export function parseRDY_Z80(messageString: string): Result<ParsedRDY_Z80> {
  return new RDY_Z80_Parser().parse(messageString);
}
