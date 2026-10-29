/**
 * Builder, parser and structure for RPI^I04 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA { PROVIDER: PRD [{CTD}] } PID [{NK1}] [ GUARANTOR_INSURANCE: [{GT1}] { INSURANCE: IN1 [IN2] [IN3] } ] [{NTE}]
 * Shares the RPI^I01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RPI_I01_Parser, type ParsedRPI_I01, RPI_I01, type RPI_I01Options, type Provider, type InsuranceGroup } from "./RPI_I01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { MSA } from "./MSA.ts";
import type { PID } from "./PID.ts";

export { RPI_I01_STRUCTURE as RPI_I04_STRUCTURE } from "./RPI_I01.ts";

export type { ParsedProvider, ParsedInsurance } from "./RPI_I01.ts";
/** Structured result of parsing an HL7 RPI^I04 (HL7 v2.5) message. */
export type ParsedRPI_I04 = ParsedRPI_I01;

/** Parser for HL7 RPI^I04 (HL7 v2.5) messages. */
export class RPI_I04_Parser extends RPI_I01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPI_I04";
}

/** Parses an HL7 RPI^I04 (HL7 v2.5) message string into a structured result. */
export function parseRPI_I04(messageString: string): Result<ParsedRPI_I04> {
  return new RPI_I04_Parser().parse(messageString);
}

export type { Provider, InsuranceGroup };
/** The optional segments and groups of an RPI^I04 (HL7 v2.5) message. */
export type RPI_I04Options = RPI_I01Options;

/** Builder for HL7 RPI^I04 (HL7 v2.5) messages. */
export class RPI_I04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID> extends RPI_I01<TMSH, TMSA, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RPI_I04";
}

/** Builds an HL7 RPI^I04 (HL7 v2.5) message. */
export function createRPI_I04<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TPID extends PID = PID>(
  header: TMSH,
  acknowledgment: TMSA,
  providers: Provider[],
  patient: TPID,
  options: RPI_I04Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RPI_I04<TMSH, TMSA, TPID> {
  return new RPI_I04(header, acknowledgment, providers, patient, options, encoding);
}
