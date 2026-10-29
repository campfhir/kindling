/**
 * Parser for RDR^RDR messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [SFT] [UAC] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{ TIMING_ENCODED: TQ1 [{TQ2}] }] {RXR} [{RXC}] ] { DISPENSE: RXD {RXR} [{RXC}] } } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RDR_RDR_STRUCTURE } from "../../structures/v2.7/RDR_RDR.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { QRD } from "../../segments/v2.7/QRD.ts";
import { QRF } from "../../segments/v2.7/QRF.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { RXE } from "../../segments/v2.7/RXE.ts";
import { RXR } from "../../segments/v2.7/RXR.ts";
import { RXC } from "../../segments/v2.7/RXC.ts";
import { RXD } from "../../segments/v2.7/RXD.ts";
import { DSC } from "../../segments/v2.7/DSC.ts";

/** The DEFINITION group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedDefinition {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The DISPENSE groups. */
  dispenses: ParsedDispense[];
}

/** The TIMING group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ENCODING group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The TIMING ENCODED groups. */
  timingEncodeds?: ParsedTimingEncoded[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The TIMING ENCODED group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedTimingEncoded {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The DISPENSE group of a parsed RDR^RDR (HL7 v2.7) message. */
export interface ParsedDispense {
  /** The RXD segment. */
  dispense: RXD;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RDR^RDR (HL7 v2.7) message. */
export interface ParsedRDR_RDR extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segment. */
  software?: SFT;
  /** The UAC segment. */
  uac?: UAC;
  /** The DEFINITION groups. */
  definitions: ParsedDefinition[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RDR^RDR (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RDR^RDR (HL7 v2.7) messages. */
export class RDR_RDR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RDR_RDR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RDR_RDR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRDR_RDR> {
    return parseStructure<ParsedRDR_RDR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RDR^RDR (HL7 v2.7) message string into a structured result. */
export function parseRDR_RDR(messageString: string): Result<ParsedRDR_RDR> {
  return new RDR_RDR_Parser().parse(messageString);
}
