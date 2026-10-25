/**
 * Builder for PPT^PCL messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { StructureItem } from "../../types/schema.ts";
import { encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { PPT_PCL_STRUCTURE } from "../../structures/v2.4/PPT_PCL.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { ERR } from "../../segments/v2.4/ERR.ts";
import type { QAK } from "../../segments/v2.4/QAK.ts";
import type { QRD } from "../../segments/v2.4/QRD.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { PV2 } from "../../segments/v2.4/PV2.ts";
import type { PTH } from "../../segments/v2.4/PTH.ts";
import type { NTE } from "../../segments/v2.4/NTE.ts";
import type { VAR } from "../../segments/v2.4/VAR.ts";
import type { ROL } from "../../segments/v2.4/ROL.ts";
import type { GOL } from "../../segments/v2.4/GOL.ts";
import type { OBX } from "../../segments/v2.4/OBX.ts";
import type { PRB } from "../../segments/v2.4/PRB.ts";
import type { ORC } from "../../segments/v2.4/ORC.ts";
import type { OBR } from "../../segments/v2.4/OBR.ts";
import type { RQD } from "../../segments/v2.4/RQD.ts";
import type { RQ1 } from "../../segments/v2.4/RQ1.ts";
import type { RXO } from "../../segments/v2.4/RXO.ts";
import type { ODS } from "../../segments/v2.4/ODS.ts";
import type { ODT } from "../../segments/v2.4/ODT.ts";

/** The PATIENT group of an PPT^PCL (HL7 v2.4) message being built. */
export interface CarePatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PATHWAY groups. */
  pathways: Pathway[];
}

/** The PATHWAY group of an PPT^PCL (HL7 v2.4) message being built. */
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

/** The PATHWAY ROLE group of an PPT^PCL (HL7 v2.4) message being built. */
export interface PathwayRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of an PPT^PCL (HL7 v2.4) message being built. */
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

/** The GOAL ROLE group of an PPT^PCL (HL7 v2.4) message being built. */
export interface GoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPT^PCL (HL7 v2.4) message being built. */
export interface GoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of an PPT^PCL (HL7 v2.4) message being built. */
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

/** The PROBLEM ROLE group of an PPT^PCL (HL7 v2.4) message being built. */
export interface ProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPT^PCL (HL7 v2.4) message being built. */
export interface ProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPT^PCL (HL7 v2.4) message being built. */
export interface CareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an PPT^PCL (HL7 v2.4) message being built. */
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

/** The ORDER OBSERVATION group of an PPT^PCL (HL7 v2.4) message being built. */
export interface OrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPT^PCL (HL7 v2.4) message. */
export interface PPT_PCLOptions {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 PPT^PCL (HL7 v2.4) messages. */
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
    public patients: CarePatient[],
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

/** Builds an HL7 PPT^PCL (HL7 v2.4) message. */
export function createPPT_PCL<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: CarePatient[],
  options: PPT_PCLOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPT_PCL<TMSH, TMSA, TQRD> {
  return new PPT_PCL(header, acknowledgment, query, patients, options, encoding);
}
