/**
 * Builder for BAR^P05 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] { VISIT: [PV1] [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2] [ABS] [{BLC}] [RMI] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P05_STRUCTURE } from "../../structures/v2.5/BAR_P05.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { SFT } from "../../segments/v2.5/SFT.ts";
import type { EVN } from "../../segments/v2.5/EVN.ts";
import type { PID } from "../../segments/v2.5/PID.ts";
import type { PD1 } from "../../segments/v2.5/PD1.ts";
import type { ROL } from "../../segments/v2.5/ROL.ts";
import type { PV1 } from "../../segments/v2.5/PV1.ts";
import type { PV2 } from "../../segments/v2.5/PV2.ts";
import type { DB1 } from "../../segments/v2.5/DB1.ts";
import type { OBX } from "../../segments/v2.5/OBX.ts";
import type { AL1 } from "../../segments/v2.5/AL1.ts";
import type { DG1 } from "../../segments/v2.5/DG1.ts";
import type { DRG } from "../../segments/v2.5/DRG.ts";
import type { PR1 } from "../../segments/v2.5/PR1.ts";
import type { GT1 } from "../../segments/v2.5/GT1.ts";
import type { NK1 } from "../../segments/v2.5/NK1.ts";
import type { IN1 } from "../../segments/v2.5/IN1.ts";
import type { IN2 } from "../../segments/v2.5/IN2.ts";
import type { IN3 } from "../../segments/v2.5/IN3.ts";
import type { ACC } from "../../segments/v2.5/ACC.ts";
import type { UB1 } from "../../segments/v2.5/UB1.ts";
import type { UB2 } from "../../segments/v2.5/UB2.ts";
import type { ABS } from "../../segments/v2.5/ABS.ts";
import type { BLC } from "../../segments/v2.5/BLC.ts";
import type { RMI } from "../../segments/v2.5/RMI.ts";

/** The VISIT group of an BAR^P05 (HL7 v2.5) message being built. */
export interface BARVisitGroup {
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
  /** The ROL segments. */
  visitRolList?: ROL[];
  /** The DB1 segments. */
  db1List?: DB1[];
  /** The OBX segments. */
  obxList?: OBX[];
  /** The AL1 segments. */
  al1List?: AL1[];
  /** The DG1 segments. */
  dg1List?: DG1[];
  /** The DRG segment. */
  drg?: DRG;
  /** The PROCEDURE groups. */
  procedures?: BARProcedureGroup[];
  /** The GT1 segments. */
  gt1List?: GT1[];
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The INSURANCE groups. */
  insurances?: BARInsuranceGroup[];
  /** The ACC segment. */
  acc?: ACC;
  /** The UB1 segment. */
  ub1?: UB1;
  /** The UB2 segment. */
  ub2?: UB2;
  /** The ABS segment. */
  abs?: ABS;
  /** The BLC segments. */
  blcList?: BLC[];
  /** The RMI segment. */
  rmi?: RMI;
}

/** The PROCEDURE group of an BAR^P05 (HL7 v2.5) message being built. */
export interface BARProcedureGroup {
  /** The PR1 segment. */
  pr1: PR1;
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The INSURANCE group of an BAR^P05 (HL7 v2.5) message being built. */
export interface BARInsuranceGroup {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segments. */
  in3List?: IN3[];
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The optional segments and groups of an BAR^P05 (HL7 v2.5) message. */
export interface BAR_P05Options {
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PD1 segment. */
  pd1?: PD1;
  /** The ROL segments. */
  rolList?: ROL[];
}

/** Builder for HL7 BAR^P05 (HL7 v2.5) messages. */
export class BAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P05";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P05_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public visits: BARVisitGroup[],
    public options: BAR_P05Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, msh: this.msh, evn: this.evn, pid: this.pid, visits: this.visits };
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

/** Builds an HL7 BAR^P05 (HL7 v2.5) message. */
export function createBAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  visits: BARVisitGroup[],
  options: BAR_P05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P05<TMSH, TEVN, TPID> {
  return new BAR_P05(msh, evn, pid, visits, options, encoding);
}
