/**
 * Parser for EHC^E15 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  PAYMENT_REMITTANCE_HEADER_INFO: PMT PYE  [{ PAYMENT_REMITTANCE_DETAIL_INFO: IPR IVC { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG { PSL_ITEM_INFO: PSL [{ADJ}] } } } }] [{ ADJUSTMENT_PAYEE: ADJ [ROL] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E15_STRUCTURE } from "../../structures/v2.7/EHC_E15.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { PMT } from "../../segments/v2.7/PMT.ts";
import { PYE } from "../../segments/v2.7/PYE.ts";
import { IPR } from "../../segments/v2.7/IPR.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { PSS } from "../../segments/v2.7/PSS.ts";
import { PSG } from "../../segments/v2.7/PSG.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";
import { ADJ } from "../../segments/v2.7/ADJ.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";

/** The PAYMENT REMITTANCE HEADER INFO group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedPaymentRemittanceHeaderInfo {
  /** The PMT segment. */
  pmt: PMT;
  /** The PYE segment. */
  pye: PYE;
}

/** The PAYMENT REMITTANCE DETAIL INFO group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedPaymentRemittanceDetailInfo {
  /** The IPR segment. */
  ipr: IPR;
  /** The IVC segment. */
  ivc: IVC;
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The ADJUSTMENT PAYEE group of a parsed EHC^E15 (HL7 v2.7) message. */
export interface ParsedAdjustmentPayee {
  /** The ADJ segment. */
  adj: ADJ;
  /** The ROL segment. */
  role?: ROL;
}

/** Structured result of parsing an HL7 EHC^E15 (HL7 v2.7) message. */
export interface ParsedEHC_E15 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The PAYMENT REMITTANCE HEADER INFO group. */
  paymentRemittanceHeaderInfo: ParsedPaymentRemittanceHeaderInfo;
  /** The PAYMENT REMITTANCE DETAIL INFO groups. */
  paymentRemittanceDetailInfos?: ParsedPaymentRemittanceDetailInfo[];
  /** The ADJUSTMENT PAYEE groups. */
  adjustmentPayees?: ParsedAdjustmentPayee[];
}

/** The segment parsers of EHC^E15 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PMT: (s, e) => PMT.parse(s, e),
  PYE: (s, e) => PYE.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EHC^E15 (HL7 v2.7) messages. */
export class EHC_E15_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E15";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E15_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E15> {
    return parseStructure<ParsedEHC_E15>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E15 (HL7 v2.7) message string into a structured result. */
export function parseEHC_E15(messageString: string): Result<ParsedEHC_E15> {
  return new EHC_E15_Parser().parse(messageString);
}
