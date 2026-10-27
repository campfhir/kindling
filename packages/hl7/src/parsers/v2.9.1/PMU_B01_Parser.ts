/**
 * Parser for PMU^B01 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{GSP}] [{GSR}] [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}] [{ NEXT_OF_KIN: [{NK1}] [{GSP}] [{GSR}] }] [{PRT}] [{ROL}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B01_STRUCTURE } from "../../structures/v2.9.1/PMU_B01.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { EVN } from "../../segments/v2.9.1/EVN.ts";
import { STF } from "../../segments/v2.9.1/STF.ts";
import { GSP } from "../../segments/v2.9.1/GSP.ts";
import { GSR } from "../../segments/v2.9.1/GSR.ts";
import { PRA } from "../../segments/v2.9.1/PRA.ts";
import { ORG } from "../../segments/v2.9.1/ORG.ts";
import { AFF } from "../../segments/v2.9.1/AFF.ts";
import { LAN } from "../../segments/v2.9.1/LAN.ts";
import { EDU } from "../../segments/v2.9.1/EDU.ts";
import { CER } from "../../segments/v2.9.1/CER.ts";
import { NK1 } from "../../segments/v2.9.1/NK1.ts";
import { PRT } from "../../segments/v2.9.1/PRT.ts";
import { ROL } from "../../segments/v2.9.1/ROL.ts";

/** The NEXT OF KIN group of a parsed PMU^B01 (HL7 v2.9.1) message. */
export interface ParsedNextOfKin {
  /** The NK1 segments. */
  nextOfKin?: NK1[];
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
}

/** Structured result of parsing an HL7 PMU^B01 (HL7 v2.9.1) message. */
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
  /** The GSP segments. */
  gspList?: GSP[];
  /** The GSR segments. */
  gsrList?: GSR[];
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
  /** The NEXT OF KIN groups. */
  nextOfKins?: ParsedNextOfKin[];
  /** The PRT segments. */
  prtList?: PRT[];
  /** The ROL segments. */
  roles?: ROL[];
}

/** The segment parsers of PMU^B01 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  GSP: (s, e) => GSP.parse(s, e),
  GSR: (s, e) => GSR.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  NK1: (s, e) => NK1.parse(s, e),
  PRT: (s, e) => PRT.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 PMU^B01 (HL7 v2.9.1) messages. */
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

/** Parses an HL7 PMU^B01 (HL7 v2.9.1) message string into a structured result. */
export function parsePMU_B01(messageString: string): Result<ParsedPMU_B01> {
  return new PMU_B01_Parser().parse(messageString);
}
