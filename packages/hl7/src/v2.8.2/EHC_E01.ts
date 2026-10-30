/**
 * Builder, parser and structure for EHC^E01 messages (HL7 v2.8.2).
 *
 * Structure: MSH [{SFT}] [{UAC}]  INVOICE_INFORMATION_SUBMIT: IVC [PYE] [{CTD}] [AUT] [{LOC}] [{PRT}] [{ROL}] { PRODUCT_SERVICE_SECTION: PSS { PRODUCT_SERVICE_GROUP: PSG [{LOC}] [{PRT}] [{ROL}] [{ PATIENT_INFO: PID [PV1] [PV2] [{ACC}] { INSURANCE: IN1 [IN2] } [{ DIAGNOSIS: DG1 [{NTE}] }] [{OBX}] }] { PRODUCT_SERVICE_LINE_ITEM: PSL [{NTE}] [{ADJ}] [AUT] [{LOC}] [{PRT}] [{ROL}] } [{ PROCEDURE: PR1 [{NTE}] [{PRT}] [{ROL}] }] [{IPR}] } } 
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
import { AUT } from "./AUT.ts";
import { LOC } from "./LOC.ts";
import { PRT } from "./PRT.ts";
import { ROL } from "./ROL.ts";
import { PSS } from "./PSS.ts";
import { PSG } from "./PSG.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { ACC } from "./ACC.ts";
import { IN1 } from "./IN1.ts";
import { IN2 } from "./IN2.ts";
import { DG1 } from "./DG1.ts";
import { NTE } from "./NTE.ts";
import { OBX } from "./OBX.ts";
import { PSL } from "./PSL.ts";
import { ADJ } from "./ADJ.ts";
import { PR1 } from "./PR1.ts";
import { IPR } from "./IPR.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of EHC^E01 (HL7 v2.8.2), in order. */
export const EHC_E01_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: true },
  {
    name: "INVOICE_INFORMATION_SUBMIT",
    required: true,
    repeating: false,
    segments: [
      { name: "IVC", required: true, repeating: false },
      { name: "PYE", required: false, repeating: false },
      { name: "CTD", required: false, repeating: true },
      { name: "AUT", required: false, repeating: false },
      { name: "LOC", required: false, repeating: true },
      { name: "PRT", required: false, repeating: true },
      { name: "ROL", required: false, repeating: true },
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
              { name: "LOC", required: false, repeating: true },
              { name: "PRT", required: false, repeating: true },
              { name: "ROL", required: false, repeating: true },
              {
                name: "PATIENT_INFO",
                required: false,
                repeating: true,
                segments: [
                  { name: "PID", required: true, repeating: false },
                  { name: "PV1", required: false, repeating: false },
                  { name: "PV2", required: false, repeating: false },
                  { name: "ACC", required: false, repeating: true },
                  {
                    name: "INSURANCE",
                    required: true,
                    repeating: true,
                    segments: [
                      { name: "IN1", required: true, repeating: false },
                      { name: "IN2", required: false, repeating: false },
                    ],
                  },
                  {
                    name: "DIAGNOSIS",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "DG1", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                    ],
                  },
                  { name: "OBX", required: false, repeating: true },
                ],
              },
              {
                name: "PRODUCT_SERVICE_LINE_ITEM",
                required: true,
                repeating: true,
                segments: [
                  { name: "PSL", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "ADJ", required: false, repeating: true },
                  { name: "AUT", required: false, repeating: false },
                  { name: "LOC", required: false, repeating: true },
                  { name: "PRT", required: false, repeating: true },
                  { name: "ROL", required: false, repeating: true },
                ],
              },
              {
                name: "PROCEDURE",
                required: false,
                repeating: true,
                segments: [
                  { name: "PR1", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                  { name: "PRT", required: false, repeating: true },
                  { name: "ROL", required: false, repeating: true },
                ],
              },
              { name: "IPR", required: false, repeating: true },
            ],
          },
        ],
      },
    ],
  },
];

