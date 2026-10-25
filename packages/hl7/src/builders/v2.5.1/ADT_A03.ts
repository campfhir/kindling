/**
 * Builder for ADT^A03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{OBX}] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { ADT_A03_STRUCTURE } from "../../structures/v2.5.1/ADT_A03.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { SFT } from "../../segments/v2.5.1/SFT.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PD1 } from "../../segments/v2.5.1/PD1.ts";
import type { ROL } from "../../segments/v2.5.1/ROL.ts";
import type { NK1 } from "../../segments/v2.5.1/NK1.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { PV2 } from "../../segments/v2.5.1/PV2.ts";
import type { DB1 } from "../../segments/v2.5.1/DB1.ts";
import type { AL1 } from "../../segments/v2.5.1/AL1.ts";
import type { DG1 } from "../../segments/v2.5.1/DG1.ts";
import type { DRG } from "../../segments/v2.5.1/DRG.ts";
import type { PR1 } from "../../segments/v2.5.1/PR1.ts";
import type { OBX } from "../../segments/v2.5.1/OBX.ts";
import type { GT1 } from "../../segments/v2.5.1/GT1.ts";
import type { IN1 } from "../../segments/v2.5.1/IN1.ts";
import type { IN2 } from "../../segments/v2.5.1/IN2.ts";
import type { IN3 } from "../../segments/v2.5.1/IN3.ts";
import type { ACC } from "../../segments/v2.5.1/ACC.ts";
import type { PDA } from "../../segments/v2.5.1/PDA.ts";

/** The PROCEDURE group of an ADT^A03 (HL7 v2.5.1) message being built. */
export interface ProcedureGroup {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** The INSURANCE group of an ADT^A03 (HL7 v2.5.1) message being built. */
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

/** The optional segments and groups of an ADT^A03 (HL7 v2.5.1) message. */
export interface ADT_A03Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  visitRoles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ProcedureGroup[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insuranceGroups?: InsuranceGroup[];
  /** The ACC segment. */
  accident?: ACC;
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** Builder for HL7 ADT^A03 (HL7 v2.5.1) messages. */
export class ADT_A03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A03";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = ADT_A03_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public event: TEVN,
    public patient: TPID,
    public visit: TPV1,
    public options: ADT_A03Options = {},
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

/** Builds an HL7 ADT^A03 (HL7 v2.5.1) message. */
export function createADT_A03<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A03Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A03<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A03(header, event, patient, visit, options, encoding);
}
