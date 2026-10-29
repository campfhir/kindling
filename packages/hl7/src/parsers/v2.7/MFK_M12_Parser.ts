/**
 * Parser for MFK^M12 messages (HL7 v2.7).
 *
 * Structure: MSH [{SFT}] [UAC] MSA [{ERR}] MFI [{MFA}]
 * Shares the MFK^M13 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFK_M13_Parser, type ParsedMFK_M13 } from "./MFK_M13_Parser.ts";

/** Structured result of parsing an HL7 MFK^M12 (HL7 v2.7) message. */
export type ParsedMFK_M12 = ParsedMFK_M13;

/** Parser for HL7 MFK^M12 (HL7 v2.7) messages. */
export class MFK_M12_Parser extends MFK_M13_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFK_M12";
}

/** Parses an HL7 MFK^M12 (HL7 v2.7) message string into a structured result. */
export function parseMFK_M12(messageString: string): Result<ParsedMFK_M12> {
  return new MFK_M12_Parser().parse(messageString);
}
