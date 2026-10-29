/**
 * Builder, parser and structure for MDM^T05 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID PV1 TXA
 * Shares the MDM^T01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MDM_T01_Parser, type ParsedMDM_T01, MDM_T01, type MDM_T01Options } from "./MDM_T01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";
import type { TXA } from "../../segments/v2.4/TXA.ts";

export { MDM_T01_STRUCTURE as MDM_T05_STRUCTURE } from "./MDM_T01.ts";

/** Structured result of parsing an HL7 MDM^T05 (HL7 v2.4) message. */
export type ParsedMDM_T05 = ParsedMDM_T01;

/** Parser for HL7 MDM^T05 (HL7 v2.4) messages. */
export class MDM_T05_Parser extends MDM_T01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T05";
}

/** Parses an HL7 MDM^T05 (HL7 v2.4) message string into a structured result. */
export function parseMDM_T05(messageString: string): Result<ParsedMDM_T05> {
  return new MDM_T05_Parser().parse(messageString);
}

/** The optional segments and groups of an MDM^T05 (HL7 v2.4) message. */
export type MDM_T05Options = MDM_T01Options;

/** Builder for HL7 MDM^T05 (HL7 v2.4) messages. */
export class MDM_T05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1, TTXA extends TXA = TXA> extends MDM_T01<TMSH, TEVN, TPID, TPV1, TTXA> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MDM_T05";
}

/** Builds an HL7 MDM^T05 (HL7 v2.4) message. */
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
