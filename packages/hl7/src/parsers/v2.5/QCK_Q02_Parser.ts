/**
 * Parser for QCK^Q02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [ERR] [QAK]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { QCK_Q02_STRUCTURE } from "../../structures/v2.5/QCK_Q02.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { QAK } from "../../segments/v2.5/QAK.ts";

/** Structured result of parsing an HL7 QCK^Q02 (HL7 v2.5) message. */
export interface ParsedQCK_Q02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** The segment parsers of QCK^Q02 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
};

/** Parser for HL7 QCK^Q02 (HL7 v2.5) messages. */
export class QCK_Q02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "QCK_Q02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = QCK_Q02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedQCK_Q02> {
    return parseStructure<ParsedQCK_Q02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 QCK^Q02 (HL7 v2.5) message string into a structured result. */
export function parseQCK_Q02(messageString: string): Result<ParsedQCK_Q02> {
  return new QCK_Q02_Parser().parse(messageString);
}
