/**
 * Parser for EHC^E10 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] { INVOICE_PROCESSING_RESULTS_INFO: IPR [{NTE}] PYE IN1 [{GSP}] [{GSR}] [IN2] IVC { PSS_GROUP: PSS { PSG_GROUP: PSG { PRODUCT_SERVICE_LINE_INFO: PSL [{ADJ}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EHC_E10_STRUCTURE } from "../../structures/v2.9.1/EHC_E10.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { IPR } from "../../segments/v2.9.1/IPR.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PYE } from "../../segments/v2.9.1/PYE.ts";
import { IN1 } from "../../segments/v2.9.1/IN1.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { IN2 } from "../../segments/v2.9.1/IN2.ts";
import { IVC } from "../../segments/v2.9.1/IVC.ts";
import { PSS } from "../../segments/v2.9.1/PSS.ts";
import { PSG } from "../../segments/v2.9.1/PSG.ts";
import { PSL } from "../../segments/v2.9.1/PSL.ts";
import { ADJ } from "../../segments/v2.9.1/ADJ.ts";

/** The INVOICE PROCESSING RESULTS INFO group of a parsed EHC^E10 (HL7 v2.9.1) message. */
export interface ParsedInvoiceProcessingResultsInfo {
  /** The IPR segment. */
  ipr: IPR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PYE segment. */
  pye: PYE;
  /** The IN1 segment. */
  insurance: IN1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IVC segment. */
  ivc: IVC;
  /** The PSS GROUP groups. */
  pssGroups: ParsedPssGroup[];
}

/** The PSS GROUP group of a parsed EHC^E10 (HL7 v2.9.1) message. */
export interface ParsedPssGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG GROUP groups. */
  psgGroups: ParsedPsgGroup[];
}

/** The PSG GROUP group of a parsed EHC^E10 (HL7 v2.9.1) message. */
export interface ParsedPsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PRODUCT SERVICE LINE INFO groups. */
  productServiceLineInfos: ParsedProductServiceLineInfo[];
}

/** The PRODUCT SERVICE LINE INFO group of a parsed EHC^E10 (HL7 v2.9.1) message. */
export interface ParsedProductServiceLineInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** Structured result of parsing an HL7 EHC^E10 (HL7 v2.9.1) message. */
export interface ParsedEHC_E10 extends ParsedMessageBase {
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
  /** The INVOICE PROCESSING RESULTS INFO groups. */
  invoiceProcessingResultsInfos: ParsedInvoiceProcessingResultsInfo[];
}

/** The segment parsers of EHC^E10 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PYE: (s, e) => PYE.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E10 (HL7 v2.9.1) messages. */
export class EHC_E10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E10> {
    return parseStructure<ParsedEHC_E10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E10 (HL7 v2.9.1) message string into a structured result. */
export function parseEHC_E10(messageString: string): Result<ParsedEHC_E10> {
  return new EHC_E10_Parser().parse(messageString);
}
