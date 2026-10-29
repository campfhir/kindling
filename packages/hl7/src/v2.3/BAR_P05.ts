/**
 * Builder, parser and structure for BAR^P05 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] { VISIT: [PV1] [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{NK1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [UB1] [UB2] }
 * Shares the BAR^P01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { BAR_P01_Parser, type ParsedBAR_P01, BAR_P01, type BAR_P01Options, type BARVisitGroup, type BARProcedureGroup, type BARInsuranceGroup } from "./BAR_P01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { EVN } from "./EVN.ts";
import type { PID } from "./PID.ts";

export { BAR_P01_STRUCTURE as BAR_P05_STRUCTURE } from "./BAR_P01.ts";

export type { ParsedBARVisit, ParsedBARProcedure, ParsedBARInsurance } from "./BAR_P01.ts";
/** Structured result of parsing an HL7 BAR^P05 (HL7 v2.3) message. */
export type ParsedBAR_P05 = ParsedBAR_P01;

/** Parser for HL7 BAR^P05 (HL7 v2.3) messages. */
export class BAR_P05_Parser extends BAR_P01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "BAR_P05";
}

/** Parses an HL7 BAR^P05 (HL7 v2.3) message string into a structured result. */
export function parseBAR_P05(messageString: string): Result<ParsedBAR_P05> {
  return new BAR_P05_Parser().parse(messageString);
}

export type { BARVisitGroup, BARProcedureGroup, BARInsuranceGroup };
/** The optional segments and groups of an BAR^P05 (HL7 v2.3) message. */
export type BAR_P05Options = BAR_P01Options;

/** Builder for HL7 BAR^P05 (HL7 v2.3) messages. */
export class BAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID> extends BAR_P01<TMSH, TEVN, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "BAR_P05";
}

/** Builds an HL7 BAR^P05 (HL7 v2.3) message. */
export function createBAR_P05<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visits: BARVisitGroup[],
  options: BAR_P05Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): BAR_P05<TMSH, TEVN, TPID> {
  return new BAR_P05(header, event, patient, visits, options, encoding);
}
