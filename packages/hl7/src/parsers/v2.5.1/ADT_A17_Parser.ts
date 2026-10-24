/**
 * Parser for ADT^A17 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN { PATIENT: PID [PD1] PV1 [PV2] [{DB1}] [{OBX}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A17_STRUCTURE } from "../../structures/v2.5.1/ADT_A17.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { EVN } from "../../segments/v2.5.1/EVN.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { PD1 } from "../../segments/v2.5.1/PD1.ts";
import { PV1 } from "../../segments/v2.5.1/PV1.ts";
import { PV2 } from "../../segments/v2.5.1/PV2.ts";
import { DB1 } from "../../segments/v2.5.1/DB1.ts";
import { OBX } from "../../segments/v2.5.1/OBX.ts";

/** The PATIENT group of a parsed ADT^A17 (HL7 v2.5.1) message. */
export interface ParsedSwapPatient {
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
  /** The OBX segments. */
  observations?: OBX[];
}

/** Structured result of parsing an HL7 ADT^A17 (HL7 v2.5.1) message. */
export interface ParsedADT_A17 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PATIENT groups. */
  patients: ParsedSwapPatient[];
}

/** The segment parsers of ADT^A17 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
};

/** Parser for HL7 ADT^A17 (HL7 v2.5.1) messages. */
export class ADT_A17_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A17";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A17_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A17> {
    return parseStructure<ParsedADT_A17>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A17 (HL7 v2.5.1) message string into a structured result. */
export function parseADT_A17(messageString: string): Result<ParsedADT_A17> {
  return new ADT_A17_Parser().parse(messageString);
}
