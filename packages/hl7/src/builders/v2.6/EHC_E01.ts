/**
 * Builder for EHC^E01 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION: IVC [PYE] [{CTD}] [AUT] [{LOC}] [{ROL}] { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG [{LOC}] [{ROL}] [{ PATIENT_INFO: PID [PV1] [PV2] [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] }] { PRODUCT_SERVICE_LINE_ITEM: PSL [{NTE}] [{ADJ}] [AUT] [{LOC}] [{ROL}] } [{ PROCEDURE: PR1 [{NTE}] [{ROL}] }] [{ INVOICE_PROCESSING: IPR }] } } 
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { EHC_E01_STRUCTURE } from "../../structures/v2.6/EHC_E01.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { IVC } from "../../segments/v2.6/IVC.ts";
import type { PYE } from "../../segments/v2.6/PYE.ts";
import type { CTD } from "../../segments/v2.6/CTD.ts";
import type { AUT } from "../../segments/v2.6/AUT.ts";
import type { LOC } from "../../segments/v2.6/LOC.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { PSS } from "../../segments/v2.6/PSS.ts";
import type { PSG } from "../../segments/v2.6/PSG.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { ACC } from "../../segments/v2.6/ACC.ts";
import type { IN1 } from "../../segments/v2.6/IN1.ts";
import type { IN2 } from "../../segments/v2.6/IN2.ts";
import type { DG1 } from "../../segments/v2.6/DG1.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { PSL } from "../../segments/v2.6/PSL.ts";
import type { ADJ } from "../../segments/v2.6/ADJ.ts";
import type { PR1 } from "../../segments/v2.6/PR1.ts";
import type { IPR } from "../../segments/v2.6/IPR.ts";

/** The INVOICE INFORMATION group of an EHC^E01 (HL7 v2.6) message being built. */
export interface InvoiceInformationGroup {
  /** The IVC segment. */
  ivc: IVC;
  /** The PYE segment. */
  pye?: PYE;
  /** The CTD segments. */
  contacts?: CTD[];
  /** The AUT segment. */
  authorization?: AUT;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E01 (HL7 v2.6) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of an EHC^E01 (HL7 v2.6) message being built. */
export interface ProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PATIENT INFO groups. */
  patientInfos?: PatientInfoGroup[];
  /** The PRODUCT SERVICE LINE ITEM groups. */
  productServiceLineItems: ProductServiceLineItemGroup[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The INVOICE PROCESSING groups. */
  invoiceProcessings?: InvoiceProcessingGroup[];
}

/** The PATIENT INFO group of an EHC^E01 (HL7 v2.6) message being built. */
export interface PatientInfoGroup {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: InsuranceGroup[];
  /** The DIAGNOSIS groups. */
  diagnosis?: DiagnosisGroup[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of an EHC^E01 (HL7 v2.6) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of an EHC^E01 (HL7 v2.6) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRODUCT SERVICE LINE ITEM group of an EHC^E01 (HL7 v2.6) message being built. */
export interface ProductServiceLineItemGroup {
  /** The PSL segment. */
  psl: PSL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ADJ segments. */
  adjList?: ADJ[];
  /** The AUT segment. */
  authorization?: AUT;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The PROCEDURE group of an EHC^E01 (HL7 v2.6) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INVOICE PROCESSING group of an EHC^E01 (HL7 v2.6) message being built. */
export interface InvoiceProcessingGroup {
  /** The IPR segment. */
  ipr: IPR;
}

/** The optional segments and groups of an EHC^E01 (HL7 v2.6) message. */
export interface EHC_E01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E01 (HL7 v2.6) messages. */
export class EHC_E01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public invoiceInformation: InvoiceInformationGroup,
    public options: EHC_E01Options = {},
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

/** Builds an HL7 EHC^E01 (HL7 v2.6) message. */
export function createEHC_E01<TMSH extends MSH = MSH>(
  header: TMSH,
  invoiceInformation: InvoiceInformationGroup,
  options: EHC_E01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E01<TMSH> {
  return new EHC_E01(header, invoiceInformation, options, encoding);
}
