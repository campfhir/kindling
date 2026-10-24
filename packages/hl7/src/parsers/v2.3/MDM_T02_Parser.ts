/**
 * Parser for MDM^T02 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID PV1 TXA {OBX}
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MDM_T02_STRUCTURE } from "../../structures/v2.3/MDM_T02.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { TXA } from "../../segments/v2.3/TXA.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";

/** Structured result of parsing an HL7 MDM^T02 (HL7 v2.3) message. */
export interface ParsedMDM_T02 extends ParsedMessageBase {
  /** The MSH segment. */
  msh: MSH;
  /** The EVN segment. */
  evn: EVN;
  /** The PID segment. */
  pid: PID;
  /** The PV1 segment. */
  pv1: PV1;
  /** The TXA segment. */
  txa: TXA;
  /** The OBX segments. */
  obxList: OBX[];
}

/** The segment parsers of MDM^T02 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  TXA: (s, e) => TXA.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 MDM^T02 (HL7 v2.3) messages. */
export class MDM_T02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MDM_T02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MDM_T02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMDM_T02> {
    return parseStructure<ParsedMDM_T02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MDM^T02 (HL7 v2.3) message string into a structured result. */
export function parseMDM_T02(messageString: string): Result<ParsedMDM_T02> {
  return new MDM_T02_Parser().parse(messageString);
}
