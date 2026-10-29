/**
 * Builder, parser and structure for MFR^M11 messages (HL7 v2.3.1).
 *
 * Structure: MSH MSA [ERR] QRD [QRF] MFI { MF_QUERY: MFE } [DSC]
 * Shares the MFR^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFR_M01_Parser, type ParsedMFR_M01, MFR_M01, type MFR_M01Options, type Entry } from "./MFR_M01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3.1/MSH.ts";
import type { MSA } from "../../segments/v2.3.1/MSA.ts";
import type { QRD } from "../../segments/v2.3.1/QRD.ts";
import type { MFI } from "../../segments/v2.3.1/MFI.ts";

export { MFR_M01_STRUCTURE as MFR_M11_STRUCTURE } from "./MFR_M01.ts";

export type { ParsedEntry } from "./MFR_M01.ts";
/** Structured result of parsing an HL7 MFR^M11 (HL7 v2.3.1) message. */
export type ParsedMFR_M11 = ParsedMFR_M01;

/** Parser for HL7 MFR^M11 (HL7 v2.3.1) messages. */
export class MFR_M11_Parser extends MFR_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M11";
}

/** Parses an HL7 MFR^M11 (HL7 v2.3.1) message string into a structured result. */
export function parseMFR_M11(messageString: string): Result<ParsedMFR_M11> {
  return new MFR_M11_Parser().parse(messageString);
}

export type { Entry };
/** The optional segments and groups of an MFR^M11 (HL7 v2.3.1) message. */
export type MFR_M11Options = MFR_M01Options;

/** Builder for HL7 MFR^M11 (HL7 v2.3.1) messages. */
export class MFR_M11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI> extends MFR_M01<TMSH, TMSA, TQRD, TMFI> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFR_M11";
}

/** Builds an HL7 MFR^M11 (HL7 v2.3.1) message. */
export function createMFR_M11<TMSH extends MSH = MSH, TMSA extends MSA = MSA, TQRD extends QRD = QRD, TMFI extends MFI = MFI>(
  header: TMSH,
  acknowledgment: TMSA,
  query: TQRD,
  masterFile: TMFI,
  entries: Entry[],
  options: MFR_M11Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): MFR_M11<TMSH, TMSA, TQRD, TMFI> {
  return new MFR_M11(header, acknowledgment, query, masterFile, entries, options, encoding);
}
