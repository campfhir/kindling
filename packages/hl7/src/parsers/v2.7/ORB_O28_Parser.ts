/**
 * Parser for ORB^O28 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [BPO] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORB_O28_STRUCTURE } from "../../structures/v2.7/ORB_O28.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { BPO } from "../../segments/v2.7/BPO.ts";

/** The RESPONSE group of a parsed ORB^O28 (HL7 v2.7) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
}

/** The PATIENT group of a parsed ORB^O28 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed ORB^O28 (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
}

/** The TIMING group of a parsed ORB^O28 (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 ORB^O28 (HL7 v2.7) message. */
export interface ParsedORB_O28 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORB^O28 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  BPO: (s, e) => BPO.parse(s, e),
};

/** Parser for HL7 ORB^O28 (HL7 v2.7) messages. */
export class ORB_O28_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORB_O28";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORB_O28_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORB_O28> {
    return parseStructure<ParsedORB_O28>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORB^O28 (HL7 v2.7) message string into a structured result. */
export function parseORB_O28(messageString: string): Result<ParsedORB_O28> {
  return new ORB_O28_Parser().parse(messageString);
}
