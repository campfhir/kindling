/**
 * Builder, parser and structure for RPA^I09 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RPA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result as ParseResult } from "../types/result.ts";
import { RPA_I08_Parser, type ParsedRPA_I08, RPA_I08, type RPA_I08Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./RPA_I08.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { PID } from "./PID.ts";

export { RPA_I08_STRUCTURE as RPA_I09_STRUCTURE } from "./RPA_I08.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./RPA_I08.ts";
/** Structured result of parsing an HL7 RPA^I09 (HL7 v2.3.1) message. */
export type ParsedRPA_I09 = ParsedRPA_I08;

/** Parser for HL7 RPA^I09 (HL7 v2.3.1) messages. */
export class RPA_I09_Parser extends RPA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I09";
}

/** Parses an HL7 RPA^I09 (HL7 v2.3.1) message string into a structured result. */
export function parseRPA_I09(messageString: string): ParseResult<ParsedRPA_I09> {
  return new RPA_I09_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RPA^I09 (HL7 v2.3.1) message. */
export type RPA_I09Options = RPA_I08Options;

/** Builder for HL7 RPA^I09 (HL7 v2.3.1) messages. */
export class RPA_I09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> extends RPA_I08<TMSH, TMSA, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I09";
}

/** Builds an HL7 RPA^I09 (HL7 v2.3.1) message. */
export function createRPA_I09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  patient: TPID,
  procedures: ProcedureGroup[],
  options: RPA_I09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPA_I09<TMSH, TMSA, TPID> {
  return new RPA_I09(header, acknowledgment, providers, patient, procedures, options, encoding);
}
