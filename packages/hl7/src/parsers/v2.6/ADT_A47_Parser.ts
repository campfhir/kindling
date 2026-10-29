/**
 * Parser for ADT^A47 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [PD1] [{ARV}] MRG
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A47_STRUCTURE } from "../../structures/v2.6/ADT_A47.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { EVN } from "../../segments/v2.6/EVN.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { PD1 } from "../../segments/v2.6/PD1.ts";
import { ARV } from "../../segments/v2.6/ARV.ts";
import { MRG } from "../../segments/v2.6/MRG.ts";

/** Structured result of parsing an HL7 ADT^A47 (HL7 v2.6) message. */
export interface ParsedADT_A47 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The MRG segment. */
  merge: MRG;
}

/** The segment parsers of ADT^A47 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ARV: (s, e) => ARV.parse(s, e),
  MRG: (s, e) => MRG.parse(s, e),
};

/** Parser for HL7 ADT^A47 (HL7 v2.6) messages. */
export class ADT_A47_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A47";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A47_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A47> {
    return parseStructure<ParsedADT_A47>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A47 (HL7 v2.6) message string into a structured result. */
export function parseADT_A47(messageString: string): Result<ParsedADT_A47> {
  return new ADT_A47_Parser().parse(messageString);
}
