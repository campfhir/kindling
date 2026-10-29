/**
 * Builder for EHC^E02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION: IVC PYE [{CTD}] [{NTE}] [{ PRODUCT_SERVICE_SECTION: PSS [{ PSG: PSG [{PSL}] }] }] 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E02_STRUCTURE } from "../../structures/v2.6/EHC_E02.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { PYE } from "../../segments/v2.6/PYE.ts";
import type { CTD } from "../../segments/v2.6/CTD.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { PSS } from "../../segments/v2.6/PSS.ts";
import type { PSG } from "../../segments/v2.6/PSG.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";

/** The INVOICE INFORMATION group of an EHC^E02 (HL7 v2.6) message being built. */
export interface InvoiceInformationGroup {
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

/** The PRODUCT SERVICE SECTION group of an EHC^E02 (HL7 v2.6) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG groups. */
  psgs?: PsgGroup[];
}

/** The PSG group of an EHC^E02 (HL7 v2.6) message being built. */
export interface PsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PSL segments. */
  pslList?: PSL[];
}

/** The optional segments and groups of an EHC^E02 (HL7 v2.6) message. */
export interface EHC_E02Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E02 (HL7 v2.6) messages. */
export class EHC_E02<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E02";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E02_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public invoiceInformation: InvoiceInformationGroup,
    public options: EHC_E02Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, invoiceInformation: this.invoiceInformation };
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

/** Builds an HL7 EHC^E02 (HL7 v2.6) message. */
export function createEHC_E02<TMSH extends MSH = MSH>(
  header: TMSH,
  invoiceInformation: InvoiceInformationGroup,
  options: EHC_E02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E02<TMSH> {
  return new EHC_E02(header, invoiceInformation, options, encoding);
}
