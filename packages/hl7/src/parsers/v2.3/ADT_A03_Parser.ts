/**
 * Parser for ADT^A03 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{OBX}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A03_STRUCTURE } from "../../structures/v2.3/ADT_A03.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { EVN } from "../../segments/v2.3/EVN.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { PD1 } from "../../segments/v2.3/PD1.ts";
import { PV1 } from "../../segments/v2.3/PV1.ts";
import { PV2 } from "../../segments/v2.3/PV2.ts";
import { DB1 } from "../../segments/v2.3/DB1.ts";
import { DG1 } from "../../segments/v2.3/DG1.ts";
import { DRG } from "../../segments/v2.3/DRG.ts";
import { PR1 } from "../../segments/v2.3/PR1.ts";
import { ROL } from "../../segments/v2.3/ROL.ts";
import { OBX } from "../../segments/v2.3/OBX.ts";

/** The PROCEDURE group of a parsed ADT^A03 (HL7 v2.3) message. */
export interface ParsedProcedure {
  /** The PR1 segment. */
  procedure: PR1;
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 ADT^A03 (HL7 v2.3) message. */
export interface ParsedADT_A03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The DG1 segments. */
  diagnoses?: DG1[];
  /** The DRG segment. */
  diagnosisRelatedGroup?: DRG;
  /** The PROCEDURE groups. */
  procedures?: ParsedProcedure[];
  /** The OBX segments. */
  observations?: OBX[];
}

/** The segment parsers of ADT^A03 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  DG1: (s, e) => DG1.parse(s, e),
  DRG: (s, e) => DRG.parse(s, e),
  PR1: (s, e) => PR1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 ADT^A03 (HL7 v2.3) messages. */
export class ADT_A03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A03> {
    return parseStructure<ParsedADT_A03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A03 (HL7 v2.3) message string into a structured result. */
export function parseADT_A03(messageString: string): Result<ParsedADT_A03> {
  return new ADT_A03_Parser().parse(messageString);
}
