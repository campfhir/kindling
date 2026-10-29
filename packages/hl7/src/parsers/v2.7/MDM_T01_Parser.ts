/**
 * Parser for MDM^T01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA [{CON}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MDM_T01_STRUCTURE } from "../../structures/v2.7/MDM_T01.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { OBR } from "../../segments/v2.7/OBR.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { TXA } from "../../segments/v2.7/TXA.ts";
import { CON } from "../../segments/v2.7/CON.ts";

/** The COMMON ORDER group of a parsed MDM^T01 (HL7 v2.7) message. */
export interface ParsedCommonOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING group of a parsed MDM^T01 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 MDM^T01 (HL7 v2.7) message. */
export interface ParsedMDM_T01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit: PV1;
  /** The COMMON ORDER groups. */
  commonOrders?: ParsedCommonOrder[];
  /** The TXA segment. */
  document: TXA;
  /** The CON segments. */
  consents?: CON[];
}

/** The segment parsers of MDM^T01 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  CON: (s, e) => CON.parse(s, e),
};

/** Parser for HL7 MDM^T01 (HL7 v2.7) messages. */
export class MDM_T01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MDM_T01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T01> {
    return parseStructure<ParsedMDM_T01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MDM^T01 (HL7 v2.7) message string into a structured result. */
export function parseMDM_T01(messageString: string): Result<ParsedMDM_T01> {
  return new MDM_T01_Parser().parse(messageString);
}
