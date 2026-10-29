/**
 * Builder, parser and structure for RQC^I06 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] QRD [QRF] { PROVIDER: PRD [{CTD}] } PID [{NK1}] [{GT1}] [{NTE}]
 * Shares the RQC^I05 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { RQC_I05_Parser, type ParsedRQC_I05, RQC_I05, type RQC_I05Options, type Provider } from "./RQC_I05.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";
import type { QRD } from "./QRD.ts";
import type { PID } from "./PID.ts";

export { RQC_I05_STRUCTURE as RQC_I06_STRUCTURE } from "./RQC_I05.ts";

export type { ParsedProvider } from "./RQC_I05.ts";
/** Structured result of parsing an HL7 RQC^I06 (HL7 v2.5) message. */
export type ParsedRQC_I06 = ParsedRQC_I05;

/** Parser for HL7 RQC^I06 (HL7 v2.5) messages. */
export class RQC_I06_Parser extends RQC_I05_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQC_I06";
}

/** Parses an HL7 RQC^I06 (HL7 v2.5) message string into a structured result. */
export function parseRQC_I06(messageString: string): Result<ParsedRQC_I06> {
  return new RQC_I06_Parser().parse(messageString);
}

export type { Provider };
/** The optional segments and groups of an RQC^I06 (HL7 v2.5) message. */
export type RQC_I06Options = RQC_I05Options;

/** Builder for HL7 RQC^I06 (HL7 v2.5) messages. */
export class RQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID> extends RQC_I05<TMSH, TQRD, TPID> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "RQC_I06";
}

/** Builds an HL7 RQC^I06 (HL7 v2.5) message. */
export function createRQC_I06<TMSH extends MSH = MSH, TQRD extends QRD = QRD, TPID extends PID = PID>(
  header: TMSH,
  query: TQRD,
  providers: Provider[],
  patient: TPID,
  options: RQC_I06Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): RQC_I06<TMSH, TQRD, TPID> {
  return new RQC_I06(header, query, providers, patient, options, encoding);
}
