/**
 * Builder, parser and structure for EHC^E15 messages (HL7 v2.8.1).
 *
 * Structure: MSH [{SFT}] [{UAC}]  PAYMENT_REMITTANCE_HEADER_INFO: PMT PYE  [{ PAYMENT_REMITTANCE_DETAIL_INFO: IPR IVC { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG { PSL_ITEM_INFO: PSL [{ADJ}] } } } }] [{ ADJUSTMENT_PAYEE: ADJ [PRT] [ROL] }]
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
import { PMT } from "./PMT.ts";
import { PYE } from "./PYE.ts";
import { IPR } from "./IPR.ts";
import { IVC } from "./IVC.ts";
import { PSS } from "./PSS.ts";
import { PSG } from "./PSG.ts";
import { PSL } from "./PSL.ts";
import { ADJ } from "./ADJ.ts";
import { PRT } from "./PRT.ts";
import { ROL } from "./ROL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E15 (HL7 v2.8.1), in order. */
export const EHC_E15_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "PAYMENT_REMITTANCE_HEADER_INFO",
    required: true,
    repeating: false,
    segments: [
      { name: "PMT", required: true, repeating: false },
      { name: "PYE", required: true, repeating: false },
    ],
  },
  {
    name: "PAYMENT_REMITTANCE_DETAIL_INFO",
    required: false,
    repeating: true,
    segments: [
      { name: "IPR", required: true, repeating: false },
      { name: "IVC", required: true, repeating: false },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: true,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PRODUCT_SERVICE_GROUP",
            required: true,
            repeating: true,
            segments: [
              { name: "PSG", required: true, repeating: false },
              {
                name: "PSL_ITEM_INFO",
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
  {
    name: "ADJUSTMENT_PAYEE",
    required: false,
    repeating: true,
    segments: [
      { name: "ADJ", required: true, repeating: false },
      { name: "PRT", required: false, repeating: false },
      { name: "ROL", required: false, repeating: false },
    ],
  },
];

/** The PAYMENT REMITTANCE HEADER INFO group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedPaymentRemittanceHeaderInfo {
  /** The PMT segment. */
  pmt: PMT;
  /** The PYE segment. */
  pye: PYE;
}

/** The PAYMENT REMITTANCE DETAIL INFO group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedPaymentRemittanceDetailInfo {
  /** The IPR segment. */
  ipr: IPR;
  /** The IVC segment. */
  ivc: IVC;
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: ParsedPslItemInfo[];
}

/** The PSL ITEM INFO group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedPslItemInfo {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The ADJUSTMENT PAYEE group of a parsed EHC^E15 (HL7 v2.8.1) message. */
export interface ParsedAdjustmentPayee {
  /** The ADJ segment. */
  adj: ADJ;
  /** The PRT segment. */
  prt?: PRT;
  /** The ROL segment. */
  role?: ROL;
}

/** Structured result of parsing an HL7 EHC^E15 (HL7 v2.8.1) message. */
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

/** The segment parsers of EHC^E15 (HL7 v2.8.1). */
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
  PRT: (s, e) => PRT.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EHC^E15 (HL7 v2.8.1) messages. */
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

/** Parses an HL7 EHC^E15 (HL7 v2.8.1) message string into a structured result. */
export function parseEHC_E15(messageString: string): Result<ParsedEHC_E15> {
  return new EHC_E15_Parser().parse(messageString);
}

/** The PAYMENT REMITTANCE HEADER INFO group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface PaymentRemittanceHeaderInfoGroup {
  /** The PMT segment. */
  pmt: PMT;
  /** The PYE segment. */
  pye: PYE;
}

/** The PAYMENT REMITTANCE DETAIL INFO group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface PaymentRemittanceDetailInfoGroup {
  /** The IPR segment. */
  ipr: IPR;
  /** The IVC segment. */
  ivc: IVC;
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface ProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL ITEM INFO groups. */
  pslItemInfos: PslItemInfoGroup[];
}

/** The PSL ITEM INFO group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface PslItemInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The ADJUSTMENT PAYEE group of an EHC^E15 (HL7 v2.8.1) message being built. */
export interface AdjustmentPayeeGroup {
  /** The ADJ segment. */
  adj: ADJ;
  /** The PRT segment. */
  prt?: PRT;
  /** The ROL segment. */
  role?: ROL;
}

/** The optional segments and groups of an EHC^E15 (HL7 v2.8.1) message. */
export interface EHC_E15Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The PAYMENT REMITTANCE DETAIL INFO groups. */
  paymentRemittanceDetailInfos?: PaymentRemittanceDetailInfoGroup[];
  /** The ADJUSTMENT PAYEE groups. */
  adjustmentPayees?: AdjustmentPayeeGroup[];
}

/** Builder for HL7 EHC^E15 (HL7 v2.8.1) messages. */
export class EHC_E15<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E15";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E15_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public paymentRemittanceHeaderInfo: PaymentRemittanceHeaderInfoGroup,
    public options: EHC_E15Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, paymentRemittanceHeaderInfo: this.paymentRemittanceHeaderInfo };
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

/** Builds an HL7 EHC^E15 (HL7 v2.8.1) message. */
export function createEHC_E15<TMSH extends MSH = MSH>(
  header: TMSH,
  paymentRemittanceHeaderInfo: PaymentRemittanceHeaderInfoGroup,
  options: EHC_E15Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E15<TMSH> {
  return new EHC_E15(header, paymentRemittanceHeaderInfo, options, encoding);
}
