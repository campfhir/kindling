/**
 * Builder, parser and structure for EHC^E02 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION_CANCEL: IVC PYE [{CTD}] [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PSG: PSG [{PSL}] }] }] 
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
import { IVC } from "./IVC.ts";
import { PYE } from "./PYE.ts";
import { CTD } from "./CTD.ts";
import { NTE } from "./NTE.ts";
import { PSS } from "./PSS.ts";
import { PSG } from "./PSG.ts";
import { PSL } from "./PSL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E02 (HL7 v2.8.2), in order. */
export const EHC_E02_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "INVOICE_INFORMATION_CANCEL",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "PYE", required: true, repeating: false },
      { name: "CTD", required: false, repeating: true },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: false,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PSG",
            required: false,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              { name: "PSL", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
];

/** The INVOICE INFORMATION CANCEL group of a parsed EHC^E02 (HL7 v2.8.2) message. */
export interface ParsedInvoiceInformationCancel {
  /** The IVC segment. */
  ivc: IVC;
  /** The PYE segment. */
  pye: PYE;
  /** The CTD segments. */
  contacts?: CTD[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E02 (HL7 v2.8.2) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG groups. */
  psgs?: ParsedPsg[];
}

/** The PSG group of a parsed EHC^E02 (HL7 v2.8.2) message. */
export interface ParsedPsg {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** Structured result of parsing an HL7 EHC^E02 (HL7 v2.8.2) message. */
export interface ParsedEHC_E02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The INVOICE INFORMATION CANCEL group. */
  invoiceInformationCancel: ParsedInvoiceInformationCancel;
}

/** The segment parsers of EHC^E02 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PYE: (s, e) => PYE.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
};

/** Parser for HL7 EHC^E02 (HL7 v2.8.2) messages. */
export class EHC_E02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E02> {
    return parseStructure<ParsedEHC_E02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E02 (HL7 v2.8.2) message string into a structured result. */
export function parseEHC_E02(messageString: string): Result<ParsedEHC_E02> {
  return new EHC_E02_Parser().parse(messageString);
}

/** The INVOICE INFORMATION CANCEL group of an EHC^E02 (HL7 v2.8.2) message being built. */
export interface InvoiceInformationCancelGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PYE segment. */
  pye: PYE;
  /** The CTD segments. */
  contacts?: CTD[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E02 (HL7 v2.8.2) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG groups. */
  psgs?: PsgGroup[];
}

/** The PSG group of an EHC^E02 (HL7 v2.8.2) message being built. */
export interface PsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** The optional segments and groups of an EHC^E02 (HL7 v2.8.2) message. */
export interface EHC_E02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E02 (HL7 v2.8.2) messages. */
export class EHC_E02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public invoiceInformationCancel: InvoiceInformationCancelGroup,
    public options: EHC_E02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, invoiceInformationCancel: this.invoiceInformationCancel };
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

/** Builds an HL7 EHC^E02 (HL7 v2.8.2) message. */
export function createEHC_E02<TMSH extends MSH = MSH>(
  header: TMSH,
  invoiceInformationCancel: InvoiceInformationCancelGroup,
  options: EHC_E02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E02<TMSH> {
  return new EHC_E02(header, invoiceInformationCancel, options, encoding);
}
