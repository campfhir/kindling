/**
 * Builder, parser and structure for RQA^I10 messages (HL7 v2.3.1).
 *
 * Structure: MSH [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RQA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result as ParseResult } from "../types/result.ts";
import { RQA_I08_Parser, type ParsedRQA_I08, RQA_I08, type RQA_I08Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./RQA_I08.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { RQA_I08_STRUCTURE as RQA_I10_STRUCTURE } from "./RQA_I08.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./RQA_I08.ts";
/** Structured result of parsing an HL7 RQA^I10 (HL7 v2.3.1) message. */
export type ParsedRQA_I10 = ParsedRQA_I08;

/** Parser for HL7 RQA^I10 (HL7 v2.3.1) messages. */
export class RQA_I10_Parser extends RQA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I10";
}

/** Parses an HL7 RQA^I10 (HL7 v2.3.1) message string into a structured result. */
export function parseRQA_I10(messageString: string): ParseResult<ParsedRQA_I10> {
  return new RQA_I10_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RQA^I10 (HL7 v2.3.1) message. */
export type RQA_I10Options = RQA_I08Options;

/** Builder for HL7 RQA^I10 (HL7 v2.3.1) messages. */
export class RQA_I10<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQA_I08<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQA_I10";
}

/** Builds an HL7 RQA^I10 (HL7 v2.3.1) message. */
export function createRQA_I10<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQA_I10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQA_I10<TMSH, TPID> {
  return new RQA_I10(header, providers, patient, options, encoding);
}
