/**
 * Parser for MFQ^M12 messages (HL7 v2.5.1).
 *
 * Structure: MSH [{SFT}] QRD [QRF] [DSC]
 * Shares the MFQ^M01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { MFQ_M01_Parser, type ParsedMFQ_M01 } from "./MFQ_M01_Parser.ts";

/** Structured result of parsing an HL7 MFQ^M12 (HL7 v2.5.1) message. */
export type ParsedMFQ_M12 = ParsedMFQ_M01;

/** Parser for HL7 MFQ^M12 (HL7 v2.5.1) messages. */
export class MFQ_M12_Parser extends MFQ_M01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "MFQ_M12";
}

/** Parses an HL7 MFQ^M12 (HL7 v2.5.1) message string into a structured result. */
export function parseMFQ_M12(messageString: string): Result<ParsedMFQ_M12> {
  return new MFQ_M12_Parser().parse(messageString);
}
