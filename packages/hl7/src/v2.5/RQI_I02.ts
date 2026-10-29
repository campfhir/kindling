/**
 * Builder, parser and structure for RQI^I02 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RQI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RQI_I01_Parser, type ParsedRQI_I01, RQI_I01, type RQI_I01Options, type Provider, type InsuranceGroup } from "./RQI_I01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { PID } from "./PID.ts";

export { RQI_I01_STRUCTURE as RQI_I02_STRUCTURE } from "./RQI_I01.ts";

export type { ParsedProvider, ParsedInsurance } from "./RQI_I01.ts";
/** Structured result of parsing an HL7 RQI^I02 (HL7 v2.5) message. */
export type ParsedRQI_I02 = ParsedRQI_I01;

/** Parser for HL7 RQI^I02 (HL7 v2.5) messages. */
export class RQI_I02_Parser extends RQI_I01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQI_I02";
}

/** Parses an HL7 RQI^I02 (HL7 v2.5) message string into a structured result. */
export function parseRQI_I02(messageString: string): Result<ParsedRQI_I02> {
  return new RQI_I02_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup };
/** The optional segments and groups of an RQI^I02 (HL7 v2.5) message. */
export type RQI_I02Options = RQI_I01Options;

/** Builder for HL7 RQI^I02 (HL7 v2.5) messages. */
export class RQI_I02<TMSH extends MSH = MSH, TPID extends PID = PID> extends RQI_I01<TMSH, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQI_I02";
}

/** Builds an HL7 RQI^I02 (HL7 v2.5) message. */
export function createRQI_I02<TMSH extends MSH = MSH, TPID extends PID = PID>(
  header: TMSH,
  providers: Provider[],
  patient: TPID,
  options: RQI_I02Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQI_I02<TMSH, TPID> {
  return new RQI_I02(header, providers, patient, options, encoding);
}
