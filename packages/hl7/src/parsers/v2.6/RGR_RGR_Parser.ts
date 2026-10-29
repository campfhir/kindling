/**
 * Parser for RGR^RGR messages (HL7 v2.6).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] { DEFINITION: QRD [QRF] [ PATIENT: PID [{NTE}] ] { ORDER: ORC [ ENCODING: RXE {RXR} [{RXC}] ] {RXG} {RXR} [{RXC}] } } [DSC]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RGR_RGR_STRUCTURE } from "../../structures/v2.6/RGR_RGR.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { MSA } from "../../segments/v2.6/MSA.ts";
import { ERR } from "../../segments/v2.6/ERR.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { QRD } from "../../segments/v2.6/QRD.ts";
import { QRF } from "../../segments/v2.6/QRF.ts";
import { PID } from "../../segments/v2.6/PID.ts";
import { NTE } from "../../segments/v2.6/NTE.ts";
import { ORC } from "../../segments/v2.6/ORC.ts";
import { RXE } from "../../segments/v2.6/RXE.ts";
import { RXR } from "../../segments/v2.6/RXR.ts";
import { RXC } from "../../segments/v2.6/RXC.ts";
import { RXG } from "../../segments/v2.6/RXG.ts";
import { DSC } from "../../segments/v2.6/DSC.ts";

/** The DEFINITION group of a parsed RGR^RGR (HL7 v2.6) message. */
export interface ParsedDefinition {
  /** The QRD segment. */
  query: QRD;
  /** The QRF segment. */
  queryFilter?: QRF;
  /** The PATIENT group. */
  patient?: ParsedPatient;
  /** The ORDER groups. */
  orders: ParsedOrder[];
}

/** The PATIENT group of a parsed RGR^RGR (HL7 v2.6) message. */
export interface ParsedPatient {
  /** The PID segment. */
  patient: PID;
  /** The NTE segments. */
  notes?: NTE[];
}

/** The ORDER group of a parsed RGR^RGR (HL7 v2.6) message. */
export interface ParsedOrder {
  /** The ORC segment. */
  commonOrder: ORC;
  /** The ENCODING group. */
  encoding?: ParsedEncoding;
  /** The RXG segments. */
  gives: RXG[];
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** The ENCODING group of a parsed RGR^RGR (HL7 v2.6) message. */
export interface ParsedEncoding {
  /** The RXE segment. */
  encodedOrder: RXE;
  /** The RXR segments. */
  routes: RXR[];
  /** The RXC segments. */
  components?: RXC[];
}

/** Structured result of parsing an HL7 RGR^RGR (HL7 v2.6) message. */
export interface ParsedRGR_RGR extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The DEFINITION groups. */
  definitions: ParsedDefinition[];
  /** The DSC segment. */
  continuation?: DSC;
}

/** The segment parsers of RGR^RGR (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  QRD: (s, e) => QRD.parse(s, e),
  QRF: (s, e) => QRF.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
  ORC: (s, e) => ORC.parse(s, e),
  RXE: (s, e) => RXE.parse(s, e),
  RXR: (s, e) => RXR.parse(s, e),
  RXC: (s, e) => RXC.parse(s, e),
  RXG: (s, e) => RXG.parse(s, e),
  DSC: (s, e) => DSC.parse(s, e),
};

/** Parser for HL7 RGR^RGR (HL7 v2.6) messages. */
export class RGR_RGR_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RGR_RGR";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RGR_RGR_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRGR_RGR> {
    return parseStructure<ParsedRGR_RGR>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RGR^RGR (HL7 v2.6) message string into a structured result. */
export function parseRGR_RGR(messageString: string): Result<ParsedRGR_RGR> {
  return new RGR_RGR_Parser().parse(messageString);
}
