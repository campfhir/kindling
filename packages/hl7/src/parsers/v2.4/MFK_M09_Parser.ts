/**
 * Parser for MFK^M09 messages (HL7 v2.4).
 *
 * Structure: MSH MSA [ERR] MFI [{MFA}]
 * Shares the MFK^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFK_M01_Parser, type ParsedMFK_M01 } from "./MFK_M01_Parser.ts";

/** Structured result of parsing an HL7 MFK^M09 (HL7 v2.4) message. */
export type ParsedMFK_M09 = ParsedMFK_M01;

/** Parser for HL7 MFK^M09 (HL7 v2.4) messages. */
export class MFK_M09_Parser extends MFK_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M09";
}

/** Parses an HL7 MFK^M09 (HL7 v2.4) message string into a structured result. */
export function parseMFK_M09(messageString: string): Result<ParsedMFK_M09> {
  return new MFK_M09_Parser().parse(messageString);
}
