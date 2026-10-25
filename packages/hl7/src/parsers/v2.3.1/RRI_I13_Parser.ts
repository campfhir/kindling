/**
 * Parser for RRI^I13 messages (HL7 v2.3.1).
 *
 * Structure: MSH [MSA] [RF1] [ AUTHORIZATION: AUT [CTD] ] { PROVIDER: PRD [{CTD}] } PID [ACC] [{DG1}] [{DRG}] [{AL1}] [{ PROCEDURE: PR1 [ AUTHORIZATION: AUT [CTD] ] }] [{ OBSERVATION: OBR [{NTE}] [{ RESULTS: OBX [{NTE}] }] }] [ PATIENT_VISIT: PV1 [PV2] ] [{NTE}]
 * Shares the RRI^I12 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { RRI_I12_Parser, type ParsedRRI_I12 } from "./RRI_I12_Parser.ts";

export type { ParsedProvider, ParsedProcedure, ParsedObservation, ParsedResult } from "./RRI_I12_Parser.ts";
/** Structured result of parsing an HL7 RRI^I13 (HL7 v2.3.1) message. */
export type ParsedRRI_I13 = ParsedRRI_I12;

/** Parser for HL7 RRI^I13 (HL7 v2.3.1) messages. */
export class RRI_I13_Parser extends RRI_I12_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RRI_I13";
}

/** Parses an HL7 RRI^I13 (HL7 v2.3.1) message string into a structured result. */
export function parseRRI_I13(messageString: string): Result<ParsedRRI_I13> {
  return new RRI_I13_Parser().parse(messageString);
}
