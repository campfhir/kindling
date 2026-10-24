/**
 * Parser for MDM^T04 messages (HL7 v2.5.1).
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
/** Structured result of parsing an HL7 MDM^T04 (HL7 v2.5.1) message. */
export type ParsedMDM_T04 = ParsedMDM_T02;

/** Parser for HL7 MDM^T04 (HL7 v2.5.1) messages. */
export class MDM_T04_Parser extends MDM_T02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T04";
}

/** Parses an HL7 MDM^T04 (HL7 v2.5.1) message string into a structured result. */
export function parseMDM_T04(messageString: string): Result<ParsedMDM_T04> {
  return new MDM_T04_Parser().parse(messageString);
}
