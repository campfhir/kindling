/**
 * Builder for BAR^P01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ROL}] { VISIT: PV1 [PV2] [{PRT}] [{ROL}] [{DB1}] [{OBX}] [{PRT}] [{AL1}] [{ DIAGNOSIS: DG1 }] [DRG] [{ PROCEDURE: PR1 [{PRT}] [{ROL}] }] [{GT1}] [{GSP}] [{GSR}] [{NK1}] [{GSP}] [{GSR}] [{ INSURANCE: IN1 [{GSP}] [{GSR}] [IN2] [{IN3}] [{PRT}] [{ROL}] }] [ACC] [UB1] [UB2] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P01_STRUCTURE } from "../../structures/v2.9.1/BAR_P01.ts";
import type { MSH } from "../../segments/v2.9.1/MSH.ts";
import type { SFT } from "../../segments/v2.9.1/SFT.ts";
import type { UAC } from "../../segments/v2.9.1/UAC.ts";
import type { EVN } from "../../segments/v2.9.1/EVN.ts";
import type { PID } from "../../segments/v2.9.1/PID.ts";
import type { PD1 } from "../../segments/v2.9.1/PD1.ts";
import type { GSP } from "../../segments/v2.9.1/GSP.ts";
import type { GSR } from "../../segments/v2.9.1/GSR.ts";
import type { GSC } from "../../segments/v2.9.1/GSC.ts";
import type { PRT } from "../../segments/v2.9.1/PRT.ts";
import type { ROL } from "../../segments/v2.9.1/ROL.ts";
import type { PV1 } from "../../segments/v2.9.1/PV1.ts";
import type { PV2 } from "../../segments/v2.9.1/PV2.ts";
import type { DB1 } from "../../segments/v2.9.1/DB1.ts";
import type { OBX } from "../../segments/v2.9.1/OBX.ts";
import type { AL1 } from "../../segments/v2.9.1/AL1.ts";
import type { DG1 } from "../../segments/v2.9.1/DG1.ts";
import type { DRG } from "../../segments/v2.9.1/DRG.ts";
import type { PR1 } from "../../segments/v2.9.1/PR1.ts";
import type { GT1 } from "../../segments/v2.9.1/GT1.ts";
import type { NK1 } from "../../segments/v2.9.1/NK1.ts";
import type { IN1 } from "../../segments/v2.9.1/IN1.ts";
import type { IN2 } from "../../segments/v2.9.1/IN2.ts";
import type { IN3 } from "../../segments/v2.9.1/IN3.ts";
import type { ACC } from "../../segments/v2.9.1/ACC.ts";
import type { UB1 } from "../../segments/v2.9.1/UB1.ts";
import type { UB2 } from "../../segments/v2.9.1/UB2.ts";

/** The VISIT group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface VisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PRT segments. */
  prt2?: PRT[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DIAGNOSIS groups. */
  diagnosis?: DiagnosisGroup[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gsp2?: GSP[];
  /** The GSR segments. */
  gsr2?: GSR[];
  /** The INSURANCE groups. */
  insurances?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The UB1 segment. */
  ub82?: UB1;
  /** The UB2 segment. */
  ub92?: UB2;
}

/** The DIAGNOSIS group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface DiagnosisGroup {
  /** The DG1 segment. */
  diagnosis: DG1;
}

/** The PROCEDURE group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of an BAR^P01 (HL7 v2.9.1) message being built. */
export interface InsuranceGroup {
  /** The IN1 segment. */
  insurance: IN1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segments. */
  insuranceCertifications?: IN3[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The optional segments and groups of an BAR^P01 (HL7 v2.9.1) message. */
export interface BAR_P01Options {
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
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** Builder for HL7 BAR^P01 (HL7 v2.9.1) messages. */
export class BAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visits: VisitGroup[],
    public options: BAR_P01Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, event: this.event, patient: this.patient, visits: this.visits };
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

/** Builds an HL7 BAR^P01 (HL7 v2.9.1) message. */
export function createBAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visits: VisitGroup[],
  options: BAR_P01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P01<TMSH, TEVN, TPID> {
  return new BAR_P01(header, event, patient, visits, options, encoding);
}
