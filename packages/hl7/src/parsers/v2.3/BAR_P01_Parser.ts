/**
 * Parser for BAR^P01 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BAR_P01_STRUCTURE } from "../../structures/v2.3/BAR_P01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";
import { AL1 } from "../../segments/v2.3/AL1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { ACC } from "../../segments/v2.3/ACC.ts";
import { UB1 } from "../../segments/v2.3/UB1.ts";
import { UB2 } from "../../segments/v2.3/UB2.ts";

/** The VISIT group of a parsed BAR^P01 (HL7 v2.3) message. */
export interface ParsedBARVisit {
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
  procedures?: ParsedBARProcedure[];
  /** The GT1 segments. */
  gt1List?: GT1[];
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The INSURANCE groups. */
  insurances?: ParsedBARInsurance[];
  /** The ACC segment. */
  acc?: ACC;
  /** The UB1 segment. */
  ub1?: UB1;
  /** The UB2 segment. */
  ub2?: UB2;
}

/** The PROCEDURE group of a parsed BAR^P01 (HL7 v2.3) message. */
export interface ParsedBARProcedure {
  /** The PR1 segment. */
  pr1: PR1;
  /** The ROL segments. */
  rolList?: ROL[];
}

/** The INSURANCE group of a parsed BAR^P01 (HL7 v2.3) message. */
export interface ParsedBARInsurance {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segment. */
  in3?: IN3;
}

/** Structured result of parsing an HL7 BAR^P01 (HL7 v2.3) message. */
export interface ParsedBAR_P01 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The EVN segment. */
  evn: EVN;
  /** The PID segment. */
  pid: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The VISIT groups. */
  visits: ParsedBARVisit[];
}

/** The segment parsers of BAR^P01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ACC: (s, e) => ACC.parse(s, e),
  UB1: (s, e) => UB1.parse(s, e),
  UB2: (s, e) => UB2.parse(s, e),
};

/** Parser for HL7 BAR^P01 (HL7 v2.3) messages. */
export class BAR_P01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BAR_P01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BAR_P01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBAR_P01> {
    return parseStructure<ParsedBAR_P01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BAR^P01 (HL7 v2.3) message string into a structured result. */
export function parseBAR_P01(messageString: string): Result<ParsedBAR_P01> {
  return new BAR_P01_Parser().parse(messageString);
}
