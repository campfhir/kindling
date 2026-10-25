/**
 * Builder for PPG^PCG messages (HL7 v2.3.1).
 *
 * Structure: MSH PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PPG_PCG_STRUCTURE } from "../../structures/v2.3.1/PPG_PCG.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";
import type { PV2 } from "../../segments/v2.3.1/PV2.ts";
import type { PTH } from "../../segments/v2.3.1/PTH.ts";
import type { NTE } from "../../segments/v2.3.1/NTE.ts";
import type { VAR } from "../../segments/v2.3.1/VAR.ts";
import type { ROL } from "../../segments/v2.3.1/ROL.ts";
import type { GOL } from "../../segments/v2.3.1/GOL.ts";
import type { OBX } from "../../segments/v2.3.1/OBX.ts";
import type { PRB } from "../../segments/v2.3.1/PRB.ts";
import type { ORC } from "../../segments/v2.3.1/ORC.ts";
import type { OBR } from "../../segments/v2.3.1/OBR.ts";
import type { RQD } from "../../segments/v2.3.1/RQD.ts";
import type { RQ1 } from "../../segments/v2.3.1/RQ1.ts";
import type { RXO } from "../../segments/v2.3.1/RXO.ts";
import type { ODS } from "../../segments/v2.3.1/ODS.ts";
import type { ODT } from "../../segments/v2.3.1/ODT.ts";

/** The PATHWAY group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface Pathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PATHWAY ROLE groups. */
  roles?: PathwayRole[];
  /** The GOAL groups. */
  goals?: Goal[];
}

/** The PATHWAY ROLE group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface PathwayRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface Goal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  roles?: GoalRole[];
  /** The GOAL OBSERVATION groups. */
  observations?: GoalObservation[];
  /** The PROBLEM groups. */
  problems?: Problem[];
  /** The ORDER groups. */
  orders?: CareOrder[];
}

/** The GOAL ROLE group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface GoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface GoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface Problem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ProblemRole[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ProblemObservation[];
}

/** The PROBLEM ROLE group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface ProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface ProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface CareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface OrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  observations?: OrderObservation[];
}

/** The ORDER OBSERVATION group of an PPG^PCG (HL7 v2.3.1) message being built. */
export interface OrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPG^PCG (HL7 v2.3.1) message. */
export interface PPG_PCGOptions {
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** Builder for HL7 PPG^PCG (HL7 v2.3.1) messages. */
export class PPG_PCG<TMSH extends MSH = MSH, TPID extends PID = PID> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPG_PCG";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PPG_PCG_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public patient: TPID,
    public pathways: Pathway[],
    public options: PPG_PCGOptions = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, patient: this.patient, pathways: this.pathways };
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

/** Builds an HL7 PPG^PCG (HL7 v2.3.1) message. */
export function createPPG_PCG<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  patient: TPID,
  pathways: Pathway[],
  options: PPG_PCGOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPG_PCG<TMSH, TPID> {
  return new PPG_PCG(header, patient, pathways, options, encoding);
}
