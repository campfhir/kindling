/**
 * Parser for ORU^R43 messages (HL7 v2.9.1).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{GSP}] [{GSR}] [{GSC}] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{NTE}] [{ NEXT_OF_KIN: NK1 [{GSP}] [{GSR}] [{OH2}] [OH3] }] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] ] { ORDER_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } [{ DEVICE: DEV [{OBX}] }] } [DSC]
 * Shares the ORU^R01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../../types/result.ts";
import { ORU_R01_Parser, type ParsedORU_R01 } from "./ORU_R01_Parser.ts";

export type { ParsedPatientResult, ParsedPatient, ParsedNextOfKin, ParsedPatientObservation, ParsedVisit, ParsedInsurance, ParsedOrderObservation, ParsedCommonOrder, ParsedOrderDocument, ParsedObservationParticipation, ParsedTimingQty, ParsedObservation, ParsedSpecimen, ParsedSpecimenObservation, ParsedDevice } from "./ORU_R01_Parser.ts";
/** Structured result of parsing an HL7 ORU^R43 (HL7 v2.9.1) message. */
export type ParsedORU_R43 = ParsedORU_R01;

/** Parser for HL7 ORU^R43 (HL7 v2.9.1) messages. */
export class ORU_R43_Parser extends ORU_R01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R43";
}

/** Parses an HL7 ORU^R43 (HL7 v2.9.1) message string into a structured result. */
export function parseORU_R43(messageString: string): Result<ParsedORU_R43> {
  return new ORU_R43_Parser().parse(messageString);
}
