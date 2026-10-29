/**
 * Builder, parser and structure for MFR^M10 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] [QAK] QRD [QRF] MFI { MF_QUERY: MFE } [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01, MFR_M01, type MFR_M01Options, type Entry } from "./MFR_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.5.1/MSH.ts";
import type { MSA } from "../../segments/v2.5.1/MSA.ts";
import type { QRD } from "../../segments/v2.5.1/QRD.ts";
import type { MFI } from "../../segments/v2.5.1/MFI.ts";

export { MFR_M01_STRUCTURE as MFR_M10_STRUCTURE } from "./MFR_M01.ts";

export type { ParsedEntry } from "./MFR_M01.ts";
/** Structured result of parsing an HL7 MFR^M10 (HL7 v2.5.1) message. */
export type ParsedMFR_M10 = ParsedMFR_M01;

/** Parser for HL7 MFR^M10 (HL7 v2.5.1) messages. */
export class MFR_M10_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M10";
}

/** Parses an HL7 MFR^M10 (HL7 v2.5.1) message string into a structured result. */
export function parseMFR_M10(messageString: string): Result<ParsedMFR_M10> {
  return new MFR_M10_Parser().parse(messageString);
}

export type { Entry };
/** The optional segments and groups of an MFR^M10 (HL7 v2.5.1) message. */
export type MFR_M10Options = MFR_M01Options;

/** Builder for HL7 MFR^M10 (HL7 v2.5.1) messages. */
export class MFR_M10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> extends MFR_M01<TMSH, TMSA, TQRD, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M10";
}

/** Builds an HL7 MFR^M10 (HL7 v2.5.1) message. */
export function createMFR_M10<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: Entry[],
  options: MFR_M10Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M10<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M10(header, acknowledgment, query, masterFile, entries, options, encoding);
}
