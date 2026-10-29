/**
 * Builder, parser and structure for ADT^A31 messages (HL7 v2.4).
 *
 * Structure: MSH EVN PID [PD1] [{ROL}] [{NK1}] PV1 [PV2] [{ROL}] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] [{ROL}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A05_Parser, type ParsedADT_A05, ADT_A05, type ADT_A05Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A05.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.4/MSH.ts";
import type { EVN } from "../../segments/v2.4/EVN.ts";
import type { PID } from "../../segments/v2.4/PID.ts";
import type { PV1 } from "../../segments/v2.4/PV1.ts";

export { ADT_A05_STRUCTURE as ADT_A31_STRUCTURE } from "./ADT_A05.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A05.ts";
/** Structured result of parsing an HL7 ADT^A31 (HL7 v2.4) message. */
export type ParsedADT_A31 = ParsedADT_A05;

/** Parser for HL7 ADT^A31 (HL7 v2.4) messages. */
export class ADT_A31_Parser extends ADT_A05_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A31";
}

/** Parses an HL7 ADT^A31 (HL7 v2.4) message string into a structured result. */
export function parseADT_A31(messageString: string): Result<ParsedADT_A31> {
  return new ADT_A31_Parser().parse(messageString);
}

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A31 (HL7 v2.4) message. */
export type ADT_A31Options = ADT_A05Options;

/** Builder for HL7 ADT^A31 (HL7 v2.4) messages. */
export class ADT_A31<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A05<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A31";
}

/** Builds an HL7 ADT^A31 (HL7 v2.4) message. */
export function createADT_A31<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A31Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A31<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A31(header, event, patient, visit, options, encoding);
}
