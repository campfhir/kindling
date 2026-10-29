/**
 * Parser for ORI^O24 messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] [{ROL}] {IPC} } ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ORI_O24_STRUCTURE } from "../../structures/v2.6/ORI_O24.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { TQ1 } from "../../segments/v2.6/TQ1.ts";
import { TQ2 } from "../../segments/v2.6/TQ2.ts";
import { OBR } from "../../segments/v2.6/OBR.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";
import { IPC } from "../../segments/v2.6/IPC.ts";

/** The RESPONSE group of a parsed ORI^O24 (HL7 v2.6) message. */
export interface ParsedResponse {
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed ORI^O24 (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed ORI^O24 (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The TIMING groups. */
  timings?: ParsedTiming[];
  /** The OBR segment. */
  observationRequest: OBR;
  /** The NTE segments. */
  notes?: NTE[];
  /** The ROL segments. */
  roles?: ROL[];
  /** The IPC segments. */
  imagingProcedureControls: IPC[];
}

/** The TIMING group of a parsed ORI^O24 (HL7 v2.6) message. */
export interface ParsedTiming {
  /** The TQ1 segment. */
  timing: TQ1;
  /** The TQ2 segments. */
  timingRelationships?: TQ2[];
}

/** Structured result of parsing an HL7 ORI^O24 (HL7 v2.6) message. */
export interface ParsedORI_O24 extends ParsedMessageBase {
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

/** The segment parsers of ORI^O24 (HL7 v2.6). */
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
  OBR: (s, e) => OBR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  IPC: (s, e) => IPC.parse(s, e),
};

/** Parser for HL7 ORI^O24 (HL7 v2.6) messages. */
export class ORI_O24_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ORI_O24";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ORI_O24_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedORI_O24> {
    return parseStructure<ParsedORI_O24>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ORI^O24 (HL7 v2.6) message string into a structured result. */
export function parseORI_O24(messageString: string): Result<ParsedORI_O24> {
  return new ORI_O24_Parser().parse(messageString);
}
