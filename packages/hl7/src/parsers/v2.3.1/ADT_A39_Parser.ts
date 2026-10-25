/**
 * Parser for ADT^A39 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN { PATIENT: PID [PD1] MRG [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A39_STRUCTURE } from "../../structures/v2.3.1/ADT_A39.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { EVN } from "../../segments/v2.3.1/EVN.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { PD1 } from "../../segments/v2.3.1/PD1.ts";
import { MRG } from "../../segments/v2.3.1/MRG.ts";
import { PV1 } from "../../segments/v2.3.1/PV1.ts";

/** The PATIENT group of a parsed ADT^A39 (HL7 v2.3.1) message. */
export interface ParsedMergePatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 ADT^A39 (HL7 v2.3.1) message. */
export interface ParsedADT_A39 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedMergePatient[];
}

/** The segment parsers of ADT^A39 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 ADT^A39 (HL7 v2.3.1) messages. */
export class ADT_A39_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A39";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A39_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A39> {
    return parseStructure<ParsedADT_A39>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A39 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A39(messageString: string): Result<ParsedADT_A39> {
  return new ADT_A39_Parser().parse(messageString);
}
