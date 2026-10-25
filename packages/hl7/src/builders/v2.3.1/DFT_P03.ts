/**
 * Builder for DFT^P03 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [PV1] [PV2] [{DB1}] [{OBX}] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] } [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DFT_P03_STRUCTURE } from "../../structures/v2.3.1/DFT_P03.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PD1 } from "../../segments/v2.3.1/PD1.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";
import type { PV2 } from "../../segments/v2.3.1/PV2.ts";
import type { DB1 } from "../../segments/v2.3.1/DB1.ts";
import type { OBX } from "../../segments/v2.3.1/OBX.ts";
import type { FT1 } from "../../segments/v2.3.1/FT1.ts";
import type { PR1 } from "../../segments/v2.3.1/PR1.ts";
import type { ROL } from "../../segments/v2.3.1/ROL.ts";
import type { DG1 } from "../../segments/v2.3.1/DG1.ts";
import type { DRG } from "../../segments/v2.3.1/DRG.ts";
import type { GT1 } from "../../segments/v2.3.1/GT1.ts";
import type { IN1 } from "../../segments/v2.3.1/IN1.ts";
import type { IN2 } from "../../segments/v2.3.1/IN2.ts";
import type { IN3 } from "../../segments/v2.3.1/IN3.ts";
import type { ACC } from "../../segments/v2.3.1/ACC.ts";

/** The FINANCIAL group of an DFT^P03 (HL7 v2.3.1) message being built. */
export interface DFTFinancialGroup {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  procedures?: DFTProcedureGroup[];
}

/** The FINANCIAL PROCEDURE group of an DFT^P03 (HL7 v2.3.1) message being built. */
export interface DFTProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of an DFT^P03 (HL7 v2.3.1) message being built. */
export interface DFTInsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
}

/** The optional segments and groups of an DFT^P03 (HL7 v2.3.1) message. */
export interface DFT_P03Options {
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: DFTInsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
}

/** Builder for HL7 DFT^P03 (HL7 v2.3.1) messages. */
export class DFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public financials: DFTFinancialGroup[],
    public options: DFT_P03Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, financials: this.financials };
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

/** Builds an HL7 DFT^P03 (HL7 v2.3.1) message. */
export function createDFT_P03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  financials: DFTFinancialGroup[],
  options: DFT_P03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P03<TMSH, TEVN, TPID> {
  return new DFT_P03(header, event, patient, financials, options, encoding);
}
