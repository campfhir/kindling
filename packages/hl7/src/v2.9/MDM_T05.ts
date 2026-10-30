/**
 * Builder, parser and structure for MDM^T05 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{PRT}] PV1 [{PRT}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{PRT}] [{NTE}] }] TXA [{CON}]
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01, MDM_T01, type MDM_T01Options, type CommonOrderGroup, type TimingGroup } from "./MDM_T01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";
import type { TXA } from "./TXA.ts";

export { MDM_T01_STRUCTURE as MDM_T05_STRUCTURE } from "./MDM_T01.ts";

export type { ParsedCommonOrder, ParsedTiming } from "./MDM_T01.ts";
/** Structured result of parsing an HL7 MDM^T05 (HL7 v2.9) message. */
export type ParsedMDM_T05 = ParsedMDM_T01;

/** Parser for HL7 MDM^T05 (HL7 v2.9) messages. */
export class MDM_T05_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T05";
}

/** Parses an HL7 MDM^T05 (HL7 v2.9) message string into a structured result. */
export function parseMDM_T05(messageString: string): Result<ParsedMDM_T05> {
  return new MDM_T05_Parser().parse(messageString);
}

export type { CommonOrderGroup, TimingGroup };
/** The optional segments and groups of an MDM^T05 (HL7 v2.9) message. */
export type MDM_T05Options = MDM_T01Options;

/** Builder for HL7 MDM^T05 (HL7 v2.9) messages. */
export class MDM_T05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T05";
}

/** Builds an HL7 MDM^T05 (HL7 v2.9) message. */
export function createMDM_T05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  options: MDM_T05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T05<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T05(header, event, patient, visit, document, options, encoding);
}
