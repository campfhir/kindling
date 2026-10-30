/**
 * Builder, parser and structure for SDN^S36 messages (HL7 v2.9).
 *
 * Structure: MSH [{SFT}] [UAC]  ANTI_MICROBIAL_DEVICE_DATA: SDD [{SCD}] 
 * Shares the SDR^S31 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SDR_S31_Parser, type ParsedSDR_S31, SDR_S31, type SDR_S31Options, type AntiMicrobialDeviceDataGroup } from "./SDR_S31.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { SDR_S31_STRUCTURE as SDN_S36_STRUCTURE } from "./SDR_S31.ts";

export type { ParsedAntiMicrobialDeviceData } from "./SDR_S31.ts";
/** Structured result of parsing an HL7 SDN^S36 (HL7 v2.9) message. */
export type ParsedSDN_S36 = ParsedSDR_S31;

/** Parser for HL7 SDN^S36 (HL7 v2.9) messages. */
export class SDN_S36_Parser extends SDR_S31_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SDN_S36";
}

/** Parses an HL7 SDN^S36 (HL7 v2.9) message string into a structured result. */
export function parseSDN_S36(messageString: string): Result<ParsedSDN_S36> {
  return new SDN_S36_Parser().parse(messageString);
}

export type { AntiMicrobialDeviceDataGroup };
/** The optional segments and groups of an SDN^S36 (HL7 v2.9) message. */
export type SDN_S36Options = SDR_S31Options;

/** Builder for HL7 SDN^S36 (HL7 v2.9) messages. */
export class SDN_S36<TMSH extends MSH = MSH> extends SDR_S31<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SDN_S36";
}

/** Builds an HL7 SDN^S36 (HL7 v2.9) message. */
export function createSDN_S36<TMSH extends MSH = MSH>(
  header: TMSH,
  antiMicrobialDeviceData: AntiMicrobialDeviceDataGroup,
  options: SDN_S36Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SDN_S36<TMSH> {
  return new SDN_S36(header, antiMicrobialDeviceData, options, encoding);
}
