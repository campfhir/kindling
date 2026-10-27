/**
 * Parser for CCF^I22 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] PID [{GSP}] [{GSR}] [{GSC}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { CCF_I22_STRUCTURE } from "../../structures/v2.9.1/CCF_I22.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { PID } from "../../segments/v2.9.1/PID.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { GSC } from "../../segments/v2.9.1/GSC.ts";

/** Structured result of parsing an HL7 CCF^I22 (HL7 v2.9.1) message. */
export interface ParsedCCF_I22 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The PID segment. */
  patient: PID;
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
  /** The GSC segments. */
  gscList?: GSC[];
}

/** The segment parsers of CCF^I22 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  PID: (s, e) => PID.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  GSC: (s, e) => GSC.parse(s, e),
};

/** Parser for HL7 CCF^I22 (HL7 v2.9.1) messages. */
export class CCF_I22_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "CCF_I22";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = CCF_I22_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedCCF_I22> {
    return parseStructure<ParsedCCF_I22>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 CCF^I22 (HL7 v2.9.1) message string into a structured result. */
export function parseCCF_I22(messageString: string): Result<ParsedCCF_I22> {
  return new CCF_I22_Parser().parse(messageString);
}