/** The INVOICE INFORMATION SUBMIT group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedInvoiceInformationSubmit {
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ParsedProductServiceSection[];
}

/** The PRODUCT SERVICE SECTION group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedProductServiceSection {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ParsedProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PATIENT INFO groups. */
  patientInfos?: ParsedPatientInfo[];
  /** The PRODUCT SERVICE LINE ITEM groups. */
  productServiceLineItems: ParsedProductServiceLineItem[];
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The IPR segments. */
  iprList?: IPR[];
}

/** The PATIENT INFO group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedPatientInfo {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ACC segments. */
  accidents?: ACC[];
  /** The INSURANCE groups. */
  insurances: ParsedInsurance[];
  /** The DIAGNOSIS groups. */
  diagnosis?: ParsedDiagnosis[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The INSURANCE group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedDiagnosis {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRODUCT SERVICE LINE ITEM group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedProductServiceLineItem {
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The PROCEDURE group of a parsed EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 EHC^E01 (HL7 v2.8.2) message. */
export interface ParsedEHC_E01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
  /** The INVOICE INFORMATION SUBMIT group. */
  invoiceInformationSubmit: ParsedInvoiceInformationSubmit;
}

/** The segment parsers of EHC^E01 (HL7 v2.8.2). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  IVC: (s, e) => IVC.parse(s, e),
  PYE: (s, e) => PYE.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  AUT: (s, e) => AUT.parse(s, e),
  LOC: (s, e) => LOC.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PSS: (s, e) => PSS.parse(s, e),
  PSG: (s, e) => PSG.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PSL: (s, e) => PSL.parse(s, e),
  ADJ: (s, e) => ADJ.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  IPR: (s, e) => IPR.parse(s, e),
};

/** Parser for HL7 EHC^E01 (HL7 v2.8.2) messages. */
export class EHC_E01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EHC_E01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEHC_E01> {
    return parseStructure<ParsedEHC_E01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EHC^E01 (HL7 v2.8.2) message string into a structured result. */
export function parseEHC_E01(messageString: string): Result<ParsedEHC_E01> {
  return new EHC_E01_Parser().parse(messageString);
}

/** The INVOICE INFORMATION SUBMIT group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface InvoiceInformationSubmitGroup {
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRODUCT SERVICE SECTION groups. */
  productServiceSections: ProductServiceSectionGroup[];
}

/** The PRODUCT SERVICE SECTION group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface ProductServiceSectionGroup {
  /** The PSS segment. */
  pss: PSS;
  /** The PRODUCT SERVICE GROUP groups. */
  productServiceGroups: ProductServiceGroup[];
}

/** The PRODUCT SERVICE GROUP group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface ProductServiceGroup {
  /** The PSG segment. */
  psg: PSG;
  /** The LOC segments. */
  patientLocations?: LOC[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PATIENT INFO groups. */
  patientInfos?: PatientInfoGroup[];
  /** The PRODUCT SERVICE LINE ITEM groups. */
  productServiceLineItems: ProductServiceLineItemGroup[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The IPR segments. */
  iprList?: IPR[];
}

/** The PATIENT INFO group of an EHC^E01 (HL7 v2.8.2) message being built. */
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

/** The INSURANCE group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
}

/** The DIAGNOSIS group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PRODUCT SERVICE LINE ITEM group of an EHC^E01 (HL7 v2.8.2) message being built. */
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The PROCEDURE group of an EHC^E01 (HL7 v2.8.2) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an EHC^E01 (HL7 v2.8.2) message. */
export interface EHC_E01Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segments. */
  uacList?: UAC[];
}

/** Builder for HL7 EHC^E01 (HL7 v2.8.2) messages. */
export class EHC_E01<TMSH extends MSH = MSH> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EHC_E01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = EHC_E01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public invoiceInformationSubmit: InvoiceInformationSubmitGroup,
    public options: EHC_E01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, invoiceInformationSubmit: this.invoiceInformationSubmit };
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

/** Builds an HL7 EHC^E01 (HL7 v2.8.2) message. */
export function createEHC_E01<TMSH extends MSH = MSH>(
  header: TMSH,
  invoiceInformationSubmit: InvoiceInformationSubmitGroup,
  options: EHC_E01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): EHC_E01<TMSH> {
  return new EHC_E01(header, invoiceInformationSubmit, options, encoding);
}
