/**
 * Parser for RRE^O12 messages (HL7 v2.5).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRE_O12_STRUCTURE } from "../../structures/v2.5/RRE_O12.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { MSA } from "../../segments/v2.5/MSA.ts";
import { ERR } from "../../segments/v2.5/ERR.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { NTE } from "../../segments/v2.5/NTE.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { ORC } from "../../segments/v2.5/ORC.ts";
import { TQ1 } from "../../segments/v2.5/TQ1.ts";
import { TQ2 } from "../../segments/v2.5/TQ2.ts";
import { RXE } from "../../segments/v2.5/RXE.ts";
import { RXR } from "../../segments/v2.5/RXR.ts";
import { RXC } from "../../segments/v2.5/RXC.ts";

/** The ORDER group of a parsed RRE^O12 (HL7 v2.5) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXE segment. */
  encodedOrder?: RXE;
  /** The NTE segments. */
  notes?: NTE[];
  /** The TIMING ENCODED groups. */
  encodedTimings?: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING group of a parsed RRE^O12 (HL7 v2.5) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The TIMING ENCODED group of a parsed RRE^O12 (HL7 v2.5) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 RRE^O12 (HL7 v2.5) message. */
export interface ParsedRRE_O12 extends ParsedMessageBase {
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
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of RRE^O12 (HL7 v2.5). */
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
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRE^O12 (HL7 v2.5) messages. */
export class RRE_O12_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRE_O12";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRE_O12_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRE_O12> {
    return parseStructure<ParsedRRE_O12>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRE^O12 (HL7 v2.5) message string into a structured result. */
export function parseRRE_O12(messageString: string): Result<ParsedRRE_O12> {
  return new RRE_O12_Parser().parse(messageString);
}
