/**
 * Builder for ADT^A05 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{ARV}] [{ROL}] [{PRT}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] PV1 [PV2] [{ARV}] [{ROL}] [{PRT}] [{DB1}] [{ OBSERVATION: OBX [{PRT}] }] [{AL1}] [{IAM}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] [{PRT}] }] [{ GUARANTOR: GT1 [{GSP}] [{GSR}] }] [{ INSURANCE: IN1 [IN2] [{IN3}] [{GSP}] [{GSR}] [{ROL}] [{PRT}] [{ AUTHORIZATION: AUT [{PRT}] }] [{ REFERRAL: RF1 [{PRT}] }] }] [ACC] [UB1] [UB2]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A05_STRUCTURE } from "../../structures/v2.9.1/ADT_A05.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { ARV } from "../../segments/v2.9.1/ARV.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { OH1 } from "../../segments/v2.9.1/OH1.ts";
import type { OH2 } from "../../segments/v2.9.1/OH2.ts";
import type { OH3 } from "../../segments/v2.9.1/OH3.ts";
import type { OH4 } from "../../segments/v2.9.1/OH4.ts";
import type { ROL } from "../../segments/v2.9.1/ROL.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { DB1 } from "../../segments/v2.9.1/DB1.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { IAM } from "../../segments/v2.9.1/IAM.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { DRG } from "../../segments/v2.9.1/DRG.ts";
import type { PR1 } from "../../segments/v2.9.1/PR1.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { AUT } from "../../segments/v2.9.1/AUT.ts";
import type { RF1 } from "../../segments/v2.9.1/RF1.ts";
import type { ACC } from "../../segments/v2.9.1/ACC.ts";
import type { UB1 } from "../../segments/v2.9.1/UB1.ts";
import type { UB2 } from "../../segments/v2.9.1/UB2.ts";

/** The NEXT OF KIN group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface NextOfKinGroup {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
}

/** The OBSERVATION group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface ObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The PROCEDURE group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The GUARANTOR group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface GuarantorGroup {
  /** The GT1 segment. */
  guarantor: GT1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** The INSURANCE group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The AUTHORIZATION groups. */
  authorizations?: AuthorizationGroup[];
  /** The REFERRAL groups. */
  referrals?: ReferralGroup[];
}

/** The AUTHORIZATION group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface AuthorizationGroup {
  /** The AUT segment. */
  authorization: AUT;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The REFERRAL group of an ADT^A05 (HL7 v2.9.1) message being built. */
export interface ReferralGroup {
  /** The RF1 segment. */
  referral: RF1;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The optional segments and groups of an ADT^A05 (HL7 v2.9.1) message. */
export interface ADT_A05Options {
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The OH1 segments. */
  oh1List?: OH1[];
  /** The OH2 segments. */
  oh2List?: OH2[];
  /** The OH3 segment. */
  oh3?: OH3;
  /** The OH4 segments. */
  oh4List?: OH4[];
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: NextOfKinGroup[];
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ARV segments. */
  arv3?: ARV[];
  /** The ROL segments. */
  rol2?: ROL[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBSERVATION groups. */
  observations?: ObservationGroup[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The IAM segments. */
  adverseReactions?: IAM[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The GUARANTOR groups. */
  guarantors?: GuarantorGroup[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** Builder for HL7 ADT^A05 (HL7 v2.9.1) messages. */
export class ADT_A05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A05_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visit: this.visit };
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

/** Builds an HL7 ADT^A05 (HL7 v2.9.1) message. */
export function createADT_A05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A05<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A05(header, event, patient, visit, options, encoding);
}
