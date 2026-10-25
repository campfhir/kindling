/**
 * Parser for RRA^O18 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ADMINISTRATION: {RXA} RXR ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRA_O18_STRUCTURE } from "../../structures/v2.4/RRA_O18.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { RXA } from "../../segments/v2.4/RXA.ts";
import { RXR } from "../../segments/v2.4/RXR.ts";

/** The ORDER group of a parsed RRA^O18 (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXA segments. */
  administrations?: RXA[];
  /** The RXR segment. */
  route?: RXR;
}

/** Structured result of parsing an HL7 RRA^O18 (HL7 v2.4) message. */
export interface ParsedRRA_O18 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders?: ParsedOrder[];
}

/** The segment parsers of RRA^O18 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
};

/** Parser for HL7 RRA^O18 (HL7 v2.4) messages. */
export class RRA_O18_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRA_O18";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRA_O18_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRA_O18> {
    return parseStructure<ParsedRRA_O18>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRA^O18 (HL7 v2.4) message string into a structured result. */
export function parseRRA_O18(messageString: string): Result<ParsedRRA_O18> {
  return new RRA_O18_Parser().parse(messageString);
}
