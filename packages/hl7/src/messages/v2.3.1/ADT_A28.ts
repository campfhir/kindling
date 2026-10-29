/**
 * Builder, parser and structure for ADT^A28 messages (HL7 v2.3.1).
 *
 * Structure: MSH EVN PID [PD1] [{NK1}] PV1 [PV2] [{DB1}] [{OBX}] [{AL1}] [{DG1}] [DRG] [{ PROCEDURE: PR1 [{ROL}] }] [{GT1}] [{ INSURANCE: IN1 [IN2] [{IN3}] }] [ACC] [UB1] [UB2]
 * Shares the ADT^A01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A01_Parser, type ParsedADT_A01, ADT_A01, type ADT_A01Options, type ProcedureGroup, type InsuranceGroup } from "./ADT_A01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { EVN } from "../../segments/v2.3.1/EVN.ts";
import type { PID } from "../../segments/v2.3.1/PID.ts";
import type { PV1 } from "../../segments/v2.3.1/PV1.ts";

export { ADT_A01_STRUCTURE as ADT_A28_STRUCTURE } from "./ADT_A01.ts";

export type { ParsedProcedure, ParsedInsuranceGroup } from "./ADT_A01.ts";
/** Structured result of parsing an HL7 ADT^A28 (HL7 v2.3.1) message. */
export type ParsedADT_A28 = ParsedADT_A01;

/** Parser for HL7 ADT^A28 (HL7 v2.3.1) messages. */
export class ADT_A28_Parser extends ADT_A01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A28";
}

/** Parses an HL7 ADT^A28 (HL7 v2.3.1) message string into a structured result. */
export function parseADT_A28(messageString: string): Result<ParsedADT_A28> {
  return new ADT_A28_Parser().parse(messageString);
}

export type { ProcedureGroup, InsuranceGroup };
/** The optional segments and groups of an ADT^A28 (HL7 v2.3.1) message. */
export type ADT_A28Options = ADT_A01Options;

/** Builder for HL7 ADT^A28 (HL7 v2.3.1) messages. */
export class ADT_A28<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A01<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A28";
}

/** Builds an HL7 ADT^A28 (HL7 v2.3.1) message. */
export function createADT_A28<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A28Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A28<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A28(header, event, patient, visit, options, encoding);
}
