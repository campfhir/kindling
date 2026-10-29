/**
 * Builder, parser and structure for MDM^T06 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] EVN PID PV1 [{ COMMON_ORDER: ORC [{ TIMING: TQ1 [{TQ2}] }] OBR [{NTE}] }] TXA { OBSERVATION: OBX [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MDM_T02_Parser, type ParsedMDM_T02, MDM_T02, type MDM_T02Options, type MDMOrderGroup, type MDMTimingGroup, type MDMObservationGroup } from "./MDM_T02.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";
import type { TXA } from "./TXA.ts";

export { MDM_T02_STRUCTURE as MDM_T06_STRUCTURE } from "./MDM_T02.ts";

export type { ParsedMDMOrder, ParsedMDMTiming, ParsedMDMObservation } from "./MDM_T02.ts";
/** Structured result of parsing an HL7 MDM^T06 (HL7 v2.5) message. */
export type ParsedMDM_T06 = ParsedMDM_T02;

/** Parser for HL7 MDM^T06 (HL7 v2.5) messages. */
export class MDM_T06_Parser extends MDM_T02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T06";
}

/** Parses an HL7 MDM^T06 (HL7 v2.5) message string into a structured result. */
export function parseMDM_T06(messageString: string): Result<ParsedMDM_T06> {
  return new MDM_T06_Parser().parse(messageString);
}

export type { MDMOrderGroup, MDMTimingGroup, MDMObservationGroup };
/** The optional segments and groups of an MDM^T06 (HL7 v2.5) message. */
export type MDM_T06Options = MDM_T02Options;

/** Builder for HL7 MDM^T06 (HL7 v2.5) messages. */
export class MDM_T06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T06";
}

/** Builds an HL7 MDM^T06 (HL7 v2.5) message. */
export function createMDM_T06<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: MDMObservationGroup[],
  options: MDM_T06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T06<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T06(header, event, patient, visit, document, observations, options, encoding);
}
