/**
 * Parser for EAC^U07 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EQU { COMMAND: ECD [TQ1] [{ SPECIMEN_CONTAINER: SAC [{ ORDER_FOR_SPECIMEN_CONTAINER: [{OBR}] [{PRT}] }] [{SPM}] [{DST}] }] [CNS] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EAC_U07_STRUCTURE } from "../../structures/v2.9.1/EAC_U07.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EQU } from "../../segments/v2.9.1/EQU.ts";
import { ECD } from "../../segments/v2.9.1/ECD.ts";
import { TQ1 } from "../../segments/v2.9.1/TQ1.ts";
import { SAC } from "../../segments/v2.9.1/SAC.ts";
import { OBR } from "../../segments/v2.9.1/OBR.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { SPM } from "../../segments/v2.9.1/SPM.ts";
import { DST } from "../../segments/v2.9.1/DST.ts";
import { CNS } from "../../segments/v2.9.1/CNS.ts";
import { ROL } from "../../segments/v2.9.1/ROL.ts";

/** The COMMAND group of a parsed EAC^U07 (HL7 v2.9.1) message. */
export interface ParsedCommand {
  /** The ECD segment. */
  equipmentCommand: ECD;
  /** The TQ1 segment. */
  timing?: TQ1;
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers?: ParsedSpecimenContainer[];
  /** The CNS segment. */
  clearNotification?: CNS;
}

/** The SPECIMEN CONTAINER group of a parsed EAC^U07 (HL7 v2.9.1) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The ORDER FOR SPECIMEN CONTAINER groups. */
  orderForSpecimenContainers?: ParsedOrderForSpecimenContainer[];
  /** The SPM segments. */
  specimens?: SPM[];
  /** The DST segments. */
  dstList?: DST[];
}

/** The ORDER FOR SPECIMEN CONTAINER group of a parsed EAC^U07 (HL7 v2.9.1) message. */
export interface ParsedOrderForSpecimenContainer {
  /** The OBR segments. */
  observationRequests?: OBR[];
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 EAC^U07 (HL7 v2.9.1) message. */
export interface ParsedEAC_U07 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The COMMAND groups. */
  commands: ParsedCommand[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of EAC^U07 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  ECD: (s, e) => ECD.parse(s, e),
  TQ1: (s, e) => TQ1.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  OBR: (s, e) => OBR.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  DST: (s, e) => DST.parse(s, e),
  CNS: (s, e) => CNS.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EAC^U07 (HL7 v2.9.1) messages. */
export class EAC_U07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAC_U07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAC_U07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAC_U07> {
    return parseStructure<ParsedEAC_U07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAC^U07 (HL7 v2.9.1) message string into a structured result. */
export function parseEAC_U07(messageString: string): Result<ParsedEAC_U07> {
  return new EAC_U07_Parser().parse(messageString);
}
