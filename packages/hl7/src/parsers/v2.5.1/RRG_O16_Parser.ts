/**
 * Parser for RRG^O16 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ GIVE: RXG { TIMING_GIVE: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRG_O16_STRUCTURE } from "../../structures/v2.5.1/RRG_O16.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { ERR } from "../../segments/v2.5.1/ERR.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { NTE } from "../../segments/v2.5.1/NTE.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { ORC } from "../../segments/v2.5.1/ORC.ts";
import { TQ1 } from "../../segments/v2.5.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.5.1/TQ2.ts";
import { RXG } from "../../segments/v2.5.1/RXG.ts";
import { RXR } from "../../segments/v2.5.1/RXR.ts";
import { RXC } from "../../segments/v2.5.1/RXC.ts";

/** The ORDER group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The RXG segment. */
  give?: RXG;
  /** The TIMING GIVE groups. */
  giveTimings?: ParsedTimingGive[];
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The TIMING GIVE group of a parsed RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedTimingGive {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 RRG^O16 (HL7 v2.5.1) message. */
export interface ParsedRRG_O16 extends ParsedMessageBase {
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

/** The segment parsers of RRG^O16 (HL7 v2.5.1). */
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
  RXG: (s, e) => RXG.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRG^O16 (HL7 v2.5.1) messages. */
export class RRG_O16_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O16";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRG_O16_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRG_O16> {
    return parseStructure<ParsedRRG_O16>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRG^O16 (HL7 v2.5.1) message string into a structured result. */
export function parseRRG_O16(messageString: string): Result<ParsedRRG_O16> {
  return new RRG_O16_Parser().parse(messageString);
}
