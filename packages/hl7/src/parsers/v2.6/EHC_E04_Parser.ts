/**
 * Parser for EHC^E04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  REASSESSMENT_REQUEST_INFO: IVC [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PRODUCT_SERVICE_GROUP: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E04_STRUCTURE } from "../../structures/v2.6/EHC_E04.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { IVC } from "../../segments/v2.6/IVC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PSS } from "../../segments/v2.6/PSS.ts";
import { PSG } from "../../segments/v2.6/PSG.ts";
import { PSL } from "../../segments/v2.6/PSL.ts";

/** The REASSESSMENT REQUEST INFO group of a parsed EHC^E04 (HL7 v2.6) message. */
export interface ParsedReassessmentRequestInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E04 (HL7 v2.6) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups?: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E04 (HL7 v2.6) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** Structured result of parsing an HL7 EHC^E04 (HL7 v2.6) message. */
export interface ParsedEHC_E04 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The REASSESSMENT REQUEST INFO group. */
  reassessmentRequestInfo: ParsedReassessmentRequestInfo;
}

/** The segment parsers of EHC^E04 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
};

/** Parser for HL7 EHC^E04 (HL7 v2.6) messages. */
export class EHC_E04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E04> {
    return parseStructure<ParsedEHC_E04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E04 (HL7 v2.6) message string into a structured result. */
export function parseEHC_E04(messageString: string): Result<ParsedEHC_E04> {
  return new EHC_E04_Parser().parse(messageString);
}
