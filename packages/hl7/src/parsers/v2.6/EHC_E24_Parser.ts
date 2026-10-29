/**
 * Parser for EHC^E24 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}]  AUTHORIZATION_RESPONSE_INFO: IVC { PSL_ITEM_INFO: PSL [AUT] [{ PAYER_ADJUSTMENT: ADJ }] } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E24_STRUCTURE } from "../../structures/v2.6/EHC_E24.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { IVC } from "../../segments/v2.6/IVC.ts";
import { PSL } from "../../segments/v2.6/PSL.ts";
import { AUT } from "../../segments/v2.6/AUT.ts";
import { ADJ } from "../../segments/v2.6/ADJ.ts";

/** The AUTHORIZATION RESPONSE INFO group of a parsed EHC^E24 (HL7 v2.6) message. */
export interface ParsedAuthorizationResponseInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E24 (HL7 v2.6) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The AUT segment. */
  authorization?: AUT;
  /** The PAYER ADJUSTMENT groups. */
  payerAdjustments?: ParsedPayerAdjustment[];
}

/** The PAYER ADJUSTMENT group of a parsed EHC^E24 (HL7 v2.6) message. */
export interface ParsedPayerAdjustment {
  /** The ADJ segment. */
  adj: ADJ;
}

/** Structured result of parsing an HL7 EHC^E24 (HL7 v2.6) message. */
export interface ParsedEHC_E24 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The AUTHORIZATION RESPONSE INFO group. */
  authorizationResponseInfo: ParsedAuthorizationResponseInfo;
}

/** The segment parsers of EHC^E24 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E24 (HL7 v2.6) messages. */
export class EHC_E24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E24> {
    return parseStructure<ParsedEHC_E24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E24 (HL7 v2.6) message string into a structured result. */
export function parseEHC_E24(messageString: string): Result<ParsedEHC_E24> {
  return new EHC_E24_Parser().parse(messageString);
}
