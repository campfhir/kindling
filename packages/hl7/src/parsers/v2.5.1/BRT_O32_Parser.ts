/**
 * Parser for BRT^O32 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [PID] [{ ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [BPO] [{BTX}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { BRT_O32_STRUCTURE } from "../../structures/v2.5.1/BRT_O32.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { BPO } from "../../segments/v2.5.1/BPO.ts";
import { BTX } from "../../segments/v2.5.1/BTX.ts";

/** The RESPONSE group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedResponse {
  /** The PID segment. */
  patient?: PID;
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The ORDER group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The BPO segment. */
  bloodProductOrder?: BPO;
  /** The BTX segments. */
  bloodProductTransfusions?: BTX[];
}

/** The TIMING group of a parsed BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 BRT^O32 (HL7 v2.5.1) message. */
export interface ParsedBRT_O32 extends ParsedMessageBase {
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

/** The segment parsers of BRT^O32 (HL7 v2.5.1). */
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
  BTX: (s, e) => BTX.parse(s, e),
};

/** Parser for HL7 BRT^O32 (HL7 v2.5.1) messages. */
export class BRT_O32_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "BRT_O32";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = BRT_O32_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedBRT_O32> {
    return parseStructure<ParsedBRT_O32>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 BRT^O32 (HL7 v2.5.1) message string into a structured result. */
export function parseBRT_O32(messageString: string): Result<ParsedBRT_O32> {
  return new BRT_O32_Parser().parse(messageString);
}
