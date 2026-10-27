/**
 * Parser for ORX^O58 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] [{PRT}] [{ARV}] ] { ORDER: ORC [{PRT}] TXA [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORX_O58_STRUCTURE } from "../../structures/v2.9.1/ORX_O58.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { ORC } from "../../segments/v2.9.1/ORC.ts";
import { TXA } from "../../segments/v2.9.1/TXA.ts";
import { CTI } from "../../segments/v2.9.1/CTI.ts";

/** The RESPONSE group of a parsed ORX^O58 (HL7 v2.9.1) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORX^O58 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The ORDER group of a parsed ORX^O58 (HL7 v2.9.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The TXA segment. */
  document: TXA;
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 ORX^O58 (HL7 v2.9.1) message. */
export interface ParsedORX_O58 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ARV segments. */
  arvList?: ARV[];
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

/** The segment parsers of ORX^O58 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 ORX^O58 (HL7 v2.9.1) messages. */
export class ORX_O58_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORX_O58";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORX_O58_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORX_O58> {
    return parseStructure<ParsedORX_O58>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORX^O58 (HL7 v2.9.1) message string into a structured result. */
export function parseORX_O58(messageString: string): Result<ParsedORX_O58> {
  return new ORX_O58_Parser().parse(messageString);
}
