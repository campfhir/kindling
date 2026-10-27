/**
 * Parser for ORP^O10 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{NTE}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ ORDER_DETAIL: RXO [{PRT}] [{NTE}] {RXR} [{ COMPONENT: RXC [{NTE}] }] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORP_O10_STRUCTURE } from "../../structures/v2.9.1/ORP_O10.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { TQ2 } from "../../segments/v2.9.1/TQ2.ts";
import { RXO } from "../../segments/v2.9.1/RXO.ts";
import { RXR } from "../../segments/v2.9.1/RXR.ts";
import { RXC } from "../../segments/v2.9.1/RXC.ts";

/** The RESPONSE group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The ORDER DETAIL group. */
  orderDetail?: ParsedOrderDetail;
}

/** The TIMING group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER DETAIL group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedOrderDetail {
  /** The RXO segment. */
  pharmacyOrder: RXO;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RXR segments. */
  routes: RXR[];
  /** The COMPONENT groups. */
  components?: ParsedComponent[];
}

/** The COMPONENT group of a parsed ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedComponent {
  /** The RXC segment. */
  component: RXC;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORP^O10 (HL7 v2.9.1) message. */
export interface ParsedORP_O10 extends ParsedMessageBase {
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

/** The segment parsers of ORP^O10 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  TQ2: (s, e) => TQ2.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 ORP^O10 (HL7 v2.9.1) messages. */
export class ORP_O10_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORP_O10";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORP_O10_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORP_O10> {
    return parseStructure<ParsedORP_O10>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORP^O10 (HL7 v2.9.1) message string into a structured result. */
export function parseORP_O10(messageString: string): Result<ParsedORP_O10> {
  return new ORP_O10_Parser().parse(messageString);
}
