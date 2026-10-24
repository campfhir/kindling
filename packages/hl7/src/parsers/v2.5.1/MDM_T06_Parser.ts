/**
 * Parser for MDM^T06 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T02_Parser, type ParsedMDM_T02 } from "./MDM_T02_Parser.ts";

export type { ParsedMDMOrder, ParsedMDMTiming, ParsedMDMObservation } from "./MDM_T02_Parser.ts";
/** Structured result of parsing an HL7 MDM^T06 (HL7 v2.5.1) message. */
export type ParsedMDM_T06 = ParsedMDM_T02;

/** Parser for HL7 MDM^T06 (HL7 v2.5.1) messages. */
export class MDM_T06_Parser extends MDM_T02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T06";
}

/** Parses an HL7 MDM^T06 (HL7 v2.5.1) message string into a structured result. */
export function parseMDM_T06(messageString: string): Result<ParsedMDM_T06> {
  return new MDM_T06_Parser().parse(messageString);
}
