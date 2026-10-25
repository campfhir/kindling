/**
 * Parser for ADT^A02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID [PD1] [{ROL}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [PDA]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { ADT_A02_STRUCTURE } from "../../structures/v2.5/ADT_A02.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { PID } from "../../segments/v2.5/PID.ts";
import { PD1 } from "../../segments/v2.5/PD1.ts";
import { ROL } from "../../segments/v2.5/ROL.ts";
import { PV1 } from "../../segments/v2.5/PV1.ts";
import { PV2 } from "../../segments/v2.5/PV2.ts";
import { DB1 } from "../../segments/v2.5/DB1.ts";
import { OBX } from "../../segments/v2.5/OBX.ts";
import { PDA } from "../../segments/v2.5/PDA.ts";

/** Structured result of parsing an HL7 ADT^A02 (HL7 v2.5) message. */
export interface ParsedADT_A02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The EVN segment. */
  event: EVN;
  /** The PID segment. */
  patient: PID;
  /** The PD1 segment. */
  patientDemographics?: PD1;
  /** The ROL segments. */
  roles?: ROL[];
  /** The PV1 segment. */
  visit: PV1;
  /** The PV2 segment. */
  visitDetails?: PV2;
  /** The ROL segments. */
  visitRoles?: ROL[];
  /** The DB1 segments. */
  disabilities?: DB1[];
  /** The OBX segments. */
  observations?: OBX[];
  /** The PDA segment. */
  deathAndAutopsy?: PDA;
}

/** The segment parsers of ADT^A02 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  PD1: (s, e) => PD1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
  PV1: (s, e) => PV1.parse(s, e),
  PV2: (s, e) => PV2.parse(s, e),
  DB1: (s, e) => DB1.parse(s, e),
  OBX: (s, e) => OBX.parse(s, e),
  PDA: (s, e) => PDA.parse(s, e),
};

/** Parser for HL7 ADT^A02 (HL7 v2.5) messages. */
export class ADT_A02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "ADT_A02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = ADT_A02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedADT_A02> {
    return parseStructure<ParsedADT_A02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 ADT^A02 (HL7 v2.5) message string into a structured result. */
export function parseADT_A02(messageString: string): Result<ParsedADT_A02> {
  return new ADT_A02_Parser().parse(messageString);
}
