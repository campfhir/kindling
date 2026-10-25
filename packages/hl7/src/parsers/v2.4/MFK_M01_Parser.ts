/**
 * Parser for MFK^M01 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFK_M01_STRUCTURE } from "../../structures/v2.4/MFK_M01.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { MFI } from "../../segments/v2.4/MFI.ts";
import { MFA } from "../../segments/v2.4/MFA.ts";

/** Structured result of parsing an HL7 MFK^M01 (HL7 v2.4) message. */
export interface ParsedMFK_M01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFK^M01 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFK^M01 (HL7 v2.4) messages. */
export class MFK_M01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFK_M01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFK_M01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFK_M01> {
    return parseStructure<ParsedMFK_M01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFK^M01 (HL7 v2.4) message string into a structured result. */
export function parseMFK_M01(messageString: string): Result<ParsedMFK_M01> {
  return new MFK_M01_Parser().parse(messageString);
}
