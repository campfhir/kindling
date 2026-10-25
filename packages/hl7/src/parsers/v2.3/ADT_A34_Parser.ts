/**
 * Parser for ADT^A34 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] MRG
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A34_STRUCTURE } from "../../structures/v2.3/ADT_A34.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { MRG } from "../../segments/v2.3/MRG.ts";

/** Structured result of parsing an HL7 ADT^A34 (HL7 v2.3) message. */
export interface ParsedADT_A34 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
}

/** The segment parsers of ADT^A34 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
};

/** Parser for HL7 ADT^A34 (HL7 v2.3) messages. */
export class ADT_A34_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A34";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A34_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A34> {
    return parseStructure<ParsedADT_A34>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A34 (HL7 v2.3) message string into a structured result. */
export function parseADT_A34(messageString: string): Result<ParsedADT_A34> {
  return new ADT_A34_Parser().parse(messageString);
}
