/**
 * Builder for PRR^PC5 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_PATHWAY: PTH [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PRR_PC5_STRUCTURE } from "../../structures/v2.3/PRR_PC5.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { MSA } from "../../segments/v2.3/MSA.ts";
import type { ERR } from "../../segments/v2.3/ERR.ts";
import type { QRD } from "../../segments/v2.3/QRD.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";
import type { PV2 } from "../../segments/v2.3/PV2.ts";
import type { PRB } from "../../segments/v2.3/PRB.ts";
import type { NTE } from "../../segments/v2.3/NTE.ts";
import type { VAR } from "../../segments/v2.3/VAR.ts";
import type { ROL } from "../../segments/v2.3/ROL.ts";
import type { PTH } from "../../segments/v2.3/PTH.ts";
import type { OBX } from "../../segments/v2.3/OBX.ts";
import type { GOL } from "../../segments/v2.3/GOL.ts";
import type { ORC } from "../../segments/v2.3/ORC.ts";
import type { OBR } from "../../segments/v2.3/OBR.ts";
import type { RQD } from "../../segments/v2.3/RQD.ts";
import type { RQ1 } from "../../segments/v2.3/RQ1.ts";
import type { RXO } from "../../segments/v2.3/RXO.ts";
import type { ODS } from "../../segments/v2.3/ODS.ts";
import type { ODT } from "../../segments/v2.3/ODT.ts";

/** The PATIENT group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface CarePatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PROBLEM groups. */
  problems: Problem[];
}

/** The PROBLEM group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface Problem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ProblemRole[];
  /** The PROBLEM PATHWAY groups. */
  pathways?: ProblemPathway[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ProblemObservation[];
  /** The GOAL groups. */
  goals?: Goal[];
  /** The ORDER groups. */
  orders?: CareOrder[];
}

/** The PROBLEM ROLE group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface ProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM PATHWAY group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface ProblemPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface ProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The GOAL group of an PRR^PC5 (HL7 v2.3) message being built. */
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
}

/** The GOAL ROLE group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface GoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface GoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface CareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an PRR^PC5 (HL7 v2.3) message being built. */
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

/** The ORDER OBSERVATION group of an PRR^PC5 (HL7 v2.3) message being built. */
export interface OrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PRR^PC5 (HL7 v2.3) message. */
export interface PRR_PC5Options {
  /** The ERR segment. */
  error?: ERR;
}

/** Builder for HL7 PRR^PC5 (HL7 v2.3) messages. */
export class PRR_PC5<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PRR_PC5";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PRR_PC5_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patients: CarePatient[],
    public options: PRR_PC5Options = {},
    protected encoding: EncodingCharacters = DEFAULT_ENCODING,
  ) {}

  /** The message as one object keyed by structure property name (what verify() and encode() work on). */
  toInput(): StructureInput {
    return { ...this.options, header: this.header, acknowledgment: this.acknowledgment, query: this.query, patients: this.patients };
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

/** Builds an HL7 PRR^PC5 (HL7 v2.3) message. */
export function createPRR_PC5<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: CarePatient[],
  options: PRR_PC5Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PRR_PC5<TMSH, TMSA, TQRD> {
  return new PRR_PC5(header, acknowledgment, query, patients, options, encoding);
}
