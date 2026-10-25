/**
 * Parser for MFK^M11 messages (HL7 v2.5).
 *
 * Structure: MSH [{SFT}] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFK_M01_Parser, type ParsedMFK_M01 } from "./MFK_M01_Parser.ts";

/** Structured result of parsing an HL7 MFK^M11 (HL7 v2.5) message. */
export type ParsedMFK_M11 = ParsedMFK_M01;

/** Parser for HL7 MFK^M11 (HL7 v2.5) messages. */
export class MFK_M11_Parser extends MFK_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M11";
}

/** Parses an HL7 MFK^M11 (HL7 v2.5) message string into a structured result. */
export function parseMFK_M11(messageString: string): Result<ParsedMFK_M11> {
  return new MFK_M11_Parser().parse(messageString);
}
