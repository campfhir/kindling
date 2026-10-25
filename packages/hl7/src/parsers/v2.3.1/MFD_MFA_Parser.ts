/**
 * Parser for MFD^MFA messages (HL7 v2.3.1).
 *
 * Structure: MSH MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFD_MFA_STRUCTURE } from "../../structures/v2.3.1/MFD_MFA.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MFI } from "../../segments/v2.3.1/MFI.ts";
import { MFA } from "../../segments/v2.3.1/MFA.ts";

/** Structured result of parsing an HL7 MFD^MFA (HL7 v2.3.1) message. */
export interface ParsedMFD_MFA extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFD^MFA (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MFI: (s, e) => MFI.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFD^MFA (HL7 v2.3.1) messages. */
export class MFD_MFA_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFD_MFA";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFD_MFA_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFD_MFA> {
    return parseStructure<ParsedMFD_MFA>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFD^MFA (HL7 v2.3.1) message string into a structured result. */
export function parseMFD_MFA(messageString: string): Result<ParsedMFD_MFA> {
  return new MFD_MFA_Parser().parse(messageString);
}
