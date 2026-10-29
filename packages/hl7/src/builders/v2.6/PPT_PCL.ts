/**
 * Builder for PPT^PCL messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PPT_PCL_STRUCTURE } from "../../structures/v2.6/PPT_PCL.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { SFT } from "../../segments/v2.6/SFT.ts";
import type { UAC } from "../../segments/v2.6/UAC.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { ERR } from "../../segments/v2.6/ERR.ts";
import type { QAK } from "../../segments/v2.6/QAK.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { PID } from "../../segments/v2.6/PID.ts";
import type { PV1 } from "../../segments/v2.6/PV1.ts";
import type { PV2 } from "../../segments/v2.6/PV2.ts";
import type { PTH } from "../../segments/v2.6/PTH.ts";
import type { NTE } from "../../segments/v2.6/NTE.ts";
import type { VAR } from "../../segments/v2.6/VAR.ts";
import type { ROL } from "../../segments/v2.6/ROL.ts";
import type { GOL } from "../../segments/v2.6/GOL.ts";
import type { OBX } from "../../segments/v2.6/OBX.ts";
import type { PRB } from "../../segments/v2.6/PRB.ts";
import type { ORC } from "../../segments/v2.6/ORC.ts";
import type { OBR } from "../../segments/v2.6/OBR.ts";
import type { RQD } from "../../segments/v2.6/RQD.ts";
import type { RQ1 } from "../../segments/v2.6/RQ1.ts";
import type { RXO } from "../../segments/v2.6/RXO.ts";
import type { ODS } from "../../segments/v2.6/ODS.ts";
import type { ODT } from "../../segments/v2.6/ODT.ts";

/** The PATIENT group of an PPT^PCL (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The PATHWAY groups. */
  pathways: PathwayGroup[];
}

/** The PATIENT VISIT group of an PPT^PCL (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The PATHWAY group of an PPT^PCL (HL7 v2.6) message being built. */
export interface PathwayGroup {
  /** The PTH segment. */
  pathway: PTH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PATHWAY ROLE groups. */
  pathwayRoles?: PathwayRoleGroup[];
  /** The GOAL groups. */
  goals?: GoalGroup[];
}

/** The PATHWAY ROLE group of an PPT^PCL (HL7 v2.6) message being built. */
export interface PathwayRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of an PPT^PCL (HL7 v2.6) message being built. */
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
  /** The PROBLEM groups. */
  problems?: ProblemGroup[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The GOAL ROLE group of an PPT^PCL (HL7 v2.6) message being built. */
export interface GoalRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPT^PCL (HL7 v2.6) message being built. */
export interface GoalObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of an PPT^PCL (HL7 v2.6) message being built. */
export interface ProblemGroup {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  problemRoles?: ProblemRoleGroup[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ProblemObservationGroup[];
}

/** The PROBLEM ROLE group of an PPT^PCL (HL7 v2.6) message being built. */
export interface ProblemRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPT^PCL (HL7 v2.6) message being built. */
export interface ProblemObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPT^PCL (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
}

/** The ORDER DETAIL group of an PPT^PCL (HL7 v2.6) message being built. */
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

/** The ORDER OBSERVATION group of an PPT^PCL (HL7 v2.6) message being built. */
export interface OrderObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPT^PCL (HL7 v2.6) message. */
export interface PPT_PCLOptions {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 PPT^PCL (HL7 v2.6) messages. */
export class PPT_PCL<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPT_PCL";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PPT_PCL_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patients: PatientGroup[],
    public options: PPT_PCLOptions = {},
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

/** Builds an HL7 PPT^PCL (HL7 v2.6) message. */
export function createPPT_PCL<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: PatientGroup[],
  options: PPT_PCLOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPT_PCL<TMSH, TMSA, TQRD> {
  return new PPT_PCL(header, acknowledgment, query, patients, options, encoding);
}
