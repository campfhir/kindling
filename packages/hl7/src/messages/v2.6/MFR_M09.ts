/**
 * Builder, parser and structure for MFR^M09 messages (HL7 v2.6).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] [QAK] QRD [QRF] MFI {MFE} [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01, MFR_M01, type MFR_M01Options } from "./MFR_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.6/MSH.ts";
import type { MSA } from "../../segments/v2.6/MSA.ts";
import type { QRD } from "../../segments/v2.6/QRD.ts";
import type { MFI } from "../../segments/v2.6/MFI.ts";
import type { MFE } from "../../segments/v2.6/MFE.ts";

export { MFR_M01_STRUCTURE as MFR_M09_STRUCTURE } from "./MFR_M01.ts";

/** Structured result of parsing an HL7 MFR^M09 (HL7 v2.6) message. */
export type ParsedMFR_M09 = ParsedMFR_M01;

/** Parser for HL7 MFR^M09 (HL7 v2.6) messages. */
export class MFR_M09_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M09";
}

/** Parses an HL7 MFR^M09 (HL7 v2.6) message string into a structured result. */
export function parseMFR_M09(messageString: string): Result<ParsedMFR_M09> {
  return new MFR_M09_Parser().parse(messageString);
}

/** The optional segments and groups of an MFR^M09 (HL7 v2.6) message. */
export type MFR_M09Options = MFR_M01Options;

/** Builder for HL7 MFR^M09 (HL7 v2.6) messages. */
export class MFR_M09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> extends MFR_M01<TMSH, TMSA, TQRD, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M09";
}

/** Builds an HL7 MFR^M09 (HL7 v2.6) message. */
export function createMFR_M09<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: MFE[],
  options: MFR_M09Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M09<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M09(header, acknowledgment, query, masterFile, entries, options, encoding);
}
