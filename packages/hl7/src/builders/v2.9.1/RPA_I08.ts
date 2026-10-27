/**
 * Builder for RPA^I08 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{PRT}] [{NTE}] [{ RESULTS: OBX [{PRT}] [{NTE}] }] }] [ VISIT: PV1 [PV2] ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { RPA_I08_STRUCTURE } from "../../structures/v2.9.1/RPA_I08.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { MSA } from "../../segments/v2.9.1/MSA.ts";
import type { RF1 } from "../../segments/v2.9.1/RF1.ts";
import type { AUT } from "../../segments/v2.9.1/AUT.ts";
import type { CTD } from "../../segments/v2.9.1/CTD.ts";
import type { PRD } from "../../segments/v2.9.1/PRD.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { ACC } from "../../segments/v2.9.1/ACC.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { DRG } from "../../segments/v2.9.1/DRG.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { PR1 } from "../../segments/v2.9.1/PR1.ts";
import type { OBR } from "../../segments/v2.9.1/OBR.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { NTE } from "../../segments/v2.9.1/NTE.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";

/** The AUTHORIZATION group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface Authorization1Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The PROVIDER group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface ProviderGroup {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The NEXT OF KIN group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The INSURANCE group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** The PROCEDURE group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization2Group;
}

/** The AUTHORIZATION group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface Authorization2Group {
  /** The AUT segment. */
  authorization: AUT;
  /** The CTD segment. */
  contact?: CTD;
}

/** The OBSERVATION group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBR segment. */
  observationRequest: OBR;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESULTS groups. */
  results?: ResultsGroup[];
}

/** The RESULTS group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface ResultsGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The VISIT group of an RPA^I08 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The optional segments and groups of an RPA^I08 (HL7 v2.9.1) message. */
export interface RPA_I08Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The RF1 segment. */
  referral?: RF1;
  /** The AUTHORIZATION group. */
  authorization?: Authorization1Group;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segments. */
  diagnosisRelatedGroups?: DRG[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The VISIT group. */
  visit?: VisitGroup;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Builder for HL7 RPA^I08 (HL7 v2.9.1) messages. */
export class RPA_I08<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPA_I08";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = RPA_I08_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public providers: ProviderGroup[],
    public patient: TPID,
    public procedures: ProcedureGroup[],
    public options: RPA_I08Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, providers: this.providers, patient: this.patient, procedures: this.procedures };
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

/** Builds an HL7 RPA^I08 (HL7 v2.9.1) message. */
export function createRPA_I08<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: ProviderGroup[],
  patient: TPID,
  procedures: ProcedureGroup[],
  options: RPA_I08Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPA_I08<TMSH, TMSA, TPID> {
  return new RPA_I08(header, acknowledgment, providers, patient, procedures, options, encoding);
}
