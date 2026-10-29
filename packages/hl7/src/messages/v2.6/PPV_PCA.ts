/**
 * Builder, parser and structure for PPV^PCA messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_PATHWAY: PTH [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../../types/schema.ts";
import type { Result } from "../../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../../types/structure.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { QAK } from "../../segments/v2.6/QAK.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PV1 } from "../../segments/v2.6/PV1.ts";
import { PV2 } from "../../segments/v2.6/PV2.ts";
import { GOL } from "../../segments/v2.6/GOL.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { VAR } from "../../segments/v2.6/VAR.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { PTH } from "../../segments/v2.6/PTH.ts";
import { OBX } from "../../segments/v2.6/OBX.ts";
import { PRB } from "../../segments/v2.6/PRB.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { RQD } from "../../segments/v2.6/RQD.ts";
import { RQ1 } from "../../segments/v2.6/RQ1.ts";
import { RXO } from "../../segments/v2.6/RXO.ts";
import { ODS } from "../../segments/v2.6/ODS.ts";
import { ODT } from "../../segments/v2.6/ODT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";

/** The segments, choices and groups of PPV^PCA (HL7 v2.6), in order. */
export const PPV_PCA_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "SFT", required: false, repeating: true },
  { name: "UAC", required: false, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: true },
  { name: "QAK", required: false, repeating: false },
  { name: "QRD", required: true, repeating: false },
  {
    name: "PATIENT",
    required: true,
    repeating: true,
    segments: [
      { name: "PID", required: true, repeating: false },
      {
        name: "PATIENT_VISIT",
        required: false,
        repeating: false,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
      {
        name: "GOAL",
        required: true,
        repeating: true,
        segments: [
          { name: "GOL", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "VAR", required: false, repeating: true },
          {
            name: "GOAL_ROLE",
            required: false,
            repeating: true,
            segments: [
              { name: "ROL", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL_PATHWAY",
            required: false,
            repeating: true,
            segments: [
              { name: "PTH", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL_OBSERVATION",
            required: false,
            repeating: true,
            segments: [
              { name: "OBX", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
            ],
          },
          {
            name: "PROBLEM",
            required: false,
            repeating: true,
            segments: [
              { name: "PRB", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
              { name: "VAR", required: false, repeating: true },
              {
                name: "PROBLEM_ROLE",
                required: false,
                repeating: true,
                segments: [
                  { name: "ROL", required: true, repeating: false },
                  { name: "VAR", required: false, repeating: true },
                ],
              },
              {
                name: "PROBLEM_OBSERVATION",
                required: false,
                repeating: true,
                segments: [
                  { name: "OBX", required: true, repeating: false },
                  { name: "NTE", required: false, repeating: true },
                ],
              },
            ],
          },
          {
            name: "ORDER",
            required: false,
            repeating: true,
            segments: [
              { name: "ORC", required: true, repeating: false },
              {
                name: "ORDER_DETAIL",
                required: false,
                repeating: false,
                segments: [
                  { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
                  { name: "NTE", required: false, repeating: true },
                  { name: "VAR", required: false, repeating: true },
                  {
                    name: "ORDER_OBSERVATION",
                    required: false,
                    repeating: true,
                    segments: [
                      { name: "OBX", required: true, repeating: false },
                      { name: "NTE", required: false, repeating: true },
                      { name: "VAR", required: false, repeating: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/** The PATIENT group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PATIENT VISIT group. */
  patientVisit?: ParsedPatientVisit;
  /** The GOAL groups. */
  goals: ParsedGoal[];
}

/** The PATIENT VISIT group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedPatientVisit {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The GOAL group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  goalRoles?: ParsedGoalRole[];
  /** The GOAL PATHWAY groups. */
  goalPathways?: ParsedGoalPathway[];
  /** The GOAL OBSERVATION groups. */
  goalObservations?: ParsedGoalObservation[];
  /** The PROBLEM groups. */
  problems?: ParsedProblem[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The GOAL ROLE group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL PATHWAY group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedGoalPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  problemRoles?: ParsedProblemRole[];
  /** The PROBLEM OBSERVATION groups. */
  problemObservations?: ParsedProblemObservation[];
}

/** The PROBLEM ROLE group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  orderObservations?: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed PPV^PCA (HL7 v2.6) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PPV^PCA (HL7 v2.6) message. */
export interface ParsedPPV_PCA extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of PPV^PCA (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PRB: (s, e) => PRB.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 PPV^PCA (HL7 v2.6) messages. */
export class PPV_PCA_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPV_PCA";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PPV_PCA_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPPV_PCA> {
    return parseStructure<ParsedPPV_PCA>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PPV^PCA (HL7 v2.6) message string into a structured result. */
export function parsePPV_PCA(messageString: string): Result<ParsedPPV_PCA> {
  return new PPV_PCA_Parser().parse(messageString);
}

/** The PATIENT group of an PPV^PCA (HL7 v2.6) message being built. */
export interface PatientGroup {
  /** The PID segment. */
  patient: PID;
  /** The PATIENT VISIT group. */
  patientVisit?: PatientVisitGroup;
  /** The GOAL groups. */
  goals: GoalGroup[];
}

/** The PATIENT VISIT group of an PPV^PCA (HL7 v2.6) message being built. */
export interface PatientVisitGroup {
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
}

/** The GOAL group of an PPV^PCA (HL7 v2.6) message being built. */
export interface GoalGroup {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  goalRoles?: GoalRoleGroup[];
  /** The GOAL PATHWAY groups. */
  goalPathways?: GoalPathwayGroup[];
  /** The GOAL OBSERVATION groups. */
  goalObservations?: GoalObservationGroup[];
  /** The PROBLEM groups. */
  problems?: ProblemGroup[];
  /** The ORDER groups. */
  orders?: OrderGroup[];
}

/** The GOAL ROLE group of an PPV^PCA (HL7 v2.6) message being built. */
export interface GoalRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL PATHWAY group of an PPV^PCA (HL7 v2.6) message being built. */
export interface GoalPathwayGroup {
  /** The PTH segment. */
  pathway: PTH;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPV^PCA (HL7 v2.6) message being built. */
export interface GoalObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of an PPV^PCA (HL7 v2.6) message being built. */
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

/** The PROBLEM ROLE group of an PPV^PCA (HL7 v2.6) message being built. */
export interface ProblemRoleGroup {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPV^PCA (HL7 v2.6) message being built. */
export interface ProblemObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPV^PCA (HL7 v2.6) message being built. */
export interface OrderGroup {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  orderDetail?: OrderDetailGroup;
}

/** The ORDER DETAIL group of an PPV^PCA (HL7 v2.6) message being built. */
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

/** The ORDER OBSERVATION group of an PPV^PCA (HL7 v2.6) message being built. */
export interface OrderObservationGroup {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPV^PCA (HL7 v2.6) message. */
export interface PPV_PCAOptions {
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The ERR segments. */
  errors?: ERR[];
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 PPV^PCA (HL7 v2.6) messages. */
export class PPV_PCA<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD> {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPV_PCA";
  /** The structure the message is verified against and encoded in. */
  protected readonly structure: StructureItem[] = PPV_PCA_STRUCTURE;

  /** Constructor. */
  constructor(
    public header: TMSH,
    public acknowledgment: TMSA,
    public query: TQRD,
    public patients: PatientGroup[],
    public options: PPV_PCAOptions = {},
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

/** Builds an HL7 PPV^PCA (HL7 v2.6) message. */
export function createPPV_PCA<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  patients: PatientGroup[],
  options: PPV_PCAOptions = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PPV_PCA<TMSH, TMSA, TQRD> {
  return new PPV_PCA(header, acknowledgment, query, patients, options, encoding);
}
