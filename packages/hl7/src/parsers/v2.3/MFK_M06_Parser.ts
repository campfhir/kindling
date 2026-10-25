/**
 * Parser for MFK^M06 messages (HL7 v2.3).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFK_M01_Parser, type ParsedMFK_M01 } from "./MFK_M01_Parser.ts";

/** Structured result of parsing an HL7 MFK^M06 (HL7 v2.3) message. */
export type ParsedMFK_M06 = ParsedMFK_M01;

/** Parser for HL7 MFK^M06 (HL7 v2.3) messages. */
export class MFK_M06_Parser extends MFK_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M06";
}

/** Parses an HL7 MFK^M06 (HL7 v2.3) message string into a structured result. */
export function parseMFK_M06(messageString: string): Result<ParsedMFK_M06> {
  return new MFK_M06_Parser().parse(messageString);
}
