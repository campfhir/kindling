/**
 * Parser for RRE^O26 messages (HL7 v2.7).
 *
 * Structure: MSH MSA [{ERR}] [{SFT}] [UAC] [{NTE}] [ RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] [ ENCODING: RXE [{NTE}] { TIMING_ENCODED: TQ1 [{TQ2}] } {RXR} [{RXC}] ] [{PRT}] } ]
 * Shares the RRE^O12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RRE_O12_Parser, type ParsedRRE_O12 } from "./RRE_O12_Parser.ts";

export type { ParsedResponse, ParsedPatient, ParsedOrder, ParsedTiming, ParsedEncoding, ParsedTimingEncoded } from "./RRE_O12_Parser.ts";
/** Structured result of parsing an HL7 RRE^O26 (HL7 v2.7) message. */
export type ParsedRRE_O26 = ParsedRRE_O12;

/** Parser for HL7 RRE^O26 (HL7 v2.7) messages. */
export class RRE_O26_Parser extends RRE_O12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRE_O26";
}

/** Parses an HL7 RRE^O26 (HL7 v2.7) message string into a structured result. */
export function parseRRE_O26(messageString: string): Result<ParsedRRE_O26> {
  return new RRE_O26_Parser().parse(messageString);
}
