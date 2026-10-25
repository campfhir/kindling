/**
 * Parser for VXX^V02 messages (HL7 v2.5.1).
 *
 * Structure: MSH MSA [{SFT}] QRD [QRF] { PATIENT: PID [{NK1}] }
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { VXX_V02_STRUCTURE } from "../../structures/v2.5.1/VXX_V02.ts";
import { MSH } from "../../segments/v2.5.1/MSH.ts";
import { MSA } from "../../segments/v2.5.1/MSA.ts";
import { SFT } from "../../segments/v2.5.1/SFT.ts";
import { QRD } from "../../segments/v2.5.1/QRD.ts";
import { QRF } from "../../segments/v2.5.1/QRF.ts";
import { PID } from "../../segments/v2.5.1/PID.ts";
import { NK1 } from "../../segments/v2.5.1/NK1.ts";

/** The PATIENT group of a parsed VXX^V02 (HL7 v2.5.1) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NK1 segments. */
  nextOfKin?: NK1[];
}

/** Structured result of parsing an HL7 VXX^V02 (HL7 v2.5.1) message. */
export interface ParsedVXX_V02 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The SFT segments. */
  software?: SFT[];
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PATIENT groups. */
  patients: ParsedPatient[];
}

/** The segment parsers of VXX^V02 (HL7 v2.5.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
};

/** Parser for HL7 VXX^V02 (HL7 v2.5.1) messages. */
export class VXX_V02_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "VXX_V02";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = VXX_V02_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedVXX_V02> {
    return parseStructure<ParsedVXX_V02>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 VXX^V02 (HL7 v2.5.1) message string into a structured result. */
export function parseVXX_V02(messageString: string): Result<ParsedVXX_V02> {
  return new VXX_V02_Parser().parse(messageString);
}
