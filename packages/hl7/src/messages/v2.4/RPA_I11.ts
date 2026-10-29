/**
 * Builder, parser and structure for RPA^I11 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{ INSURANCE: IN1 [IN2] [IN3] }] [ACC] [{DG1}] [{DRG}] [{AL1}] { PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] } [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RPA^I08 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result as ParseResult } from "../../types/result.ts";
import { RPA_I08_Parser, type ParsedRPA_I08, RPA_I08, type RPA_I08Options, type Provider, type InsuranceGroup, type ProcedureGroup, type Observation, type Result } from "./RPA_I08.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { MSA } from "../../segments/v2.4/MSA.ts";
import type { PID } from "../../segments/v2.4/PID.ts";

export { RPA_I08_STRUCTURE as RPA_I11_STRUCTURE } from "./RPA_I08.ts";

export type { ParsedProvider, ParsedInsurance, ParsedProcedure, ParsedObservation, ParsedResult } from "./RPA_I08.ts";
/** Structured result of parsing an HL7 RPA^I11 (HL7 v2.4) message. */
export type ParsedRPA_I11 = ParsedRPA_I08;

/** Parser for HL7 RPA^I11 (HL7 v2.4) messages. */
export class RPA_I11_Parser extends RPA_I08_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I11";
}

/** Parses an HL7 RPA^I11 (HL7 v2.4) message string into a structured result. */
export function parseRPA_I11(messageString: string): ParseResult<ParsedRPA_I11> {
  return new RPA_I11_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RPA^I11 (HL7 v2.4) message. */
export type RPA_I11Options = RPA_I08Options;

/** Builder for HL7 RPA^I11 (HL7 v2.4) messages. */
export class RPA_I11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> extends RPA_I08<TMSH, TMSA, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPA_I11";
}

/** Builds an HL7 RPA^I11 (HL7 v2.4) message. */
export function createRPA_I11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  patient: TPID,
  procedures: ProcedureGroup[],
  options: RPA_I11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPA_I11<TMSH, TMSA, TPID> {
  return new RPA_I11(header, acknowledgment, providers, patient, procedures, options, encoding);
}
