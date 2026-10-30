/**
 * Builder, parser and structure for RRE^O26 messages (HL7 v2.9).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{PRT}] [{NTE}] ] { ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{PRT}] [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] } ]
 * Shares the RRE^O12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RRE_O12_Parser, type ParsedRRE_O12, RRE_O12, type RRE_O12Options, type ResponseGroup, type PatientGroup, type OrderGroup, type TimingGroup, type EncodingGroup, type TimingEncodedGroup } from "./RRE_O12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";

export { RRE_O12_STRUCTURE as RRE_O26_STRUCTURE } from "./RRE_O12.ts";

export type { ParsedResponse, ParsedPatient, ParsedOrder, ParsedTiming, ParsedEncoding, ParsedTimingEncoded } from "./RRE_O12.ts";
/** Structured result of parsing an HL7 RRE^O26 (HL7 v2.9) message. */
export type ParsedRRE_O26 = ParsedRRE_O12;

/** Parser for HL7 RRE^O26 (HL7 v2.9) messages. */
export class RRE_O26_Parser extends RRE_O12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRE_O26";
}

/** Parses an HL7 RRE^O26 (HL7 v2.9) message string into a structured result. */
export function parseRRE_O26(messageString: string): Result<ParsedRRE_O26> {
  return new RRE_O26_Parser().parse(messageString);
}

export type { ResponseGroup, PatientGroup, OrderGroup, TimingGroup, EncodingGroup, TimingEncodedGroup };
/** The optional segments and groups of an RRE^O26 (HL7 v2.9) message. */
export type RRE_O26Options = RRE_O12Options;

/** Builder for HL7 RRE^O26 (HL7 v2.9) messages. */
export class RRE_O26<TMSH extends MSH = MSH, TMSA extends MSA = MSA> extends RRE_O12<TMSH, TMSA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRE_O26";
}

/** Builds an HL7 RRE^O26 (HL7 v2.9) message. */
export function createRRE_O26<TMSH extends MSH = MSH, TMSA extends MSA = MSA>(
  header: TMSH,
  acknowledgment: TMSA,
  options: RRE_O26Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRE_O26<TMSH, TMSA> {
  return new RRE_O26(header, acknowledgment, options, encoding);
}
