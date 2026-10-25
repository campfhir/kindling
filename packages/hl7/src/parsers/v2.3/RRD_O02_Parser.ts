/**
 * Parser for RRD^O02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ DISPENSE: RXD {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRD_O02_STRUCTURE } from "../../structures/v2.3/RRD_O02.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { RXD } from "../../segments/v2.3/RXD.ts";
import { RXR } from "../../segments/v2.3/RXR.ts";
import { RXC } from "../../segments/v2.3/RXC.ts";

/** The ORDER group of a parsed RRD^O02 (HL7 v2.3) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXD segment. */
  dispense?: RXD;
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RRD^O02 (HL7 v2.3) message. */
export interface ParsedRRD_O02 extends ParsedMessageBase {
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

/** The segment parsers of RRD^O02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXD: (s, e) => RXD.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRD^O02 (HL7 v2.3) messages. */
export class RRD_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRD_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRD_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRD_O02> {
    return parseStructure<ParsedRRD_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRD^O02 (HL7 v2.3) message string into a structured result. */
export function parseRRD_O02(messageString: string): Result<ParsedRRD_O02> {
  return new RRD_O02_Parser().parse(messageString);
}
