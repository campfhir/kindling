/**
 * Builder, parser and structure for PMU^B02 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}] [{AFF}] [{LAN}] [{EDU}] [{CER}]
 * Shares the PMU^B01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { PMU_B01_Parser, type ParsedPMU_B01, PMU_B01, type PMU_B01Options } from "./PMU_B01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { STF } from "./STF.ts";

export { PMU_B01_STRUCTURE as PMU_B02_STRUCTURE } from "./PMU_B01.ts";

/** Structured result of parsing an HL7 PMU^B02 (HL7 v2.6) message. */
export type ParsedPMU_B02 = ParsedPMU_B01;

/** Parser for HL7 PMU^B02 (HL7 v2.6) messages. */
export class PMU_B02_Parser extends PMU_B01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B02";
}

/** Parses an HL7 PMU^B02 (HL7 v2.6) message string into a structured result. */
export function parsePMU_B02(messageString: string): Result<ParsedPMU_B02> {
  return new PMU_B02_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B02 (HL7 v2.6) message. */
export type PMU_B02Options = PMU_B01Options;

/** Builder for HL7 PMU^B02 (HL7 v2.6) messages. */
export class PMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> extends PMU_B01<TMSH, TEVN, TSTF> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B02";
}

/** Builds an HL7 PMU^B02 (HL7 v2.6) message. */
export function createPMU_B02<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B02<TMSH, TEVN, TSTF> {
  return new PMU_B02(header, event, staff, options, encoding);
}
