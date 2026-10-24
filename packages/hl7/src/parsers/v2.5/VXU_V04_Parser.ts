/**
 * Parser for VXU^V04 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] PID [PD1] [{NK1}] [ PATIENT: PV1 [PV2] ] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] RXA [RXR] [{ OBSERVATION: OBX [{NTE}] }] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VXU_V04_STRUCTURE } from "../../structures/v2.5/VXU_V04.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { NK1 } from "../../segments/v2.5/NK1.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { GT1 } from "../../segments/v2.5/GT1.ts";
import { IN1 } from "../../segments/v2.5/IN1.ts";
import { IN2 } from "../../segments/v2.5/IN2.ts";
import { IN3 } from "../../segments/v2.5/IN3.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { RXA } from "../../segments/v2.5/RXA.ts";
import { RXR } from "../../segments/v2.5/RXR.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";

/** The PATIENT group of a parsed VXU^V04 (HL7 v2.5) message. */
export interface ParsedVisit {
  /** The PV1 segment. */
  pv1: PV1;
  /** The PV2 segment. */
  pv2?: PV2;
}

/** The INSURANCE group of a parsed VXU^V04 (HL7 v2.5) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  in1: IN1;
  /** The IN2 segment. */
  in2?: IN2;
  /** The IN3 segment. */
  in3?: IN3;
}

/** The ORDER group of a parsed VXU^V04 (HL7 v2.5) message. */
export interface ParsedVaccination {
  /** The ORC segment. */
  orc: ORC;
  /** The TIMING groups. */
  timing?: ParsedTiming[];
  /** The RXA segment. */
  rxa: RXA;
  /** The RXR segment. */
  rxr?: RXR;
  /** The OBSERVATION groups. */
  observations?: ParsedObservation[];
}

/** The TIMING group of a parsed VXU^V04 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  tq1: TQ1;
  /** The TQ2 segments. */
  tq2List?: TQ2[];
}

/** The OBSERVATION group of a parsed VXU^V04 (HL7 v2.5) message. */
export interface ParsedObservation {
  /** The OBX segment. */
  obx: OBX;
  /** The NTE segments. */
  nteList?: NTE[];
}

/** Structured result of parsing an HL7 VXU^V04 (HL7 v2.5) message. */
export interface ParsedVXU_V04 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The SFT segments. */
  sftList?: SFT[];
  /** The PID segment. */
  pid: PID;
  /** The PD1 segment. */
  pd1?: PD1;
  /** The NK1 segments. */
  nk1List?: NK1[];
  /** The PATIENT group. */
  visit?: ParsedVisit;
  /** The GT1 segments. */
  gt1List?: GT1[];
  /** The INSURANCE groups. */
  insurance?: ParsedInsurance[];
  /** The ORDER groups. */
  orders?: ParsedVaccination[];
}

/** The segment parsers of VXU^V04 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 VXU^V04 (HL7 v2.5) messages. */
export class VXU_V04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXU_V04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXU_V04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXU_V04> {
    return parseStructure<ParsedVXU_V04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXU^V04 (HL7 v2.5) message string into a structured result. */
export function parseVXU_V04(messageString: string): Result<ParsedVXU_V04> {
  return new VXU_V04_Parser().parse(messageString);
}
