/**
 * Parser for ORF^W02 messages (HL7 v2.3).
 *
 * Structure: MSH MSA QRD [QRF] { QUERY_RESPONSE: [ PATIENT: PID [{NTE}] ] { ORDER: [ORC] OBR [{NTE}] { OBSERVATION: [OBX] [{NTE}] } [{CTI}] } } [DSC]
 * Shares the ORF^R04 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ORF_R04_Parser, type ParsedORF_R04 } from "./ORF_R04_Parser.ts";

export type { ParsedQueryResponse, ParsedResponseOrder, ParsedObservation } from "./ORF_R04_Parser.ts";
/** Structured result of parsing an HL7 ORF^W02 (HL7 v2.3) message. */
export type ParsedORF_W02 = ParsedORF_R04;

/** Parser for HL7 ORF^W02 (HL7 v2.3) messages. */
export class ORF_W02_Parser extends ORF_R04_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORF_W02";
}

/** Parses an HL7 ORF^W02 (HL7 v2.3) message string into a structured result. */
export function parseORF_W02(messageString: string): Result<ParsedORF_W02> {
  return new ORF_W02_Parser().parse(messageString);
}
