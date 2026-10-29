/**
 * Parser for PMU^B01 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{NK1}] [{ROL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B01_STRUCTURE } from "../../structures/v2.7/PMU_B01.ts";
import { MSH } from "../../segments/v2.7/MSH.ts";
import { SFT } from "../../segments/v2.7/SFT.ts";
import { UAC } from "../../segments/v2.7/UAC.ts";
import { EVN } from "../../segments/v2.7/EVN.ts";
import { STF } from "../../segments/v2.7/STF.ts";
import { PRA } from "../../segments/v2.7/PRA.ts";
import { ORG } from "../../segments/v2.7/ORG.ts";
import { AFF } from "../../segments/v2.7/AFF.ts";
import { LAN } from "../../segments/v2.7/LAN.ts";
import { EDU } from "../../segments/v2.7/EDU.ts";
import { CER } from "../../segments/v2.7/CER.ts";
import { NK1 } from "../../segments/v2.7/NK1.ts";
import { ROL } from "../../segments/v2.7/ROL.ts";

/** Structured result of parsing an HL7 PMU^B01 (HL7 v2.7) message. */
export interface ParsedPMU_B01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The EVN segment. */
  event: EVN;
  /** The STF segment. */
  staff: STF;
  /** The PRA segments. */
  practitioners?: PRA[];
  /** The ORG segments. */
  organizationUnits?: ORG[];
  /** The AFF segments. */
  affiliations?: AFF[];
  /** The LAN segments. */
  languages?: LAN[];
  /** The EDU segments. */
  educations?: EDU[];
  /** The CER segments. */
  certificates?: CER[];
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The segment parsers of PMU^B01 (HL7 v2.7). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 PMU^B01 (HL7 v2.7) messages. */
export class PMU_B01_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B01";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B01_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B01> {
    return parseStructure<ParsedPMU_B01>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B01 (HL7 v2.7) message string into a structured result. */
export function parsePMU_B01(messageString: string): Result<ParsedPMU_B01> {
  return new PMU_B01_Parser().parse(messageString);
}
