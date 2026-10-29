/**
 * Builder for EHC^E04 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  REASSESSMENT_REQUEST_INFO: IVC [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PRODUCT_SERVICE_GROUP: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E04_STRUCTURE } from "../../structures/v2.6/EHC_E04.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PSS } from "../../segments/v2.6/PSS.ts";
import type { PSG } from "../../segments/v2.6/PSG.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";

/** The REASSESSMENT REQUEST INFO group of an EHC^E04 (HL7 v2.6) message being built. */
export interface ReassessmentRequestInfoGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections?: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E04 (HL7 v2.6) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups?: ProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of an EHC^E04 (HL7 v2.6) message being built. */
export interface ProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** The optional segments and groups of an EHC^E04 (HL7 v2.6) message. */
export interface EHC_E04Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E04 (HL7 v2.6) messages. */
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

/** Builds an HL7 EHC^E04 (HL7 v2.6) message. */
export function createEHC_E04<TMSH extends MSH = MSH>(
  header: TMSH,
  reassessmentRequestInfo: ReassessmentRequestInfoGroup,
  options: EHC_E04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E04<TMSH> {
  return new EHC_E04(header, reassessmentRequestInfo, options, encoding);
}
