/**
 * Parser for RRE^O26 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRE_O26_STRUCTURE } from "../../structures/v2.6/RRE_O26.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { RXE } from "../../segments/v2.6/RXE.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";
import { RXC } from "../../segments/v2.6/RXC.ts";

/** The RESPONSE group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
}

/** The TIMING group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ENCODING group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RRE^O26 (HL7 v2.6) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 RRE^O26 (HL7 v2.6) message. */
export interface ParsedRRE_O26 extends ParsedMessageBase {
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

/** The segment parsers of RRE^O26 (HL7 v2.6). */
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
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRE^O26 (HL7 v2.6) messages. */
export class RRE_O26_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRE_O26";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRE_O26_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRE_O26> {
    return parseStructure<ParsedRRE_O26>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRE^O26 (HL7 v2.6) message string into a structured result. */
export function parseRRE_O26(messageString: string): Result<ParsedRRE_O26> {
  return new RRE_O26_Parser().parse(messageString);
}
