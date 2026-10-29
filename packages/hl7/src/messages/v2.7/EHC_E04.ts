/**
 * Builder, parser and structure for EHC^E04 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}]  REASSESSMENT_REQUEST_INFO: IVC [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PRODUCT_SERVICE_GROUP: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { IVC } from "../../segments/v2.7/IVC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PSS } from "../../segments/v2.7/PSS.ts";
import { PSG } from "../../segments/v2.7/PSG.ts";
import { PSL } from "../../segments/v2.7/PSL.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of EHC^E04 (HL7 v2.7), in order. */
export const EHC_E04_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "REASSESSMENT_REQUEST_INFO",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "NTE", required: false, repeating: true },
      {
        name: "PRODUCT_SERVICE_SECTION",
        required: false,
        repeating: true,
        segments: [
          { name: "PSS", required: true, repeating: false },
          {
            name: "PRODUCT_SERVICE_GROUP",
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

/** The REASSESSMENT REQUEST INFO group of a parsed EHC^E04 (HL7 v2.7) message. */
export interface ParsedReassessmentRequestInfo {
  /** The IVC segment. */
  ivc: IVC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E04 (HL7 v2.7) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups?: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E04 (HL7 v2.7) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** Structured result of parsing an HL7 EHC^E04 (HL7 v2.7) message. */
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

/** The segment parsers of EHC^E04 (HL7 v2.7). */
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

/** Parser for HL7 EHC^E04 (HL7 v2.7) messages. */
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

/** Parses an HL7 EHC^E04 (HL7 v2.7) message string into a structured result. */
export function parseEHC_E04(messageString: string): Result<ParsedEHC_E04> {
  return new EHC_E04_Parser().parse(messageString);
}

/** The REASSESSMENT REQUEST INFO group of an EHC^E04 (HL7 v2.7) message being built. */
export interface ReassessmentRequestInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E04 (HL7 v2.7) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups?: ProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of an EHC^E04 (HL7 v2.7) message being built. */
export interface ProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** The optional segments and groups of an EHC^E04 (HL7 v2.7) message. */
export interface EHC_E04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E04 (HL7 v2.7) messages. */
export class EHC_E04<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E04";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E04_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public reassessmentRequestInfo: ReassessmentRequestInfoGroup,
    public options: EHC_E04Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, reassessmentRequestInfo: this.reassessmentRequestInfo };
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

/** Builds an HL7 EHC^E04 (HL7 v2.7) message. */
export function createEHC_E04<TMSH extends MSH = MSH>(
  header: TMSH,
  reassessmentRequestInfo: ReassessmentRequestInfoGroup,
  options: EHC_E04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E04<TMSH> {
  return new EHC_E04(header, reassessmentRequestInfo, options, encoding);
}
