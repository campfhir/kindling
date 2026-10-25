/**
 * Parser for EAR^U08 messages (HL7 v2.4).
 *
 * Structure: MSH EQU { COMMAND_RESPONSE: ECD [SAC] ECR } [ROL]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { EAR_U08_STRUCTURE } from "../../structures/v2.4/EAR_U08.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { EQU } from "../../segments/v2.4/EQU.ts";
import { ECD } from "../../segments/v2.4/ECD.ts";
import { SAC } from "../../segments/v2.4/SAC.ts";
import { ECR } from "../../segments/v2.4/ECR.ts";
import { ROL } from "../../segments/v2.4/ROL.ts";

/** The COMMAND RESPONSE group of a parsed EAR^U08 (HL7 v2.4) message. */
export interface ParsedCommandResponse {
  /** The ECD segment. */
  equipmentCommand: ECD;
  /** The SAC segment. */
  specimenContainer?: SAC;
  /** The ECR segment. */
  commandResponse: ECR;
}

/** Structured result of parsing an HL7 EAR^U08 (HL7 v2.4) message. */
export interface ParsedEAR_U08 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EQU segment. */
  equipmentDetail: EQU;
  /** The COMMAND RESPONSE groups. */
  commandResponses: ParsedCommandResponse[];
  /** The ROL segment. */
  role?: ROL;
}

/** The segment parsers of EAR^U08 (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EQU: (s, e) => EQU.parse(s, e),
  ECD: (s, e) => ECD.parse(s, e),
  SAC: (s, e) => SAC.parse(s, e),
  ECR: (s, e) => ECR.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 EAR^U08 (HL7 v2.4) messages. */
export class EAR_U08_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "EAR_U08";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = EAR_U08_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedEAR_U08> {
    return parseStructure<ParsedEAR_U08>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 EAR^U08 (HL7 v2.4) message string into a structured result. */
export function parseEAR_U08(messageString: string): Result<ParsedEAR_U08> {
  return new EAR_U08_Parser().parse(messageString);
}
