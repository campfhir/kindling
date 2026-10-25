/**
 * Parser for BRP^O30 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [BPO] [{BPX}] }] ] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BRP_O30_STRUCTURE } from "../../structures/v2.5/BRP_O30.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { BPO } from "../../segments/v2.5/BPO.ts";
import { BPX } from "../../segments/v2.5/BPX.ts";

/** The RESPONSE group of a parsed BRP^O30 (HL7 v2.5) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
}

/** The PATIENT group of a parsed BRP^O30 (HL7 v2.5) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed BRP^O30 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
  /** The BPX segments. */
  bloodProductDispenseStatuses?: BPX[];
}

/** The TIMING group of a parsed BRP^O30 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 BRP^O30 (HL7 v2.5) message. */
export interface ParsedBRP_O30 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of BRP^O30 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  BPO: (s, e) => BPO.parse(s, e),
  BPX: (s, e) => BPX.parse(s, e),
};

/** Parser for HL7 BRP^O30 (HL7 v2.5) messages. */
export class BRP_O30_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BRP_O30";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BRP_O30_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBRP_O30> {
    return parseStructure<ParsedBRP_O30>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BRP^O30 (HL7 v2.5) message string into a structured result. */
export function parseBRP_O30(messageString: string): Result<ParsedBRP_O30> {
  return new BRP_O30_Parser().parse(messageString);
}
