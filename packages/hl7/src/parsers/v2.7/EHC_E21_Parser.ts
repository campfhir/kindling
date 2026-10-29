/**
 * Parser for EHC^E21 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  AUTHORIZATION_REQUEST: IVC { PSL_ITEM_INFO: PSL [{NTE}] [AUT] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E21_STRUCTURE } from "../../structures/v2.7/EHC_E21.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { AUT } from "../../segments/v2.7/AUT.ts";

/** The AUTHORIZATION REQUEST group of a parsed EHC^E21 (HL7 v2.7) message. */
export interface ParsedAuthorizationRequest {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E21 (HL7 v2.7) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The AUT segment. */
  authorization?: AUT;
}

/** Structured result of parsing an HL7 EHC^E21 (HL7 v2.7) message. */
export interface ParsedEHC_E21 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The AUTHORIZATION REQUEST group. */
  authorizationRequest: ParsedAuthorizationRequest;
}

/** The segment parsers of EHC^E21 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
};

/** Parser for HL7 EHC^E21 (HL7 v2.7) messages. */
export class EHC_E21_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E21";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E21_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E21> {
    return parseStructure<ParsedEHC_E21>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E21 (HL7 v2.7) message string into a structured result. */
export function parseEHC_E21(messageString: string): Result<ParsedEHC_E21> {
  return new EHC_E21_Parser().parse(messageString);
}
