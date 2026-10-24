/**
 * Builder for BAR^P01 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { BAR_P01_STRUCTURE } from "../../structures/v2.3/BAR_P01.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PD1 } from "../../segments/v2.3/PD1.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { DB1 } from "../../segments/v2.3/DB1.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { AL1 } from "../../segments/v2.3/AL1.ts";
import type { DG1 } from "../../segments/v2.3/DG1.ts";
import type { DRG } from "../../segments/v2.3/DRG.ts";
import type { PR1 } from "../../segments/v2.3/PR1.ts";
import type { ROL } from "../../segments/v2.3/ROL.ts";
import type { GT1 } from "../../segments/v2.3/GT1.ts";
import type { NK1 } from "../../segments/v2.3/NK1.ts";
import type { IN1 } from "../../segments/v2.3/IN1.ts";
import type { IN2 } from "../../segments/v2.3/IN2.ts";
import type { IN3 } from "../../segments/v2.3/IN3.ts";
import type { ACC } from "../../segments/v2.3/ACC.ts";
import type { UB1 } from "../../segments/v2.3/UB1.ts";
import type { UB2 } from "../../segments/v2.3/UB2.ts";

/** The VISIT group of an BAR^P01 (HL7 v2.3) message being built. */
export interface BARVisitGroup {
  /** The PV1 segment. */
  pv1?: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
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
}

/** The PROCEDURE group of an BAR^P01 (HL7 v2.3) message being built. */
export interface BARProcedureGroup {
  /** The PR1 segment. */
  pr1: PR1;
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The INSURANCE group of an BAR^P01 (HL7 v2.3) message being built. */
export interface BARInsuranceGroup {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segment. */
  in3?: IN3;
}

/** The optional segments and groups of an BAR^P01 (HL7 v2.3) message. */
export interface BAR_P01Options {
  /** The PD1 segment. */
  pd1?: PD1;
}

/** Builder for HL7 BAR^P01 (HL7 v2.3) messages. */
export class BAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;

  /** Constructor. */
  constructor(
    public msh: TMSH,
    public evn: TEVN,
    public pid: TPID,
    public visits: BARVisitGroup[],
    public options: BAR_P01Options = {},
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

/** Builds an HL7 BAR^P01 (HL7 v2.3) message. */
export function createBAR_P01<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  msh: TMSH,
  evn: TEVN,
  pid: TPID,
  visits: BARVisitGroup[],
  options: BAR_P01Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P01<TMSH, TEVN, TPID> {
  return new BAR_P01(msh, evn, pid, visits, options, encoding);
}
