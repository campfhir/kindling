/**
 * Parser for RQC^I05 messages (HL7 v2.3.1).
 *
 * Structure: MSH QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RQC_I05_STRUCTURE } from "../../structures/v2.3.1/RQC_I05.ts";
import { MSH } from "../../segments/v2.3.1/MSH.ts";
import { QRD } from "../../segments/v2.3.1/QRD.ts";
import { QRF } from "../../segments/v2.3.1/QRF.ts";
import { PRD } from "../../segments/v2.3.1/PRD.ts";
import { CTD } from "../../segments/v2.3.1/CTD.ts";
import { PID } from "../../segments/v2.3.1/PID.ts";
import { NK1 } from "../../segments/v2.3.1/NK1.ts";
import { GT1 } from "../../segments/v2.3.1/GT1.ts";
import { NTE } from "../../segments/v2.3.1/NTE.ts";

/** The PROVIDER group of a parsed RQC^I05 (HL7 v2.3.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** Structured result of parsing an HL7 RQC^I05 (HL7 v2.3.1) message. */
export interface ParsedRQC_I05 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
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

/** The segment parsers of RQC^I05 (HL7 v2.3.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RQC^I05 (HL7 v2.3.1) messages. */
export class RQC_I05_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQC_I05";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQC_I05_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQC_I05> {
    return parseStructure<ParsedRQC_I05>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQC^I05 (HL7 v2.3.1) message string into a structured result. */
export function parseRQC_I05(messageString: string): Result<ParsedRQC_I05> {
  return new RQC_I05_Parser().parse(messageString);
}
