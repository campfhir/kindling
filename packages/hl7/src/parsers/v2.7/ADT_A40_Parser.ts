/**
 * Parser for ADT^A40 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN { PATIENT: PID [PD1] MRG [PV1] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A40_STRUCTURE } from "../../structures/v2.7/ADT_A40.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { PD1 } from "../../segments/v2.7/PD1.ts";
import { MRG } from "../../segments/v2.7/MRG.ts";
import { PV1 } from "../../segments/v2.7/PV1.ts";

/** The PATIENT group of a parsed ADT^A40 (HL7 v2.7) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The MRG segment. */
  merge: MRG;
  /** The PV1 segment. */
  visit?: PV1;
}

/** Structured result of parsing an HL7 ADT^A40 (HL7 v2.7) message. */
export interface ParsedADT_A40 extends ParsedMessageBase {
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

/** The segment parsers of ADT^A40 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
};

/** Parser for HL7 ADT^A40 (HL7 v2.7) messages. */
export class ADT_A40_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A40";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A40_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A40> {
    return parseStructure<ParsedADT_A40>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A40 (HL7 v2.7) message string into a structured result. */
export function parseADT_A40(messageString: string): Result<ParsedADT_A40> {
  return new ADT_A40_Parser().parse(messageString);
}
