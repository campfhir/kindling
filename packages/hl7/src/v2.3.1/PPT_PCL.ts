/**
 * Builder, parser and structure for PPT^PCL messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [QAK] QRD { PATIENT: PID [ PATIENT_VISIT: PV1 [PV2] ] { PATHWAY: PTH [{NTE}] [{VAR}] [{ PATHWAY_ROLE: ROL [{VAR}] }] [{ GOAL: GOL [{NTE}] [{VAR}] [{ GOAL_ROLE: ROL [{VAR}] }] [{ GOAL_OBSERVATION: OBX [{NTE}] }] [{ PROBLEM: PRB [{NTE}] [{VAR}] [{ PROBLEM_ROLE: ROL [{VAR}] }] [{ PROBLEM_OBSERVATION: OBX [{NTE}] }] }] [{ ORDER: ORC [ ORDER_DETAIL: <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{VAR}] [{ ORDER_OBSERVATION: OBX [{NTE}] [{VAR}] }] ] }] }] } }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { StructureItem } from "../types/schema.ts";
import type { Result } from "../types/result.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers, encodeStructure, verifyStructure, type StructureInput } from "../types/structure.ts";
import { MSH } from "./MSH.ts";
import { MSA } from "./MSA.ts";
import { ERR } from "./ERR.ts";
import { QAK } from "./QAK.ts";
import { QRD } from "./QRD.ts";
import { PID } from "./PID.ts";
import { PV1 } from "./PV1.ts";
import { PV2 } from "./PV2.ts";
import { PTH } from "./PTH.ts";
import { NTE } from "./NTE.ts";
import { VAR } from "./VAR.ts";
import { ROL } from "./ROL.ts";
import { GOL } from "./GOL.ts";
import { OBX } from "./OBX.ts";
import { PRB } from "./PRB.ts";
import { ORC } from "./ORC.ts";
import { OBR } from "./OBR.ts";
import { RQD } from "./RQD.ts";
import { RQ1 } from "./RQ1.ts";
import { RXO } from "./RXO.ts";
import { ODS } from "./ODS.ts";
import { ODT } from "./ODT.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";

/** The segments, choices and groups of PPT^PCL (HL7 v2.3.1), in order. */
export const PPT_PCL_STRUCTURE: StructureItem[] = [
  { name: "MSH", required: true, repeating: false },
  { name: "MSA", required: true, repeating: false },
  { name: "ERR", required: false, repeating: false },
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
        inline: true,
        segments: [
          { name: "PV1", required: true, repeating: false },
          { name: "PV2", required: false, repeating: false },
        ],
      },
      {
        name: "PATHWAY",
        required: true,
        repeating: true,
        segments: [
          { name: "PTH", required: true, repeating: false },
          { name: "NTE", required: false, repeating: true },
          { name: "VAR", required: false, repeating: true },
          {
            name: "PATHWAY_ROLE",
            required: false,
            repeating: true,
            as: "roles",
            segments: [
              { name: "ROL", required: true, repeating: false },
              { name: "VAR", required: false, repeating: true },
            ],
          },
          {
            name: "GOAL",
            required: false,
            repeating: true,
            segments: [
              { name: "GOL", required: true, repeating: false },
              { name: "NTE", required: false, repeating: true },
              { name: "VAR", required: false, repeating: true },
              {
                name: "GOAL_ROLE",
                required: false,
                repeating: true,
                as: "roles",
                segments: [
                  { name: "ROL", required: true, repeating: false },
                  { name: "VAR", required: false, repeating: true },
                ],
              },
              {
                name: "GOAL_OBSERVATION",
                required: false,
                repeating: true,
                as: "observations",
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
                    as: "roles",
                    segments: [
                      { name: "ROL", required: true, repeating: false },
                      { name: "VAR", required: false, repeating: true },
                    ],
                  },
                  {
                    name: "PROBLEM_OBSERVATION",
                    required: false,
                    repeating: true,
                    as: "observations",
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
                    as: "detail",
                    segments: [
                      { oneOf: ["OBR", "RQD", "RQ1", "RXO", "ODS", "ODT"], required: true },
                      { name: "NTE", required: false, repeating: true },
                      { name: "VAR", required: false, repeating: true },
                      {
                        name: "ORDER_OBSERVATION",
                        required: false,
                        repeating: true,
                        as: "observations",
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
    ],
  },
];

/** The PATIENT group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedCarePatient {
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The PATHWAY groups. */
  pathways: ParsedPathway[];
}

/** The PATHWAY group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedPathway {
  /** The PTH segment. */
  pathway: PTH;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PATHWAY ROLE groups. */
  roles?: ParsedPathwayRole[];
  /** The GOAL groups. */
  goals?: ParsedGoal[];
}

/** The PATHWAY ROLE group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedPathwayRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedGoal {
  /** The GOL segment. */
  goal: GOL;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The GOAL ROLE groups. */
  roles?: ParsedGoalRole[];
  /** The GOAL OBSERVATION groups. */
  observations?: ParsedGoalObservation[];
  /** The PROBLEM groups. */
  problems?: ParsedProblem[];
  /** The ORDER groups. */
  orders?: ParsedCareOrder[];
}

/** The GOAL ROLE group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedGoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedGoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedProblem {
  /** The PRB segment. */
  problem: PRB;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The PROBLEM ROLE groups. */
  roles?: ParsedProblemRole[];
  /** The PROBLEM OBSERVATION groups. */
  observations?: ParsedProblemObservation[];
}

