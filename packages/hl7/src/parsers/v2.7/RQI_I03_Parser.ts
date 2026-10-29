/**
 * Parser for RQI^I03 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RQI_I03_STRUCTURE } from "../../structures/v2.7/RQI_I03.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { PRD } from "../../segments/v2.7/PRD.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { GT1 } from "../../segments/v2.7/GT1.ts";
import { IN1 } from "../../segments/v2.7/IN1.ts";
import { IN2 } from "../../segments/v2.7/IN2.ts";
import { IN3 } from "../../segments/v2.7/IN3.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";

/** The PROVIDER group of a parsed RQI^I03 (HL7 v2.7) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The GUARANTOR INSURANCE group of a parsed RQI^I03 (HL7 v2.7) message. */
export interface ParsedGuarantorInsurance {
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The INSURANCE groups. */
  insurances: ParsedInsurance[];
}

/** The INSURANCE group of a parsed RQI^I03 (HL7 v2.7) message. */
export interface ParsedInsurance {
  /** The IN1 segment. */
  insurance: IN1;
  /** The IN2 segment. */
  insuranceDetails?: IN2;
  /** The IN3 segment. */
  insuranceCertification?: IN3;
}

/** Structured result of parsing an HL7 RQI^I03 (HL7 v2.7) message. */
export interface ParsedRQI_I03 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GUARANTOR INSURANCE group. */
  guarantorInsurance?: ParsedGuarantorInsurance;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RQI^I03 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
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

/** Parser for HL7 RQI^I03 (HL7 v2.7) messages. */
export class RQI_I03_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQI_I03";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQI_I03_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQI_I03> {
    return parseStructure<ParsedRQI_I03>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQI^I03 (HL7 v2.7) message string into a structured result. */
export function parseRQI_I03(messageString: string): Result<ParsedRQI_I03> {
  return new RQI_I03_Parser().parse(messageString);
}
