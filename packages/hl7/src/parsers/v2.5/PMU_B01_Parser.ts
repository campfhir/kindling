/**
 * Parser for PMU^B01 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B01_STRUCTURE } from "../../structures/v2.5/PMU_B01.ts";
import { MSH } from "../../segments/v2.5/MSH.ts";
import { SFT } from "../../segments/v2.5/SFT.ts";
import { EVN } from "../../segments/v2.5/EVN.ts";
import { STF } from "../../segments/v2.5/STF.ts";
import { PRA } from "../../segments/v2.5/PRA.ts";
import { ORG } from "../../segments/v2.5/ORG.ts";
import { AFF } from "../../segments/v2.5/AFF.ts";
import { LAN } from "../../segments/v2.5/LAN.ts";
import { EDU } from "../../segments/v2.5/EDU.ts";
import { CER } from "../../segments/v2.5/CER.ts";

/** Structured result of parsing an HL7 PMU^B01 (HL7 v2.5) message. */
export interface ParsedPMU_B01 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
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
}

/** The segment parsers of PMU^B01 (HL7 v2.5). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  ORG: (s, e) => ORG.parse(s, e),
  AFF: (s, e) => AFF.parse(s, e),
  LAN: (s, e) => LAN.parse(s, e),
  EDU: (s, e) => EDU.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
};

/** Parser for HL7 PMU^B01 (HL7 v2.5) messages. */
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

/** Parses an HL7 PMU^B01 (HL7 v2.5) message string into a structured result. */
export function parsePMU_B01(messageString: string): Result<ParsedPMU_B01> {
  return new PMU_B01_Parser().parse(messageString);
}