/** The PROBLEM ROLE group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedCareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: ParsedOrderDetail;
}

/** The ORDER DETAIL group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedOrderDetail {
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
  /** The ORDER OBSERVATION groups. */
  observations?: ParsedOrderObservation[];
}

/** The ORDER OBSERVATION group of a parsed PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedOrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** Structured result of parsing an HL7 PPT^PCL (HL7 v2.3.1) message. */
export interface ParsedPPT_PCL extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
  /** The QRD segment. */
  query: QRD;
  /** The PATIENT groups. */
  patients: ParsedCarePatient[];
}

/** The segment parsers of PPT^PCL (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QAK: (s, e) => QAK.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  PTH: (s, e) => PTH.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  VAR: (s, e) => VAR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  GOL: (s, e) => GOL.parse(s, e),
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

/** Parser for HL7 PPT^PCL (HL7 v2.3.1) messages. */
export class PPT_PCL_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PPT_PCL";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PPT_PCL_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPPT_PCL> {
    return parseStructure<ParsedPPT_PCL>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PPT^PCL (HL7 v2.3.1) message string into a structured result. */
export function parsePPT_PCL(messageString: string): Result<ParsedPPT_PCL> {
  return new PPT_PCL_Parser().parse(messageString);
}

/** The PATIENT group of an PPT^PCL (HL7 v2.3.1) message being built. */
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

/** The PATHWAY group of an PPT^PCL (HL7 v2.3.1) message being built. */
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

/** The PATHWAY ROLE group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface PathwayRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL group of an PPT^PCL (HL7 v2.3.1) message being built. */
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

/** The GOAL ROLE group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface GoalRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The GOAL OBSERVATION group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface GoalObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The PROBLEM group of an PPT^PCL (HL7 v2.3.1) message being built. */
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

/** The PROBLEM ROLE group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface ProblemRole {
  /** The ROL segment. */
  role: ROL;
  /** The VAR segments. */
  variances?: VAR[];
}

/** The PROBLEM OBSERVATION group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface ProblemObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface CareOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ORDER DETAIL group. */
  detail?: OrderDetail;
}

/** The ORDER DETAIL group of an PPT^PCL (HL7 v2.3.1) message being built. */
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

/** The ORDER OBSERVATION group of an PPT^PCL (HL7 v2.3.1) message being built. */
export interface OrderObservation {
  /** The OBX segment. */
  observation: OBX;
  /** The NTE segments. */
  notes?: NTE[];
  /** The VAR segments. */
  variances?: VAR[];
}

/** The optional segments and groups of an PPT^PCL (HL7 v2.3.1) message. */
export interface PPT_PCLOptions {
  /** The ERR segment. */
  error?: ERR;
  /** The QAK segment. */
  queryAcknowledgment?: QAK;
}

/** Builder for HL7 PPT^PCL (HL7 v2.3.1) messages. */
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

/** Builds an HL7 PPT^PCL (HL7 v2.3.1) message. */
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
