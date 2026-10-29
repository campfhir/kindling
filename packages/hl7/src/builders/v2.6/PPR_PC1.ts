/**
 * Builder for PPR^PC1 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PPR_PC1_STRUCTURE } from "../../structures/v2.6/PPR_PC1.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { PRB } from "../../segments/v2.6/PRB.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { VAR } from "../../segments/v2.6/VAR.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { PTH } from "../../segments/v2.6/PTH.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { GOL } from "../../segments/v2.6/GOL.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { RQD } from "../../segments/v2.6/RQD.ts";
import type { RQ1 } from "../../segments/v2.6/RQ1.ts";
import type { RXO } from "../../segments/v2.6/RXO.ts";
import type { ODS } from "../../segments/v2.6/ODS.ts";
import type { ODT } from "../../segments/v2.6/ODT.ts";

/** The PATIENT VISIT group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The PROBLEM group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface ProblemGroup {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  problemRoles?: ProblemRoleGroup[];
  /** The PATHWAY groups. */
  pathways?: PathwayGroup[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ProblemObservationGroup[];
  /** The GOAL groups. */
  goals?: GoalGroup[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The PROBLEM ROLE group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface ProblemRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PATHWAY group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface PathwayGroup {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface ProblemObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GOAL group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface GoalGroup {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  goalRoles?: GoalRoleGroup[];
  /** The GOAL OBSERVATION groups. */
  goalObservations?: GoalObservationGroup[];
}

/** The GOAL ROLE group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface GoalRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface GoalObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
}

/** The ORDER DETAIL group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface OrderDetailGroup {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  orderObservations?: OrderObservationGroup[];
}

/** The ORDER OBSERVATION group of an PPR^PC1 (HL7 v2.6) message being built. */
export interface OrderObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPR^PC1 (HL7 v2.6) message. */
export interface PPR_PC1Options {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
}

/** Builder for HL7 PPR^PC1 (HL7 v2.6) messages. */
export class PPR_PC1<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPR_PC1";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PPR_PC1_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public problems: ProblemGroup[],
    public options: PPR_PC1Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient, problems: this.problems };
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

/** Builds an HL7 PPR^PC1 (HL7 v2.6) message. */
export function createPPR_PC1<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  problems: ProblemGroup[],
  options: PPR_PC1Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPR_PC1<TMSH, TPID> {
  return new PPR_PC1(header, patient, problems, options, encoding);
}
