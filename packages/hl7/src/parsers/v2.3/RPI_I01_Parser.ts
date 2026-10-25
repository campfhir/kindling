/**
 * Parser for RPI^I01 messages (HL7 v2.3).
 *
 * Structure: MSH MSA { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RPI_I01_STRUCTURE } from "../../structures/v2.3/RPI_I01.ts";
import { MSH } from "../../segments/v2.3/MSH.ts";
import { MSA } from "../../segments/v2.3/MSA.ts";
import { PRD } from "../../segments/v2.3/PRD.ts";
import { CTD } from "../../segments/v2.3/CTD.ts";
import { PID } from "../../segments/v2.3/PID.ts";
import { NK1 } from "../../segments/v2.3/NK1.ts";
import { GT1 } from "../../segments/v2.3/GT1.ts";
import { IN1 } from "../../segments/v2.3/IN1.ts";
import { IN2 } from "../../segments/v2.3/IN2.ts";
import { IN3 } from "../../segments/v2.3/IN3.ts";
import { NTE } from "../../segments/v2.3/NTE.ts";

/** The PROVIDER group of a parsed RPI^I01 (HL7 v2.3) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The INSURANCE group of a parsed RPI^I01 (HL7 v2.3) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** Structured result of parsing an HL7 RPI^I01 (HL7 v2.3) message. */
export interface ParsedRPI_I01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances?: ParsedInsurance[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RPI^I01 (HL7 v2.3). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  IN1: (s, e) => IN1.parse(s, e),
  IN2: (s, e) => IN2.parse(s, e),
  IN3: (s, e) => IN3.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RPI^I01 (HL7 v2.3) messages. */
export class RPI_I01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RPI_I01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RPI_I01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRPI_I01> {
    return parseStructure<ParsedRPI_I01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RPI^I01 (HL7 v2.3) message string into a structured result. */
export function parseRPI_I01(messageString: string): Result<ParsedRPI_I01> {
  return new RPI_I01_Parser().parse(messageString);
}
