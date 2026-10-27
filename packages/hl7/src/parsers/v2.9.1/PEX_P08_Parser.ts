/**
 * Parser for PEX^P08 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] EVN PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{ARV}] [{NTE}] [ VISIT: PV1 [PV2] [{PRT}] ] { EXPERIENCE: PES { PEX_OBSERVATION: PEO { PEX_CAUSE: PCR [ RX_ORDER: RXE [{PRT}] { TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ RX_ADMINISTRATION: RXA [RXR] [{PRT}] }] [{PRB}] [{ OBSERVATION: OBX [{PRT}] }] [{NTE}] [ ASSOCIATED_PERSON: NK1 [{GSP}] [{GSR}] [ ASSOCIATED_RX_ORDER: RXE [{PRT}] { NK1_TIMING_QTY: TQ1 [{TQ2}] } [{RXR}] ] [{ ASSOCIATED_RX_ADMIN: RXA [RXR] [{PRT}] }] [{PRB}] [{ ASSOCIATED_OBSERVATION: OBX [{PRT}] }] ] [{ STUDY: CSR [{CSP}] }] } } }
 * Shares the PEX^P07 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { PEX_P07_Parser, type ParsedPEX_P07 } from "./PEX_P07_Parser.ts";

export type { ParsedVisit, ParsedExperience, ParsedPexObservation, ParsedPexCause, ParsedRxOrder, ParsedTimingQty, ParsedRxAdministration, ParsedObservation, ParsedAssociatedPerson, ParsedAssociatedRxOrder, ParsedNk1TimingQty, ParsedAssociatedRxAdmin, ParsedAssociatedObservation, ParsedStudy } from "./PEX_P07_Parser.ts";
/** Structured result of parsing an HL7 PEX^P08 (HL7 v2.9.1) message. */
export type ParsedPEX_P08 = ParsedPEX_P07;

/** Parser for HL7 PEX^P08 (HL7 v2.9.1) messages. */
export class PEX_P08_Parser extends PEX_P07_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "PEX_P08";
}

/** Parses an HL7 PEX^P08 (HL7 v2.9.1) message string into a structured result. */
export function parsePEX_P08(messageString: string): Result<ParsedPEX_P08> {
  return new PEX_P08_Parser().parse(messageString);
}
