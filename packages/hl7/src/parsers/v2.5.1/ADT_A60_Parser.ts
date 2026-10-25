/**
 * Parser for ADT^A60 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID [PV1] [PV2] [{IAM}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A60_STRUCTURE } from "../../structures/v2.5.1/ADT_A60.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { IAM } from "../../segments/v2.5.1/IAM.ts";

/** Structured result of parsing an HL7 ADT^A60 (HL7 v2.5.1) message. */
export interface ParsedADT_A60 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PV1 segment. */
  visit?: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The IAM segments. */
  adverseReactions?: IAM[];
}

/** The segment parsers of ADT^A60 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  IAM: (s, e) => IAM.parse(s, e),
};

/** Parser for HL7 ADT^A60 (HL7 v2.5.1) messages. */
export class ADT_A60_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A60";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A60_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A60> {
    return parseStructure<ParsedADT_A60>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A60 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A60(messageString: string): Result<ParsedADT_A60> {
  return new ADT_A60_Parser().parse(messageString);
}
