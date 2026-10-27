/**
 * Parser for DBU^O42 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] [ DONOR: PID [PD1] [{PRT}] [{ DONOR_OBSERVATIONS: OBX [{PRT}] }] [{NTE}] [{AL1}] [{ARV}] ]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { DBU_O42_STRUCTURE } from "../../structures/v2.9.1/DBU_O42.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { ARV } from "../../segments/v2.9.1/ARV.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { PD1 } from "../../segments/v2.9.1/PD1.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { OBX } from "../../segments/v2.9.1/OBX.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";
import { AL1 } from "../../segments/v2.9.1/AL1.ts";

/** The DONOR group of a parsed DBU^O42 (HL7 v2.9.1) message. */
export interface ParsedDonor {
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PRT segments. */
  prtList?: PRT[];
  /** The DONOR OBSERVATIONS groups. */
  donorObservations?: ParsedDonorObservations[];
  /** The NTE segments. */
  notes?: NTE[];
  /** The AL1 segments. */
  allergies?: AL1[];
  /** The ARV segments. */
  arvList?: ARV[];
}

/** The DONOR OBSERVATIONS group of a parsed DBU^O42 (HL7 v2.9.1) message. */
export interface ParsedDonorObservations {
  /** The OBX segment. */
  observation: OBX;
  /** The PRT segments. */
  prtList?: PRT[];
}

/** Structured result of parsing an HL7 DBU^O42 (HL7 v2.9.1) message. */
export interface ParsedDBU_O42 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The ARV segments. */
  arvList?: ARV[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DONOR group. */
  donor?: ParsedDonor;
}

/** The segment parsers of DBU^O42 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  ARV: (s, e) => ARV.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  AL1: (s, e) => AL1.parse(s, e),
};

/** Parser for HL7 DBU^O42 (HL7 v2.9.1) messages. */
export class DBU_O42_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "DBU_O42";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = DBU_O42_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedDBU_O42> {
    return parseStructure<ParsedDBU_O42>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 DBU^O42 (HL7 v2.9.1) message string into a structured result. */
export function parseDBU_O42(messageString: string): Result<ParsedDBU_O42> {
  return new DBU_O42_Parser().parse(messageString);
}
