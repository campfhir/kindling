/**
 * Builder, parser and structure for ADT^A23 messages (HL7 v2.3).
 *
 * Structure: MSH EVN PID [PD1] PV1 [PV2] [{DB1}] [{OBX}]
 * Shares the ADT^A02 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ADT_A02_Parser, type ParsedADT_A02, ADT_A02, type ADT_A02Options } from "./ADT_A02.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../../types/encoding.ts";
import type { MSH } from "../../segments/v2.3/MSH.ts";
import type { EVN } from "../../segments/v2.3/EVN.ts";
import type { PID } from "../../segments/v2.3/PID.ts";
import type { PV1 } from "../../segments/v2.3/PV1.ts";

export { ADT_A02_STRUCTURE as ADT_A23_STRUCTURE } from "./ADT_A02.ts";

/** Structured result of parsing an HL7 ADT^A23 (HL7 v2.3) message. */
export type ParsedADT_A23 = ParsedADT_A02;

/** Parser for HL7 ADT^A23 (HL7 v2.3) messages. */
export class ADT_A23_Parser extends ADT_A02_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A23";
}

/** Parses an HL7 ADT^A23 (HL7 v2.3) message string into a structured result. */
export function parseADT_A23(messageString: string): Result<ParsedADT_A23> {
  return new ADT_A23_Parser().parse(messageString);
}

/** The optional segments and groups of an ADT^A23 (HL7 v2.3) message. */
export type ADT_A23Options = ADT_A02Options;

/** Builder for HL7 ADT^A23 (HL7 v2.3) messages. */
export class ADT_A23<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1> extends ADT_A02<TMSH, TEVN, TPID, TPV1> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ADT_A23";
}

/** Builds an HL7 ADT^A23 (HL7 v2.3) message. */
export function createADT_A23<TMSH extends MSH = MSH, TEVN extends EVN = EVN, TPID extends PID = PID, TPV1 extends PV1 = PV1>(
  header: TMSH,
  event: TEVN,
  patient: TPID,
  visit: TPV1,
  options: ADT_A23Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ADT_A23<TMSH, TEVN, TPID, TPV1> {
  return new ADT_A23(header, event, patient, visit, options, encoding);
}
