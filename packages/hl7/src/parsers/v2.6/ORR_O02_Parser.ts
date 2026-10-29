/**
 * Parser for ORR^O02 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC <OBR|RQD|RQ1|RXO|ODS|ODT> [{NTE}] [{CTI}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORR_O02_STRUCTURE } from "../../structures/v2.6/ORR_O02.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { RQD } from "../../segments/v2.6/RQD.ts";
import { RQ1 } from "../../segments/v2.6/RQ1.ts";
import { RXO } from "../../segments/v2.6/RXO.ts";
import { ODS } from "../../segments/v2.6/ODS.ts";
import { ODT } from "../../segments/v2.6/ODT.ts";
import { CTI } from "../../segments/v2.6/CTI.ts";

/** The RESPONSE group of a parsed ORR^O02 (HL7 v2.6) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORR^O02 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORR^O02 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** One of OBR, RQD, RQ1, RXO, ODS, ODT. */
  segment: OBR | RQD | RQ1 | RXO | ODS | ODT;
  /** The NTE segments. */
  notes?: NTE[];
  /** The CTI segments. */
  clinicalTrials?: CTI[];
}

/** Structured result of parsing an HL7 ORR^O02 (HL7 v2.6) message. */
export interface ParsedORR_O02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The RESPONSE group. */
  response?: ParsedResponse;
}

/** The segment parsers of ORR^O02 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
  RQ1: (s, e) => RQ1.parse(s, e),
  RXO: (s, e) => RXO.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
  CTI: (s, e) => CTI.parse(s, e),
};

/** Parser for HL7 ORR^O02 (HL7 v2.6) messages. */
export class ORR_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORR_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORR_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORR_O02> {
    return parseStructure<ParsedORR_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORR^O02 (HL7 v2.6) message string into a structured result. */
export function parseORR_O02(messageString: string): Result<ParsedORR_O02> {
  return new ORR_O02_Parser().parse(messageString);
}
