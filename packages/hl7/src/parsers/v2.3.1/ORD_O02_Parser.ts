/**
 * Parser for ORD^O02 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ODT}] [{NTE}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORD_O02_STRUCTURE } from "../../structures/v2.3.1/ORD_O02.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { MSA } from "../../segments/v2.3.1/MSA.ts";
import { ERR } from "../../segments/v2.3.1/ERR.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { ORC } from "../../segments/v2.3.1/ORC.ts";
import { ODS } from "../../segments/v2.3.1/ODS.ts";
import { ODT } from "../../segments/v2.3.1/ODT.ts";

/** The ORDER DIET group of a parsed ORD^O02 (HL7 v2.3.1) message. */
export interface ParsedDietOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER TRAY group of a parsed ORD^O02 (HL7 v2.3.1) message. */
export interface ParsedTrayOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ODT segments. */
  dietTrays?: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** Structured result of parsing an HL7 ORD^O02 (HL7 v2.3.1) message. */
export interface ParsedORD_O02 extends ParsedMessageBase {
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
  /** The ORDER DIET groups. */
  dietOrders?: ParsedDietOrder[];
  /** The ORDER TRAY groups. */
  trayOrders?: ParsedTrayOrder[];
}

/** The segment parsers of ORD^O02 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 ORD^O02 (HL7 v2.3.1) messages. */
export class ORD_O02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORD_O02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORD_O02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORD_O02> {
    return parseStructure<ParsedORD_O02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORD^O02 (HL7 v2.3.1) message string into a structured result. */
export function parseORD_O02(messageString: string): Result<ParsedORD_O02> {
  return new ORD_O02_Parser().parse(messageString);
}
