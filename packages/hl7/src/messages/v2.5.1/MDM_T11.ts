/**
 * Builder, parser and structure for MDM^T11 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01, MDM_T01, type MDM_T01Options, type MDMOrderGroup, type MDMTimingGroup } from "./MDM_T01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { EVN } from "../../segments/v2.5.1/EVN.ts";
import type { PID } from "../../segments/v2.5.1/PID.ts";
import type { PV1 } from "../../segments/v2.5.1/PV1.ts";
import type { TXA } from "../../segments/v2.5.1/TXA.ts";

export { MDM_T01_STRUCTURE as MDM_T11_STRUCTURE } from "./MDM_T01.ts";

export type { ParsedMDMOrder, ParsedMDMTiming } from "./MDM_T01.ts";
/** Structured result of parsing an HL7 MDM^T11 (HL7 v2.5.1) message. */
export type ParsedMDM_T11 = ParsedMDM_T01;

/** Parser for HL7 MDM^T11 (HL7 v2.5.1) messages. */
export class MDM_T11_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T11";
}

/** Parses an HL7 MDM^T11 (HL7 v2.5.1) message string into a structured result. */
export function parseMDM_T11(messageString: string): Result<ParsedMDM_T11> {
  return new MDM_T11_Parser().parse(messageString);
}

export type { MDMOrderGroup, MDMTimingGroup };
/** The optional segments and groups of an MDM^T11 (HL7 v2.5.1) message. */
export type MDM_T11Options = MDM_T01Options;

/** Builder for HL7 MDM^T11 (HL7 v2.5.1) messages. */
export class MDM_T11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T11";
}

/** Builds an HL7 MDM^T11 (HL7 v2.5.1) message. */
export function createMDM_T11<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  options: MDM_T11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T11<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T11(header, event, patient, visit, document, options, encoding);
}
