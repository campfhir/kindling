/**
 * Parser for RAR^RAR messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] {RXA} RXR } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RAR_RAR_STRUCTURE } from "../../structures/v2.4/RAR_RAR.ts";
import { MSH } from "../../segments/v2.4/MSH.ts";
import { MSA } from "../../segments/v2.4/MSA.ts";
import { ERR } from "../../segments/v2.4/ERR.ts";
import { QRD } from "../../segments/v2.4/QRD.ts";
import { QRF } from "../../segments/v2.4/QRF.ts";
import { PID } from "../../segments/v2.4/PID.ts";
import { NTE } from "../../segments/v2.4/NTE.ts";
import { ORC } from "../../segments/v2.4/ORC.ts";
import { RXE } from "../../segments/v2.4/RXE.ts";
import { RXR } from "../../segments/v2.4/RXR.ts";
import { RXC } from "../../segments/v2.4/RXC.ts";
import { RXA } from "../../segments/v2.4/RXA.ts";
import { DSC } from "../../segments/v2.4/DSC.ts";

/** The DEFINITION group of a parsed RAR^RAR (HL7 v2.4) message. */
export interface ParsedDefinition {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PID segment. */
  patient?: PID;
  /** The NTE segments. */
  patientNotes?: NTE[];
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The ORDER group of a parsed RAR^RAR (HL7 v2.4) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXA segments. */
  administrations: RXA[];
  /** The RXR segment. */
  route: RXR;
}

/** The ENCODING group of a parsed RAR^RAR (HL7 v2.4) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RAR^RAR (HL7 v2.4) message. */
export interface ParsedRAR_RAR extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segment. */
  error?: ERR;
  /** The DEFINITION groups. */
  definitions: ParsedDefinition[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RAR^RAR (HL7 v2.4). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXA: (s, e) => RXA.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RAR^RAR (HL7 v2.4) messages. */
export class RAR_RAR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RAR_RAR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RAR_RAR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRAR_RAR> {
    return parseStructure<ParsedRAR_RAR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RAR^RAR (HL7 v2.4) message string into a structured result. */
export function parseRAR_RAR(messageString: string): Result<ParsedRAR_RAR> {
  return new RAR_RAR_Parser().parse(messageString);
}
