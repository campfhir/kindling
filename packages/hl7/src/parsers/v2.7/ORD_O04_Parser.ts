/**
 * Parser for ORD^O04 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER_DIET: ORC [{ TIMING_DIET: TQ1 [{TQ2}] }] [{ODS}] [{NTE}] } [{ ORDER_TRAY: ORC [{ TIMING_TRAY: TQ1 [{TQ2}] }] [{ODT}] [{NTE}] }] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORD_O04_STRUCTURE } from "../../structures/v2.7/ORD_O04.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { MSA } from "../../segments/v2.7/MSA.ts";
import { ERR } from "../../segments/v2.7/ERR.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { ORC } from "../../segments/v2.7/ORC.ts";
import { TQ1 } from "../../segments/v2.7/TQ1.ts";
import { TQ2 } from "../../segments/v2.7/TQ2.ts";
import { ODS } from "../../segments/v2.7/ODS.ts";
import { ODT } from "../../segments/v2.7/ODT.ts";

/** The RESPONSE group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER DIET groups. */
  orderDiets: ParsedOrderDiet[];
  /** The ORDER TRAY groups. */
  orderTrays?: ParsedOrderTray[];
}

/** The PATIENT group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER DIET group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedOrderDiet {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING DIET groups. */
  timingDiets?: ParsedTimingDiet[];
  /** The ODS segments. */
  diets?: ODS[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING DIET group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedTimingDiet {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** The ORDER TRAY group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedOrderTray {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING TRAY groups. */
  timingTrays?: ParsedTimingTray[];
  /** The ODT segments. */
  dietTrays?: ODT[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The TIMING TRAY group of a parsed ORD^O04 (HL7 v2.7) message. */
export interface ParsedTimingTray {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 ORD^O04 (HL7 v2.7) message. */
export interface ParsedORD_O04 extends ParsedMessageBase {
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

/** The segment parsers of ORD^O04 (HL7 v2.7). */
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
  ODS: (s, e) => ODS.parse(s, e),
  ODT: (s, e) => ODT.parse(s, e),
};

/** Parser for HL7 ORD^O04 (HL7 v2.7) messages. */
export class ORD_O04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORD_O04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORD_O04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORD_O04> {
    return parseStructure<ParsedORD_O04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORD^O04 (HL7 v2.7) message string into a structured result. */
export function parseORD_O04(messageString: string): Result<ParsedORD_O04> {
  return new ORD_O04_Parser().parse(messageString);
}
