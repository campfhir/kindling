/**
 * Parser for PMU^B07 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [PRA] [{ CERTIFICATE: CER [{ROL}] }]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { PMU_B07_STRUCTURE } from "../../structures/v2.6/PMU_B07.ts";
import { MSH } from "../../segments/v2.6/MSH.ts";
import { SFT } from "../../segments/v2.6/SFT.ts";
import { UAC } from "../../segments/v2.6/UAC.ts";
import { EVN } from "../../segments/v2.6/EVN.ts";
import { STF } from "../../segments/v2.6/STF.ts";
import { PRA } from "../../segments/v2.6/PRA.ts";
import { CER } from "../../segments/v2.6/CER.ts";
import { ROL } from "../../segments/v2.6/ROL.ts";

/** The CERTIFICATE group of a parsed PMU^B07 (HL7 v2.6) message. */
export interface ParsedCertificate {
  /** The CER segment. */
  certificate: CER;
  /** The ROL segments. */
  roles?: ROL[];
}

/** Structured result of parsing an HL7 PMU^B07 (HL7 v2.6) message. */
export interface ParsedPMU_B07 extends ParsedMessageBase {
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
  /** The PRA segment. */
  practitioner?: PRA;
  /** The CERTIFICATE groups. */
  certificates?: ParsedCertificate[];
}

/** The segment parsers of PMU^B07 (HL7 v2.6). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  EVN: (s, e) => EVN.parse(s, e),
  STF: (s, e) => STF.parse(s, e),
  PRA: (s, e) => PRA.parse(s, e),
  CER: (s, e) => CER.parse(s, e),
  ROL: (s, e) => ROL.parse(s, e),
};

/** Parser for HL7 PMU^B07 (HL7 v2.6) messages. */
export class PMU_B07_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "PMU_B07";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = PMU_B07_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedPMU_B07> {
    return parseStructure<ParsedPMU_B07>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 PMU^B07 (HL7 v2.6) message string into a structured result. */
export function parsePMU_B07(messageString: string): Result<ParsedPMU_B07> {
  return new PMU_B07_Parser().parse(messageString);
}
