/**
 * Parser for ADT^A43 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A43_STRUCTURE } from "../../structures/v2.7/ADT_A43.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { MRG } from "../../segments/v2.7/MRG.ts";

/** The PATIENT group of a parsed ADT^A43 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
}

/** Structured result of parsing an HL7 ADT^A43 (HL7 v2.7) message. */
export interface ParsedADT_A43 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of ADT^A43 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
};

/** Parser for HL7 ADT^A43 (HL7 v2.7) messages. */
export class ADT_A43_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A43";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A43_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A43> {
    return parseStructure<ParsedADT_A43>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A43 (HL7 v2.7) message string into a structured result. */
export function parseADT_A43(messageString: string): Result<ParsedADT_A43> {
  return new ADT_A43_Parser().parse(messageString);
}
