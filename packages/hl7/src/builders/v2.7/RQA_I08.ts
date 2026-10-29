/**
 * Builder for RQA^I08 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RQA_I08_STRUCTURE } from "../../structures/v2.7/RQA_I08.ts";
import type { MSH } from "../../segments/v2.7/MSH.ts";
import type { SFT } from "../../segments/v2.7/SFT.ts";
import type { UAC } from "../../segments/v2.7/UAC.ts";
import type { RF1 } from "../../segments/v2.7/RF1.ts";
import type { AUT } from "../../segments/v2.7/AUT.ts";
import type { CTD } from "../../segments/v2.7/CTD.ts";
import type { PRD } from "../../segments/v2.7/PRD.ts";
import type { PID } from "../../segments/v2.7/PID.ts";
import type { NK1 } from "../../segments/v2.7/NK1.ts";
import type { GT1 } from "../../segments/v2.7/GT1.ts";
import type { IN1 } from "../../segments/v2.7/IN1.ts";
import type { IN2 } from "../../segments/v2.7/IN2.ts";
import type { IN3 } from "../../segments/v2.7/IN3.ts";
import type { ACC } from "../../segments/v2.7/ACC.ts";
import type { DG1 } from "../../segments/v2.7/DG1.ts";
import type { DRG } from "../../segments/v2.7/DRG.ts";
import type { AL1 } from "../../segments/v2.7/AL1.ts";
import type { PR1 } from "../../segments/v2.7/PR1.ts";
import type { OBR } from "../../segments/v2.7/OBR.ts";
import type { NTE } from "../../segments/v2.7/NTE.ts";
import type { OBX } from "../../segments/v2.7/OBX.ts";
import type { PV1 } from "../../segments/v2.7/PV1.ts";
import type { PV2 } from "../../segments/v2.7/PV2.ts";

/** The AUTHORIZATION group of an RQA^I08 (HL7 v2.7) message being built. */
export interface Authorization1Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER group of an RQA^I08 (HL7 v2.7) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The GUARANTOR INSURANCE group of an RQA^I08 (HL7 v2.7) message being built. */
export interface GuarantorInsuranceGroup {
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances: InsuranceGroup[];
}

/** The INSURANCE group of an RQA^I08 (HL7 v2.7) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of an RQA^I08 (HL7 v2.7) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization2Group;
}

/** The AUTHORIZATION group of an RQA^I08 (HL7 v2.7) message being built. */
export interface Authorization2Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an RQA^I08 (HL7 v2.7) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ResultsGroup[];
}

/** The RESULTS group of an RQA^I08 (HL7 v2.7) message being built. */
export interface ResultsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of an RQA^I08 (HL7 v2.7) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an RQA^I08 (HL7 v2.7) message. */
export interface RQA_I08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization1Group;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GUARANTOR INSURANCE group. */
  guarantorInsurance?: GuarantorInsuranceGroup;
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RQA^I08 (HL7 v2.7) messages. */
export class RQA_I08<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQA_I08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RQA_I08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public providers: ProviderGroup[],
    public patient: TPID,
    public options: RQA_I08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, providers: this.providers, patient: this.patient };
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

/** Builds an HL7 RQA^I08 (HL7 v2.7) message. */
export function createRQA_I08<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: ProviderGroup[],
  patient: TPID,
  options: RQA_I08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQA_I08<TMSH, TPID> {
  return new RQA_I08(header, providers, patient, options, encoding);
}
