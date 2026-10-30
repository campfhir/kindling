/**
 * Builder, parser and structure for MDM^T10 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{SFT}] [UAC] EVN PID [{GSP}] [{GSR}] [{GSC}] [{PRT}] PV1 [{PRT}] [{ COMMON_ORDER: ORC [{PRT}] [{ TIMING: TQ1 [{TQ2}] }] OBR [{PRT}] [{NTE}] }] TXA [{CON}] { OBSERVATION: OBX [{PRT}] [{NTE}] }
 * Shares the MDM^T02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { MDM_T02_Parser, type ParsedMDM_T02, MDM_T02, type MDM_T02Options, type CommonOrderGroup, type TimingGroup, type ObservationGroup } from "./MDM_T02.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";
import type { PV1 } from "./PV1.ts";
import type { TXA } from "./TXA.ts";

export { MDM_T02_STRUCTURE as MDM_T10_STRUCTURE } from "./MDM_T02.ts";

export type { ParsedCommonOrder, ParsedTiming, ParsedObservation } from "./MDM_T02.ts";
/** Structured result of parsing an HL7 MDM^T10 (HL7 v2.9.1) message. */
export type ParsedMDM_T10 = ParsedMDM_T02;

/** Parser for HL7 MDM^T10 (HL7 v2.9.1) messages. */
export class MDM_T10_Parser extends MDM_T02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T10";
}

/** Parses an HL7 MDM^T10 (HL7 v2.9.1) message string into a structured result. */
export function parseMDM_T10(messageString: string): Result<ParsedMDM_T10> {
  return new MDM_T10_Parser().parse(messageString);
}

export type { CommonOrderGroup, TimingGroup, ObservationGroup };
/** The optional segments and groups of an MDM^T10 (HL7 v2.9.1) message. */
export type MDM_T10Options = MDM_T02Options;

/** Builder for HL7 MDM^T10 (HL7 v2.9.1) messages. */
export class MDM_T10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T02<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T10";
}

/** Builds an HL7 MDM^T10 (HL7 v2.9.1) message. */
export function createMDM_T10<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  document: TTXA,
  observations: ObservationGroup[],
  options: MDM_T10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MDM_T10<TMSH, TEVN, TPID, TPV1, TTXA> {
  return new MDM_T10(header, event, patient, visit, document, observations, options, encoding);
}
