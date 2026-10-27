/**
 * Parser for OSU^O52 messages (HL7 v2.9.1).
 *
 * Structure: MSH MSA [{ARV}] [{ERR}] [{SFT}] [UAC] [{NTE}] [ PATIENT: PID [{PRT}] ] [{ARV}] { ORDER_STATUS: ORC [{PRT}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { OSU_O52_STRUCTURE } from "../../structures/v2.9.1/OSU_O52.ts";
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

/** The PATIENT group of a parsed OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** The ORDER STATUS group of a parsed OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedOrderStatus {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 OSU^O52 (HL7 v2.9.1) message. */
export interface ParsedOSU_O52 extends ParsedMessageBase {
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
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ARV segments. */
  arv2?: ARV[];
  /** The ORDER STATUS groups. */
  orderStatus: ParsedOrderStatus[];
}

/** The segment parsers of OSU^O52 (HL7 v2.9.1). */
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
};

/** Parser for HL7 OSU^O52 (HL7 v2.9.1) messages. */
export class OSU_O52_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "OSU_O52";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = OSU_O52_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedOSU_O52> {
    return parseStructure<ParsedOSU_O52>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 OSU^O52 (HL7 v2.9.1) message string into a structured result. */
export function parseOSU_O52(messageString: string): Result<ParsedOSU_O52> {
  return new OSU_O52_Parser().parse(messageString);
}
