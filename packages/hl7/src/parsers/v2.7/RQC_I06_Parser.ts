/**
 * Parser for RQC^I06 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RQC_I06_STRUCTURE } from "../../structures/v2.7/RQC_I06.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { QRD } from "../../segments/v2.7/QRD.ts";
import { QRF } from "../../segments/v2.7/QRF.ts";
import { PRD } from "../../segments/v2.7/PRD.ts";
import { CTD } from "../../segments/v2.7/CTD.ts";
import { PID } from "../../segments/v2.7/PID.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { GT1 } from "../../segments/v2.7/GT1.ts";
import { NTE } from "../../segments/v2.7/NTE.ts";

/** The PROVIDER group of a parsed RQC^I06 (HL7 v2.7) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RQC^I06 (HL7 v2.7) message. */
export interface ParsedRQC_I06 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PROVIDER groups. */
  providers: ParsedProvider[];
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RQC^I06 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RQC^I06 (HL7 v2.7) messages. */
export class RQC_I06_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQC_I06";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQC_I06_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQC_I06> {
    return parseStructure<ParsedRQC_I06>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQC^I06 (HL7 v2.7) message string into a structured result. */
export function parseRQC_I06(messageString: string): Result<ParsedRQC_I06> {
  return new RQC_I06_Parser().parse(messageString);
}
