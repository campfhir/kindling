/**
 * Builder, parser and structure for ADT^A49 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] MRG
 * Shares the ADT^A34 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import type { ParsedHL7MessageOf } from "../dispatch.ts";
import { ADT_A34_Parser, type ParsedADT_A34, ADT_A34, type ADT_A34Options } from "./ADT_A34.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { MRG } from "./MRG.ts";

export { ADT_A34_STRUCTURE as ADT_A49_STRUCTURE } from "./ADT_A34.ts";

/** Structured result of parsing an HL7 ADT^A49 (HL7 v2.3.1) message. */
export type ParsedADT_A49 = ParsedADT_A34;

/**
 * An HL7 ADT^A49 (HL7 v2.3.1) message as the root `parse()` returns it. Narrow a parsed
 * message to it with `isMessage<DispatchedADT_A49>(message, "2.3.1", "ADT_A49")` of `@campfhir/hl7/parse`.
 */
export type DispatchedADT_A49 = ParsedHL7MessageOf<"2.3.1", "ADT_A49", ParsedADT_A49>;

/** Parser for HL7 ADT^A49 (HL7 v2.3.1) messages. */
export class ADT_A49_Parser extends ADT_A34_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Parses an HL7 ADT^A49 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A49(messageString: string): Result<ParsedADT_A49> {
  return new ADT_A49_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A49 (HL7 v2.3.1) message. */
export type ADT_A49Options = ADT_A34Options;

/** Builder for HL7 ADT^A49 (HL7 v2.3.1) messages. */
export class ADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG> extends ADT_A34<TMSH, TEVN, TPID, TMRG> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A49";
}

/** Builds an HL7 ADT^A49 (HL7 v2.3.1) message. */
export function createADT_A49<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TMRG extends MRG = MRG>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  merge: TMRG,
  options: ADT_A49Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A49<TMSH, TEVN, TPID, TMRG> {
  return new ADT_A49(header, event, patient, merge, options, encoding);
}
