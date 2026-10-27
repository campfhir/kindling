/**
 * Parser for RQP^I04 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] { PROVIDER: PRD [{CTD}] } PID [{GSP}] [{GSR}] [{GSC}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] }] [{GT1}] [{NTE}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { RQP_I04_STRUCTURE } from "../../structures/v2.9.1/RQP_I04.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { PRD } from "../../segments/v2.9.1/PRD.ts";
import { CTD } from "../../segments/v2.9.1/CTD.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { GT1 } from "../../segments/v2.9.1/GT1.ts";
import { NTE } from "../../segments/v2.9.1/NTE.ts";

/** The PROVIDER group of a parsed RQP^I04 (HL7 v2.9.1) message. */
export interface ParsedProvider {
  /** The PRD segment. */
  provider: PRD;
  /** The CTD segments. */
  contacts?: CTD[];
}

/** The NEXT OF KIN group of a parsed RQP^I04 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segment. */
  nextOfKin: NK1;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** Structured result of parsing an HL7 RQP^I04 (HL7 v2.9.1) message. */
export interface ParsedRQP_I04 extends ParsedMessageBase {
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
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The GT1 segments. */
  guarantors?: GT1[];
  /** The NTE segments. */
  notes?: NTE[];
}

/** The segment parsers of RQP^I04 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PRD: (s, e) => PRD.parse(s, e),
  CTD: (s, e) => CTD.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  GT1: (s, e) => GT1.parse(s, e),
  NTE: (s, e) => NTE.parse(s, e),
};

/** Parser for HL7 RQP^I04 (HL7 v2.9.1) messages. */
export class RQP_I04_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "RQP_I04";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = RQP_I04_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedRQP_I04> {
    return parseStructure<ParsedRQP_I04>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 RQP^I04 (HL7 v2.9.1) message string into a structured result. */
export function parseRQP_I04(messageString: string): Result<ParsedRQP_I04> {
  return new RQP_I04_Parser().parse(messageString);
}
