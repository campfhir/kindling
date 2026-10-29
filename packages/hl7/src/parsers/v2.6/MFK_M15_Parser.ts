/**
 * Parser for MFK^M15 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFK_M15_STRUCTURE } from "../../structures/v2.6/MFK_M15.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFA } from "../../segments/v2.6/MFA.ts";

/** Structured result of parsing an HL7 MFK^M15 (HL7 v2.6) message. */
export interface ParsedMFK_M15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFK^M15 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFK^M15 (HL7 v2.6) messages. */
export class MFK_M15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFK_M15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFK_M15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFK_M15> {
    return parseStructure<ParsedMFK_M15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFK^M15 (HL7 v2.6) message string into a structured result. */
export function parseMFK_M15(messageString: string): Result<ParsedMFK_M15> {
  return new MFK_M15_Parser().parse(messageString);
}
