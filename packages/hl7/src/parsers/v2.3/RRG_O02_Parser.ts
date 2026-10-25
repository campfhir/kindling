/**
 * Parser for RRG^O02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ GIVE: RXG {RXR} [{RXC}] ] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RRG_O02_STRUCTURE } from "../../structures/v2.3/RRG_O02.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { ERR } from "../../segments/v2.3/ERR.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { ORC } from "../../segments/v2.3/ORC.ts";
import { RXG } from "../../segments/v2.3/RXG.ts";
import { RXR } from "../../segments/v2.3/RXR.ts";
import { RXC } from "../../segments/v2.3/RXC.ts";

/** The ORDER group of a parsed RRG^O02 (HL7 v2.3) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RXG segment. */
  give?: RXG;
  /** The RXR segments. */
  routes?: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RRG^O02 (HL7 v2.3) message. */
export interface ParsedRRG_O02 extends ParsedMessageBase {
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

/** The segment parsers of RRG^O02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
};

/** Parser for HL7 RRG^O02 (HL7 v2.3) messages. */
export class RRG_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RRG_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RRG_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRRG_O02> {
    return parseStructure<ParsedRRG_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RRG^O02 (HL7 v2.3) message string into a structured result. */
export function parseRRG_O02(messageString: string): Result<ParsedRRG_O02> {
  return new RRG_O02_Parser().parse(messageString);
}
