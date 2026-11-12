/**
 * Builder, parser and structure for PMU^B06 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC] EVN STF [{PRA}] [{ORG}]
 * Shares the PMU^B04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { PMU_B04_Parser, type ParsedPMU_B04, PMU_B04, type PMU_B04Options } from "./PMU_B04.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { STF } from "./STF.ts";

export { PMU_B04_STRUCTURE as PMU_B06_STRUCTURE } from "./PMU_B04.ts";

/** Structured result of parsing an HL7 PMU^B06 (HL7 v2.8) message. */
export type ParsedPMU_B06 = ParsedPMU_B04;

/**
 * An HL7 PMU^B06 (HL7 v2.8) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedPMU_B06>(message, "2.8", "PMU_B06")` of `@campfhir/hl7/parse`.
 */
export type DispatchedPMU_B06 = ParsedHL7MessageOf<"2.8", "PMU_B06", ParsedPMU_B06>;

/** Parser for HL7 PMU^B06 (HL7 v2.8) messages. */
export class PMU_B06_Parser extends PMU_B04_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B06";
}

/** Parses an HL7 PMU^B06 (HL7 v2.8) message string into a structured result. */
export function parsePMU_B06(messageString: string): Result<ParsedPMU_B06> {
  return new PMU_B06_Parser().parse(messageString);
}

/** The optional segments and groups of an PMU^B06 (HL7 v2.8) message. */
export type PMU_B06Options = PMU_B04Options;

/** Builder for HL7 PMU^B06 (HL7 v2.8) messages. */
export class PMU_B06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF> extends PMU_B04<TMSH, TEVN, TSTF> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PMU_B06";
}

/** Builds an HL7 PMU^B06 (HL7 v2.8) message. */
export function createPMU_B06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TSTF extends STF = STF>(
  header: TMSH,
  event: TEVN,
  staff: TSTF,
  options: PMU_B06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): PMU_B06<TMSH, TEVN, TSTF> {
  return new PMU_B06(header, event, staff, options, encoding);
}
