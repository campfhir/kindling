/**
 * Parser for SSU^U03 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EQU { SPECIMEN_CONTAINER: SAC [{OBX}] [{ SPECIMEN: SPM [{OBX}] }] } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { SSU_U03_STRUCTURE } from "../../structures/v2.5.1/SSU_U03.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EQU } from "../../segments/v2.5.1/EQU.ts";
import { SAC } from "../../segments/v2.5.1/SAC.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";
import { SPM } from "../../segments/v2.5.1/SPM.ts";
import { ROL } from "../../segments/v2.5.1/ROL.ts";

/** The SPECIMEN CONTAINER group of a parsed SSU^U03 (HL7 v2.5.1) message. */
export interface ParsedSpecimenContainer {
  /** The SAC segment. */
  specimenContainer: SAC;
  /** The OBX segments. */
  observations?: OBX[];
  /** The SPECIMEN groups. */
  specimens?: ParsedSpecimen[];
}

/** The SPECIMEN group of a parsed SSU^U03 (HL7 v2.5.1) message. */
export interface ParsedSpecimen {
  /** The SPM segment. */
  specimen: SPM;
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 SSU^U03 (HL7 v2.5.1) message. */
export interface ParsedSSU_U03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The SPECIMEN CONTAINER groups. */
  specimenContainers: ParsedSpecimenContainer[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of SSU^U03 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EQU: (s, e) => EQU.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  SPM: (s, e) => SPM.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 SSU^U03 (HL7 v2.5.1) messages. */
export class SSU_U03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "SSU_U03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = SSU_U03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedSSU_U03> {
    return parseStructure<ParsedSSU_U03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 SSU^U03 (HL7 v2.5.1) message string into a structured result. */
export function parseSSU_U03(messageString: string): Result<ParsedSSU_U03> {
  return new SSU_U03_Parser().parse(messageString);
}
