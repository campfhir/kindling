/**
 * Parser for UDM^Q05 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] URD [URS] {DSP} [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { UDM_Q05_STRUCTURE } from "../../structures/v2.6/UDM_Q05.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { URD } from "../../segments/v2.6/URD.ts";
import { URS } from "../../segments/v2.6/URS.ts";
import { DSP } from "../../segments/v2.6/DSP.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** Structured result of parsing an HL7 UDM^Q05 (HL7 v2.6) message. */
export interface ParsedUDM_Q05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The URD segment. */
  updateDefinition: URD;
  /** The URS segment. */
  updateSelection?: URS;
  /** The DSP segments. */
  displayLines: DSP[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of UDM^Q05 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  URD: (s, e) => URD.parse(s, e),
  URS: (s, e) => URS.parse(s, e),
  DSP: (s, e) => DSP.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 UDM^Q05 (HL7 v2.6) messages. */
export class UDM_Q05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "UDM_Q05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = UDM_Q05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedUDM_Q05> {
    return parseStructure<ParsedUDM_Q05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 UDM^Q05 (HL7 v2.6) message string into a structured result. */
export function parseUDM_Q05(messageString: string): Result<ParsedUDM_Q05> {
  return new UDM_Q05_Parser().parse(messageString);
}
