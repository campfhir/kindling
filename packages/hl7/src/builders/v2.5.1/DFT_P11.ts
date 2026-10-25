/**
 * Builder for DFT^P11 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [PV1] [PV2] [{ROL}] [{DB1}] [{ COMMON_ORDER: [ORC] [{ TIMING_QUANTITY: TQ1 [{TQ2}] }] [ ORDER: OBR [{NTE}] ] [{ OBSERVATION: OBX [{NTE}] }] }] [{DG1}] [DRG] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] { FINANCIAL: FT1 [{ FINANCIAL_PROCEDURE: PR1 [{ROL}] }] [{ FINANCIAL_COMMON_ORDER: [ORC] [{ FINANCIAL_TIMING_QUANTITY: TQ1 [{TQ2}] }] [ FINANCIAL_ORDER: OBR [{NTE}] ] [{ FINANCIAL_OBSERVATION: OBX [{NTE}] }] }] [{DG1}] [DRG] [{GT1}] [{ FINANCIAL_INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { DFT_P11_STRUCTURE } from "../../structures/v2.5.1/DFT_P11.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { ROL } from "../../segments/v2.5.1/ROL.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { DB1 } from "../../segments/v2.5.1/DB1.ts";
import type { ORC } from "../../segments/v2.5.1/ORC.ts";
import type { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import type { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import type { OBR } from "../../segments/v2.5.1/OBR.ts";
import type { NTE } from "../../segments/v2.5.1/NTE.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { DG1 } from "../../segments/v2.5.1/DG1.ts";
import type { DRG } from "../../segments/v2.5.1/DRG.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { IN1 } from "../../segments/v2.5.1/IN1.ts";
import type { IN2 } from "../../segments/v2.5.1/IN2.ts";
import type { IN3 } from "../../segments/v2.5.1/IN3.ts";
import type { ACC } from "../../segments/v2.5.1/ACC.ts";
import type { FT1 } from "../../segments/v2.5.1/FT1.ts";
import type { PR1 } from "../../segments/v2.5.1/PR1.ts";

/** The COMMON ORDER group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface CommonOrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The TIMING QUANTITY groups. */
  timingQuantitys?: TimingQuantityGroup[];
  /** The ORDER group. */
  order?: OrderGroup;
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
}

/** The TIMING QUANTITY group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface TimingQuantityGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface OrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The OBSERVATION group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The INSURANCE group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialGroup {
  /** The FT1 segment. */
  transaction: FT1;
  /** The FINANCIAL PROCEDURE groups. */
  financialProcedures?: FinancialProcedureGroup[];
  /** The FINANCIAL COMMON ORDER groups. */
  financialCommonOrders?: FinancialCommonOrderGroup[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The FINANCIAL INSURANCE groups. */
  financialInsurances?: FinancialInsuranceGroup[];
}

/** The FINANCIAL PROCEDURE group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The FINANCIAL COMMON ORDER group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialCommonOrderGroup {
  /** The ORC segment. */
  commonOrder?: ORC;
  /** The FINANCIAL TIMING QUANTITY groups. */
  financialTimingQuantitys?: FinancialTimingQuantityGroup[];
  /** The FINANCIAL ORDER group. */
  financialOrder?: FinancialOrderGroup;
  /** The FINANCIAL OBSERVATION groups. */
  financialObservations?: FinancialObservationGroup[];
}

/** The FINANCIAL TIMING QUANTITY group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialTimingQuantityGroup {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The FINANCIAL ORDER group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialOrderGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL OBSERVATION group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The FINANCIAL INSURANCE group of an DFT^P11 (HL7 v2.5.1) message being built. */
export interface FinancialInsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an DFT^P11 (HL7 v2.5.1) message. */
export interface DFT_P11Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  visitRoles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The COMMON ORDER groups. */
  commonOrders?: CommonOrderGroup[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
}

/** Builder for HL7 DFT^P11 (HL7 v2.5.1) messages. */
export class DFT_P11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DFT_P11";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = DFT_P11_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public financials: FinancialGroup[],
    public options: DFT_P11Options = {},
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

/** Builds an HL7 DFT^P11 (HL7 v2.5.1) message. */
export function createDFT_P11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  financials: FinancialGroup[],
  options: DFT_P11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): DFT_P11<TMSH, TEVN, TPID> {
  return new DFT_P11(header, event, patient, financials, options, encoding);
}
