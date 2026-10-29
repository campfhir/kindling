/**
 * Builder, parser and structure for REF^I14 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the REF^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result as ParseResult } from "../types/result.ts";
import { REF_I12_Parser, type ParsedREF_I12, REF_I12, type REF_I12Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./REF_I12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { REF_I12_STRUCTURE as REF_I14_STRUCTURE } from "./REF_I12.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./REF_I12.ts";
/** Structured result of parsing an HL7 REF^I14 (HL7 v2.5.1) message. */
export type ParsedREF_I14 = ParsedREF_I12;

/** Parser for HL7 REF^I14 (HL7 v2.5.1) messages. */
export class REF_I14_Parser extends REF_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I14";
}

/** Parses an HL7 REF^I14 (HL7 v2.5.1) message string into a structured result. */
export function parseREF_I14(messageString: string): ParseResult<ParsedREF_I14> {
  return new REF_I14_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an REF^I14 (HL7 v2.5.1) message. */
export type REF_I14Options = REF_I12Options;

/** Builder for HL7 REF^I14 (HL7 v2.5.1) messages. */
export class REF_I14<TMSH extends MSH = MSH, TPID extends PID = PID> extends REF_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "REF_I14";
}

/** Builds an HL7 REF^I14 (HL7 v2.5.1) message. */
export function createREF_I14<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: REF_I14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): REF_I14<TMSH, TPID> {
  return new REF_I14(header, providers, patient, options, encoding);
}
