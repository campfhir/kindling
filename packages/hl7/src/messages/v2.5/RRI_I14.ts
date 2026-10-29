/**
 * Builder, parser and structure for RRI^I14 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] [MSA] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result as ParseResult } from "../../types/result.ts";
import { RRI_I12_Parser, type ParsedRRI_I12, RRI_I12, type RRI_I12Options, type Provider, type ProcedureGroup, type Observation, type Result } from "./RRI_I12.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5/MSH.ts";
import type { PID } from "../../segments/v2.5/PID.ts";

export { RRI_I12_STRUCTURE as RRI_I14_STRUCTURE } from "./RRI_I12.ts";

export type { ParsedProvider, ParsedProcedure, ParsedObservation, ParsedResult } from "./RRI_I12.ts";
/** Structured result of parsing an HL7 RRI^I14 (HL7 v2.5) message. */
export type ParsedRRI_I14 = ParsedRRI_I12;

/** Parser for HL7 RRI^I14 (HL7 v2.5) messages. */
export class RRI_I14_Parser extends RRI_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I14";
}

/** Parses an HL7 RRI^I14 (HL7 v2.5) message string into a structured result. */
export function parseRRI_I14(messageString: string): ParseResult<ParsedRRI_I14> {
  return new RRI_I14_Parser().parse(messageString);
}

export type { Provider, ProcedureGroup, Observation, Result };
/** The optional segments and groups of an RRI^I14 (HL7 v2.5) message. */
export type RRI_I14Options = RRI_I12Options;

/** Builder for HL7 RRI^I14 (HL7 v2.5) messages. */
export class RRI_I14<TMSH extends MSH = MSH, TPID extends PID = PID> extends RRI_I12<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I14";
}

/** Builds an HL7 RRI^I14 (HL7 v2.5) message. */
export function createRRI_I14<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RRI_I14Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RRI_I14<TMSH, TPID> {
  return new RRI_I14(header, providers, patient, options, encoding);
}
