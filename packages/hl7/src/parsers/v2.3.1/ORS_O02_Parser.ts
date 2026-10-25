/**
 * Parser for ORS^O02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC RQD [{NTE}] } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORS_O02_STRUCTURE } from "../../structures/v2.3.1/ORS_O02.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { RQD } from "../../segments/v2.3.1/RQD.ts";

/** The ORDER group of a parsed ORS^O02 (HL7 v2.3.1) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The RQD segment. */
  requisition: RQD;
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORS^O02 (HL7 v2.3.1) message. */
export interface ParsedORS_O02 extends ParsedMessageBase {
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

/** The segment parsers of ORS^O02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RQD: (s, e) => RQD.parse(s, e),
};

/** Parser for HL7 ORS^O02 (HL7 v2.3.1) messages. */
export class ORS_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORS_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORS_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORS_O02> {
    return parseStructure<ParsedORS_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORS^O02 (HL7 v2.3.1) message string into a structured result. */
export function parseORS_O02(messageString: string): Result<ParsedORS_O02> {
  return new ORS_O02_Parser().parse(messageString);
}
