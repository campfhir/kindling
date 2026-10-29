/**
 * Builder for EHC^E10 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [{UAC}] MSA [{ERR}] { INVOICE_PROCESSING_RESULTS_INFO: IPR [{NTE}] PYE IN1 [IN2] IVC { PSS_GROUP: PSS { PSG_GROUP: PSG { PRODUCT_SERVICE_LINE_INFO: PSL [{ADJ}] } } } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E10_STRUCTURE } from "../../structures/v2.7/EHC_E10.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { MSA } from "../../segments/v2.7/MSA.ts";
import type { ERR } from "../../segments/v2.7/ERR.ts";
import type { IPR } from "../../segments/v2.7/IPR.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { PYE } from "../../segments/v2.7/PYE.ts";
import type { IN1 } from "../../segments/v2.7/IN1.ts";
import type { IN2 } from "../../segments/v2.7/IN2.ts";
import type { IVC } from "../../segments/v2.7/IVC.ts";
import type { PSS } from "../../segments/v2.7/PSS.ts";
import type { PSG } from "../../segments/v2.7/PSG.ts";
import type { PSL } from "../../segments/v2.7/PSL.ts";
import type { ADJ } from "../../segments/v2.7/ADJ.ts";

/** The INVOICE PROCESSING RESULTS INFO group of an EHC^E10 (HL7 v2.7) message being built. */
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

/** The PSS GROUP group of an EHC^E10 (HL7 v2.7) message being built. */
export interface PssGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PSG GROUP groups. */
  psgGroups: PsgGroup[];
}

/** The PSG GROUP group of an EHC^E10 (HL7 v2.7) message being built. */
export interface PsgGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The PRODUCT SERVICE LINE INFO groups. */
  productServiceLineInfos: ProductServiceLineInfoGroup[];
}

/** The PRODUCT SERVICE LINE INFO group of an EHC^E10 (HL7 v2.7) message being built. */
export interface ProductServiceLineInfoGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The ADJ segments. */
  adjList?: ADJ[];
}

/** The optional segments and groups of an EHC^E10 (HL7 v2.7) message. */
export interface EHC_E10Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The ERR segments. */
  errors?: ERR[];
}

/** Builder for HL7 EHC^E10 (HL7 v2.7) messages. */
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

/** Builds an HL7 EHC^E10 (HL7 v2.7) message. */
export function createEHC_E10<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  invoiceProcessingResultsInfos: InvoiceProcessingResultsInfoGroup[],
  options: EHC_E10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E10<TMSH, TMSA> {
  return new EHC_E10(header, acknowledgment, invoiceProcessingResultsInfos, options, encoding);
}
