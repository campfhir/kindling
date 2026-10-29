/**
 * Parser for MFN^M12 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_OBS_ATTRIBUTES: MFE OM1 [OM7] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M12_STRUCTURE } from "../../structures/v2.6/MFN_M12.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MFI } from "../../segments/v2.6/MFI.ts";
import { MFE } from "../../segments/v2.6/MFE.ts";
import { OM1 } from "../../segments/v2.6/OM1.ts";
import { OM7 } from "../../segments/v2.6/OM7.ts";

/** The MF OBS ATTRIBUTES group of a parsed MFN^M12 (HL7 v2.6) message. */
export interface ParsedMfObsAttributes {
  /** The MFE segment. */
  entry: MFE;
  /** The OM1 segment. */
  observationDefinition: OM1;
  /** The OM7 segment. */
  additionalAttributes?: OM7;
}

/** Structured result of parsing an HL7 MFN^M12 (HL7 v2.6) message. */
export interface ParsedMFN_M12 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF OBS ATTRIBUTES groups. */
  mfObsAttributes: ParsedMfObsAttributes[];
}

/** The segment parsers of MFN^M12 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  OM1: (s, e) => OM1.parse(s, e),
  OM7: (s, e) => OM7.parse(s, e),
};

/** Parser for HL7 MFN^M12 (HL7 v2.6) messages. */
export class MFN_M12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M12> {
    return parseStructure<ParsedMFN_M12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M12 (HL7 v2.6) message string into a structured result. */
export function parseMFN_M12(messageString: string): Result<ParsedMFN_M12> {
  return new MFN_M12_Parser().parse(messageString);
}
