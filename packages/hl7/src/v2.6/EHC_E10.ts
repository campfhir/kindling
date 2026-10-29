/**
 * Builder, parser and structure for EHC^E10 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] { INVOICE_PROCESSING_RESULTS_INFO: IPR [{NTE}] PYE IN1 [IN2] IVC { PSS_GROUP: PSS { PSG_GROUP: PSG { PRODUCT_SERVICE_LINE_INFO: PSL [{ADJ}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { SFT } from "./SFT.ts";
import { UAC } from "./UAC.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { IPR } from "./IPR.ts";
import { NTE } from "./NTE.ts";
import { PYE } from "./PYE.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { IVC } from "./IVC.ts";
import { PSS } from "./PSS.ts";
import { PSG } from "./PSG.ts";
import { PSL } from "./PSL.ts";
import { ADJ } from "./ADJ.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E10 (HL7 v2.6), in order. */
export const EHC_E10_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  {
    name: "INVOICE_PROCESSING_RESULTS_INFO",
    required: true,
    repeating: true,
    segments: [
      { name: "IPR", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      { name: "PYE", required: true, repeating: false },
      { name: "IN1", required: true, repeating: false },
      { name: "IN2", required: false, repeating: false },
      { name: "IVC", required: true, repeating: false },
      {
        name: "PSS_GROUP",
        required: true,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PSG_GROUP",
            required: true,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              {
                name: "PRODUCT_SERVICE_LINE_INFO",
                required: true,
                repeating: true,
                segments: [
                  { name: "PSL", required: true, repeating: false },
                  { name: "ADJ", required: false, repeating: true },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The INVOICE PROCESSING RESULTS INFO group of a parsed EHC^E10 (HL7 v2.6) message. */
export interface ParsedInvoiceProcessingResultsInfo {
  /** The IPR segment. */
  ipr: IPR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PYE segment. */
  pye: PYE;
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IVC segment. */
  ivc: IVC;
  /** The PSS GROUP groups. */
  pssGroups: ParsedPssGroup[];
}

/** The PSS GROUP group of a parsed EHC^E10 (HL7 v2.6) message. */
export interface ParsedPssGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG GROUP groups. */
  psgGroups: ParsedPsgGroup[];
}

/** The PSG GROUP group of a parsed EHC^E10 (HL7 v2.6) message. */
export interface ParsedPsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PRODUCT SERVICE LINE INFO groups. */
  productServiceLineInfos: ParsedProductServiceLineInfo[];
}

/** The PRODUCT SERVICE LINE INFO group of a parsed EHC^E10 (HL7 v2.6) message. */
export interface ParsedProductServiceLineInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** Structured result of parsing an HL7 EHC^E10 (HL7 v2.6) message. */
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

/** The segment parsers of EHC^E10 (HL7 v2.6). */
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
  IN2: (s, e) => IN2.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
};

/** Parser for HL7 EHC^E10 (HL7 v2.6) messages. */
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

/** Parses an HL7 EHC^E10 (HL7 v2.6) message string into a structured result. */
export function parseEHC_E10(messageString: string): Result<ParsedEHC_E10> {
  return new EHC_E10_Parser().parse(messageString);
}

/** The INVOICE PROCESSING RESULTS INFO group of an EHC^E10 (HL7 v2.6) message being built. */
export interface InvoiceProcessingResultsInfoGroup {
  /** The IPR segment. */
  ipr: IPR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PYE segment. */
  pye: PYE;
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IVC segment. */
  ivc: IVC;
  /** The PSS GROUP groups. */
  pssGroups: PssGroup[];
}

/** The PSS GROUP group of an EHC^E10 (HL7 v2.6) message being built. */
export interface PssGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG GROUP groups. */
  psgGroups: PsgGroup[];
}

/** The PSG GROUP group of an EHC^E10 (HL7 v2.6) message being built. */
export interface PsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PRODUCT SERVICE LINE INFO groups. */
  productServiceLineInfos: ProductServiceLineInfoGroup[];
}

/** The PRODUCT SERVICE LINE INFO group of an EHC^E10 (HL7 v2.6) message being built. */
export interface ProductServiceLineInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The optional segments and groups of an EHC^E10 (HL7 v2.6) message. */
export interface EHC_E10Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 EHC^E10 (HL7 v2.6) messages. */
export class EHC_E10<TMSH extends MSH = MSH, TMSA extends MSA = MSA> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E10";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E10_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public invoiceProcessingResultsInfos: InvoiceProcessingResultsInfoGroup[],
    public options: EHC_E10Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, invoiceProcessingResultsInfos: this.invoiceProcessingResultsInfos };
  }

  /** Validates the message structure, returning a result. */
  verify(): { valid: boolean; errors: string[] } {
    const errors = verifyStructure(this.structure, this.toInput());
    return { valid: errors.length === 0, errors };
  }

  /** Encodes this message to its HL7 wire string. */
  encode(): string {
    const verification = this.verify();
    if (!verification.valid) {
      throw new Error(`Cannot encode invalid ${this.messageName} message:\n${verification.errors.join("\n")}`);
    }
    return encodeStructure(this.structure, this.toInput(), this.encoding);
  }
}

/** Builds an HL7 EHC^E10 (HL7 v2.6) message. */
export function createEHC_E10<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  invoiceProcessingResultsInfos: InvoiceProcessingResultsInfoGroup[],
  options: EHC_E10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E10<TMSH, TMSA> {
  return new EHC_E10(header, acknowledgment, invoiceProcessingResultsInfos, options, encoding);
}
