/**
 * Builder, parser and structure for SCN^S37 messages (HL7 v2.8).
 *
 * Structure: MSH [{SFT}] [UAC]  ANTI_MICROBIAL_DEVICE_CYCLE_DATA: SDD [{SCD}] 
 * Shares the SMD^S32 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { SMD_S32_Parser, type ParsedSMD_S32, SMD_S32, type SMD_S32Options, type AntiMicrobialDeviceCycleDataGroup } from "./SMD_S32.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { SMD_S32_STRUCTURE as SCN_S37_STRUCTURE } from "./SMD_S32.ts";

export type { ParsedAntiMicrobialDeviceCycleData } from "./SMD_S32.ts";
/** Structured result of parsing an HL7 SCN^S37 (HL7 v2.8) message. */
export type ParsedSCN_S37 = ParsedSMD_S32;

/** Parser for HL7 SCN^S37 (HL7 v2.8) messages. */
export class SCN_S37_Parser extends SMD_S32_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SCN_S37";
}

/** Parses an HL7 SCN^S37 (HL7 v2.8) message string into a structured result. */
export function parseSCN_S37(messageString: string): Result<ParsedSCN_S37> {
  return new SCN_S37_Parser().parse(messageString);
}

export type { AntiMicrobialDeviceCycleDataGroup };
/** The optional segments and groups of an SCN^S37 (HL7 v2.8) message. */
export type SCN_S37Options = SMD_S32Options;

/** Builder for HL7 SCN^S37 (HL7 v2.8) messages. */
export class SCN_S37<TMSH extends MSH = MSH> extends SMD_S32<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "SCN_S37";
}

/** Builds an HL7 SCN^S37 (HL7 v2.8) message. */
export function createSCN_S37<TMSH extends MSH = MSH>(
  header: TMSH,
  antiMicrobialDeviceCycleData: AntiMicrobialDeviceCycleDataGroup,
  options: SCN_S37Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): SCN_S37<TMSH> {
  return new SCN_S37(header, antiMicrobialDeviceCycleData, options, encoding);
}
