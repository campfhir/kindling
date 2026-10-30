/**
 * Builder, parser and structure for ORU^R43 messages (HL7 v2.9).
 *
 * Structure: MSH [{ARV}] [{SFT}] [UAC] { PATIENT_RESULT: [ PATIENT: PID [PD1] [{PRT}] [{OH1}] [{OH2}] [OH3] [{OH4}] [{NTE}] [{ NEXT_OF_KIN: NK1 [{OH2}] [OH3] }] [{ARV}] [{ PATIENT_OBSERVATION: OBX [{PRT}] }] [ VISIT: PV1 [PV2] [{PRT}] ] [{ INSURANCE: IN1 [IN2] [IN3] }] ] { ORDER_OBSERVATION: [ COMMON_ORDER: ORC [{PRT}] [ ORDER_DOCUMENT: OBX [{PRT}] TXA ] ] OBR [{NTE}] [{ OBSERVATION_PARTICIPATION: PRT [{DEV}] }] [{ TIMING_QTY: TQ1 [{TQ2}] }] [CTD] [{ OBSERVATION: OBX [{PRT}] [{NTE}] }] [{FT1}] [{CTI}] [{ SPECIMEN: SPM [{ SPECIMEN_OBSERVATION: OBX [{PRT}] }] }] } [{ DEVICE: DEV [{OBX}] }] } [DSC]
 * Shares the ORU^R01 structure.
 *
 * @module
 */
// @generated message — edit the schema under codegen/schemas and run `pnpm codegen`
import type { Result } from "../types/result.ts";
import { ORU_R01_Parser, type ParsedORU_R01, ORU_R01, type ORU_R01Options, type PatientResultGroup, type PatientGroup, type NextOfKinGroup, type PatientObservationGroup, type VisitGroup, type InsuranceGroup, type OrderObservationGroup, type CommonOrderGroup, type OrderDocumentGroup, type ObservationParticipationGroup, type TimingQtyGroup, type ObservationGroup, type SpecimenGroup, type SpecimenObservationGroup, type DeviceGroup } from "./ORU_R01.ts";
import { DEFAULT_ENCODING, type EncodingCharacters } from "../types/encoding.ts";
import type { MSH } from "./MSH.ts";

export { ORU_R01_STRUCTURE as ORU_R43_STRUCTURE } from "./ORU_R01.ts";

export type { ParsedPatientResult, ParsedPatient, ParsedNextOfKin, ParsedPatientObservation, ParsedVisit, ParsedInsurance, ParsedOrderObservation, ParsedCommonOrder, ParsedOrderDocument, ParsedObservationParticipation, ParsedTimingQty, ParsedObservation, ParsedSpecimen, ParsedSpecimenObservation, ParsedDevice } from "./ORU_R01.ts";
/** Structured result of parsing an HL7 ORU^R43 (HL7 v2.9) message. */
export type ParsedORU_R43 = ParsedORU_R01;

/** Parser for HL7 ORU^R43 (HL7 v2.9) messages. */
export class ORU_R43_Parser extends ORU_R01_Parser {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R43";
}

/** Parses an HL7 ORU^R43 (HL7 v2.9) message string into a structured result. */
export function parseORU_R43(messageString: string): Result<ParsedORU_R43> {
  return new ORU_R43_Parser().parse(messageString);
}

export type { PatientResultGroup, PatientGroup, NextOfKinGroup, PatientObservationGroup, VisitGroup, InsuranceGroup, OrderObservationGroup, CommonOrderGroup, OrderDocumentGroup, ObservationParticipationGroup, TimingQtyGroup, ObservationGroup, SpecimenGroup, SpecimenObservationGroup, DeviceGroup };
/** The optional segments and groups of an ORU^R43 (HL7 v2.9) message. */
export type ORU_R43Options = ORU_R01Options;

/** Builder for HL7 ORU^R43 (HL7 v2.9) messages. */
export class ORU_R43<TMSH extends MSH = MSH> extends ORU_R01<TMSH> {
  /** The message name used in error messages. */
  protected override readonly messageName: string = "ORU_R43";
}

/** Builds an HL7 ORU^R43 (HL7 v2.9) message. */
export function createORU_R43<TMSH extends MSH = MSH>(
  header: TMSH,
  patientResults: PatientResultGroup[],
  options: ORU_R43Options = {},
  encoding: EncodingCharacters = DEFAULT_ENCODING,
): ORU_R43<TMSH> {
  return new ORU_R43(header, patientResults, options, encoding);
}
