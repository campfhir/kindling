/**
 * Parser for MFN^M18 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] MFI { MF_PAYER: MFE { PAYER_MF_ENTRY: PM1 { PAYER_MF_COVERAGE: MCP [{DPS}] } } } MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import type { StructureItem } from "../../types/schema.ts";
import { parseStructure, type ParsedMessageBase, type SegmentParsers } from "../../types/structure.ts";
import { MFN_M18_STRUCTURE } from "../../structures/v2.9.1/MFN_M18.ts";
import { MSH } from "../../segments/v2.9.1/MSH.ts";
import { SFT } from "../../segments/v2.9.1/SFT.ts";
import { UAC } from "../../segments/v2.9.1/UAC.ts";
import { MFI } from "../../segments/v2.9.1/MFI.ts";
import { MFE } from "../../segments/v2.9.1/MFE.ts";
import { PM1 } from "../../segments/v2.9.1/PM1.ts";
import { MCP } from "../../segments/v2.9.1/MCP.ts";
import { DPS } from "../../segments/v2.9.1/DPS.ts";
import { MSA } from "../../segments/v2.9.1/MSA.ts";
import { ERR } from "../../segments/v2.9.1/ERR.ts";
import { MFA } from "../../segments/v2.9.1/MFA.ts";

/** The MF PAYER group of a parsed MFN^M18 (HL7 v2.9.1) message. */
export interface ParsedMfPayer {
  /** The MFE segment. */
  entry: MFE;
  /** The PAYER MF ENTRY groups. */
  payerMfEntrys: ParsedPayerMfEntry[];
}

/** The PAYER MF ENTRY group of a parsed MFN^M18 (HL7 v2.9.1) message. */
export interface ParsedPayerMfEntry {
  /** The PM1 segment. */
  pm1: PM1;
  /** The PAYER MF COVERAGE groups. */
  payerMfCoverages: ParsedPayerMfCoverage[];
}

/** The PAYER MF COVERAGE group of a parsed MFN^M18 (HL7 v2.9.1) message. */
export interface ParsedPayerMfCoverage {
  /** The MCP segment. */
  mcp: MCP;
  /** The DPS segments. */
  dpsList?: DPS[];
}

/** Structured result of parsing an HL7 MFN^M18 (HL7 v2.9.1) message. */
export interface ParsedMFN_M18 extends ParsedMessageBase {
  /** The MSH segment. */
  header: MSH;
  /** The SFT segments. */
  software?: SFT[];
  /** The UAC segment. */
  uac?: UAC;
  /** The MFI segment. */
  masterFile: MFI;
  /** The MF PAYER groups. */
  mfPayers: ParsedMfPayer[];
  /** The MSH segment. */
  msh2: MSH;
  /** The SFT segments. */
  sft2?: SFT[];
  /** The UAC segment. */
  uac2?: UAC;
  /** The MSA segment. */
  acknowledgment: MSA;
  /** The ERR segments. */
  errors?: ERR[];
  /** The MFI segment. */
  mfi2: MFI;
  /** The MFA segments. */
  entryAcknowledgments?: MFA[];
}

/** The segment parsers of MFN^M18 (HL7 v2.9.1). */
const PARSERS: SegmentParsers = {
  MSH: (s) => MSH.parse(s),
  SFT: (s, e) => SFT.parse(s, e),
  UAC: (s, e) => UAC.parse(s, e),
  MFI: (s, e) => MFI.parse(s, e),
  MFE: (s, e) => MFE.parse(s, e),
  PM1: (s, e) => PM1.parse(s, e),
  MCP: (s, e) => MCP.parse(s, e),
  DPS: (s, e) => DPS.parse(s, e),
  MSA: (s, e) => MSA.parse(s, e),
  ERR: (s, e) => ERR.parse(s, e),
  MFA: (s, e) => MFA.parse(s, e),
};

/** Parser for HL7 MFN^M18 (HL7 v2.9.1) messages. */
export class MFN_M18_Parser {
  /** The message name used in error messages. */
  protected readonly messageName: string = "MFN_M18";
  /** The structure the message is parsed against. */
  protected readonly structure: StructureItem[] = MFN_M18_STRUCTURE;
  /** The segment parsers, keyed by segment name. */
  protected readonly parsers: SegmentParsers = PARSERS;

  /** Parses the input string into a structured instance. */
  parse(messageString: string): Result<ParsedMFN_M18> {
    return parseStructure<ParsedMFN_M18>(this.messageName, this.structure, this.parsers, messageString);
  }
}

/** Parses an HL7 MFN^M18 (HL7 v2.9.1) message string into a structured result. */
export function parseMFN_M18(messageString: string): Result<ParsedMFN_M18> {
  return new MFN_M18_Parser().parse(messageString);
}
